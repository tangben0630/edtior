<template>
  <div class="tool-bar" :style="{ left: left }">
    <ul>
      <li>
        <div class="right" @click="dosomething(1)">
          <el-tooltip class="item" effect="dark" content="删除" placement="right">
            <el-button>
              <i class="iconfont iconshanchu"></i>
            </el-button>
          </el-tooltip>
        </div>
      </li>
      <li>
        <div class="right" @click="dosomething(2)">
          <el-tooltip class="item" effect="dark" content="复制" placement="right">
            <el-button>
              <i class="iconfont iconfuzhi"></i>
            </el-button>
          </el-tooltip>
        </div>
      </li>
      <li>
        <div class="right" @click="dosomething(3)">
          <el-tooltip class="item" effect="dark" content="设置" placement="right">
            <el-button>
              <i class="iconfont iconquanjushezhi"></i>
            </el-button>
          </el-tooltip>
        </div>
      </li>
      <li
        ref="item"
        class="global-set"
        @click="showGlobalSet"
        @mouseenter="enter"
        @mouseleave="leave"
      >
        <div class="right">
          <el-tooltip class="item" effect="dark" content="显示全局设置" placement="right">
            <el-button>
              <i class="iconfont iconzujian-dibudaohang nav-icon" @click="dosomething(4)"></i>
            </el-button>
          </el-tooltip>
        </div>
        <div class="prompt-content" v-show="false">
          <div class="title">设置全局组件</div>
          <div>
            <span class="name">全局导航</span>
            <el-switch v-model="switchValue" @change="switchFn" active-text="显示" inactive-text="隐藏"></el-switch>
          </div>
        </div>
      </li>
      <li>
        <div class="right" @click="dosomething(5)">
          <el-tooltip class="item" effect="dark" content="预览" placement="right">
            <el-button>
              <i class="iconfont iconbofangshipin"></i>
            </el-button>
          </el-tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import common from "@assets/js/common";
import mixins from "@mixin/templateMixin";
import mixinsEv from "@mixin/edtior";
export default {
  mixins: [mixinsEv, mixins],
  name: "component_name",
  data() {
    return {
      left: "1000px",
      switchValue: false,
      isShowPrompt: false,
    };
  },
  computed: {
    currentPageSet: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex];
      },
    },
  },
  methods: {
    setObj(obj) {
      obj.id = this.$store.state.pageList[this.$store.state.pageIndex].comId;
      obj.setData.isOnclick = false;
      obj.isCopy = true;
      obj.reName = obj.reName + `(${obj.copyTime})`;
    },
    async dosomething(type) {
      switch (type) {
        case 1: //删除
          this.$store.state.isDelete = true;
          break;
        case 2: //复制
          this.$store.state.pageList[this.$store.state.pageIndex].comId++;
          const index = this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.findIndex((item) => item.setData.isOnclick == true);
          if (index >= 0) {
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList[index].copyTime += 1;
            const obj = common.deepClone(
              this.$store.state.pageList[this.$store.state.pageIndex]
                .templateList[index]
            );
            this.setObj(obj); // 重新设置一些属性
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList.splice(index + obj.copyTime, 0, obj);
            obj.copyTime = 0;
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList.forEach((item) => {
              item.setData.isOnclick = false;
            });
            obj.setData.isOnclick = true;
            this.$store.commit("changeNowComponent", obj.setData);
          }
          break;
        case 3: // 页面设置
          this.pageSetClick("页面");
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.forEach((item) => {
            item.setData.isOnclick = false;
          });
          // 头部
          if (
            this.$store.state.pageList[this.$store.state.pageIndex].headerData
          ) {
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].headerData.setData.isOnclick = false;
          }
          // 全局导航
          if (this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav) {
            this.$store.state.globalNavData.setData.isOnclick = false;
          }
          break;
        case 4: // 当前页面全局设置
          this.$store.state.previewPageId = this.$store.state.pageList[
            this.$store.state.pageIndex
          ].pageId;
          break;
        case 5: // 当前页面预览
          this.$store.state.previewPageId = this.$store.state.pageList[
            this.$store.state.pageIndex
          ].pageId;
          const params = {
            id: this.$store.state.designId,
            design_content: this.$store.state.pageList,
          };
          const res = await this.axios.put(
            "/api/platform/console/mydesign/editing",
            params
          );
          if (res) {
            this.$store.state.globalloadingFlag = false;
            this.$store.state.globalloadingMsg = "";
            if (res.status == 1) {
              common.dealResult(this, 1, res.message);
              this.$store.state.showViewModal = true;
            } else if (res.status == 0) {
              common.dealResult(this, 3, res.message);
            }
          }
          break;
        default:
          break;
      }
    },
    getElementLeft(el) {
      let actualLeft = el.offsetLeft;
      let current = el.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    },
    // 点击显示全局设置
    showGlobalSet() {
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].templateList.forEach((item) => {
        item.setData.isOnclick = false;
      });
      if (this.$store.state.pageList[this.$store.state.pageIndex].headerData) {
        this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isOnclick = false;
      }
      // this.msg.id = this.$store.state.pageList[this.$store.state.pageIndex].templateList[0].id
      this.$store.state.globalNavData.setData.isOnclick = true;
      let obj = this.$store.state.globalNavData.setData;
      this.$store.commit("changeNowComponent", obj);
    },
    // 显示设置框
    enter() {
      this.isShowPrompt = true;
    },
    // 隐藏设置框
    leave() {
      this.isShowPrompt = false;
    },
    // 滑块
    switchFn() {
      if (this.switchValue) {
      } else {
      }
    },
  },
  mounted() {
    this.left =
      this.getElementLeft(document.getElementById("com-wrap")) + 360 + "px";
    window.onresize = () => {
      this.left =
        this.getElementLeft(document.getElementById("com-wrap")) + 360 + "px";
    };
  },
};
</script>
<style lang="scss" scoped>
.tool-bar {
  position: fixed;
  top: 208px;
  width: 40px;
  height: 500px;
  left: 1000px;
  .global-set {
    position: relative;
  }
  .prompt-content {
    position: absolute;
    left: 40px;
    top: 0;
    width: 200px;
    padding: 10px;
    padding-top: 3px;
    border-radius: 3px;
    background: #fff;
    font-size: 14px;
    box-shadow: #ededed 2px 0px 10px 0px;
    .title {
      line-height: 40px;
    }
    .name {
      margin-right: 10px;
      color: $fontColor2;
    }
  }
  ul {
    position: relative;
    li:hover {
      background: $baseColor1;
    }
    li {
      width: 40px;
      height: 36px;
      text-align: center;
      margin-bottom: 30px;
      background: #fff;
      border-radius: 2px;
      i {
        color: $iconColor;
        font-size: 26px;
        cursor: pointer;
      }
      i.small {
        font-size: 22px;
      }
      i.iconarrow- {
        font-size: 18px;
      }
      .el-button {
        padding: 5px;
        border: none;
      }
      .el-button:hover {
        background: $baseColor1;
      }
    }
  }
}
</style>
