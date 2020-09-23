<template>
  <div class="wrap" @click="cancel">
    <!-- 页面删除 -->
    <div class="confirm" v-if="show" @click.stop="prevent">
      <h3 class="title">页面清空确认</h3>
      <div class="con">
        该页面内容将被清空
        <p>确定清空吗？</p>
      </div>
      <div class="btn">
        <div class="left">
          <div class="all" @click.stop="cancel">取消</div>
        </div>
        <div class="right">
          <div @click="confirm">确认</div>
        </div>
      </div>
    </div>
    <!-- 页面没有内容 -->
    <div
      class="confirm"
      v-if="
        this.$store.state.pageList[this.$store.state.pageIndex].templateList
          .length < 1
      "
      @click.stop="prevent(1)"
    >
      <h3 class="title">页面清空确认</h3>
      <div class="con">该页面当前没有内容！</div>
    </div>
    <!-- 模块内容 -->
    <div class="confirm" v-if="!show" @click.stop="prevent">
      <h3 class="title moudle-title">模块删除确认</h3>
      <div class="con">
        选择
        <span>模块</span>
        即将被删除
        <p>确定删除吗？</p>
      </div>
      <div class="btn">
        <div class="left">
          <div class="moudle" @click="cancel">取消</div>
        </div>
        <div class="right">
          <div @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/edtior";
export default {
  mixins: [mixins],
  data() {
    return {
      timer: null,
      isAll: true,
      show: true,
      id: "", //将要删除组件的  id
      isHeader: false, // 删除的是否是头部
      globalFlag: false
    };
  },
  created() {
    let list = this.$store.state.pageList[
      this.$store.state.pageIndex
    ].templateList.filter((item) => item.setData.isOnclick == true);
    if (this.$store.state.pageList[this.$store.state.pageIndex].headerData) {
      this.isHeader = this.$store.state.pageList[
        this.$store.state.pageIndex
      ].headerData.setData.isOnclick;
    }
    this.globalFlag = this.$store.state.globalNavData.setData.isOnclick;
    this.isAll =
      list.length > 0 || this.isHeader || this.globalFlag
        ? ((this.id = list.length > 0 ? list[0].id : ""), false)
        : true;
    if (typeof this.$store.state.deleteId == "number") {
      this.isAll = false;
    }
    if (this.isAll) {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  methods: {
    cancel() {
      clearTimeout(this.timer);
      this.$store.state.isDelete = false;
    },
    confirm() {
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].nowCommponent = null;

      if (typeof this.$store.state.deleteId == "number") {
        if (this.$store.state.deleteId == 9901) {
          this.hideGlobal();
        } else {
          if (this.$store.state.deleteHeader) {
            // 头部单独删除
            this.delHeader();
          }
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList = this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.filter(
            (item) => item.id != this.$store.state.deleteId
          );
        }
      } else {
        if (this.isAll) {
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList = this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.filter((item) => item.moduleName == "全局导航");
          this.hideGlobal();
          this.delHeader();
        } else {
          if (this.globalFlag) {
            this.hideGlobal();
          } else {
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList = this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList.filter((item) => {
              if (item.id == this.id) {
                if (item.height) {
                  this.$store.state.coverHeight += item.height;
                }
              }
              return item.id != this.id;
            });
            if (this.isHeader) {
              this.delHeader();
            }
          }
        }
      }
      this.$store.state.deleteId = null;
      this.cancel();
      this.pageSetClick("页面");
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].templateList.forEach((item) => {
        item.setData.isOnclick = false;
      });
    },
    prevent(v) {
      clearTimeout(this.timer);
      v && this.cancel();
    },
    // 隐藏全局导航
    hideGlobal() {
      let attr = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .paddingAttr;
      this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
        attr
      ] = 0;
      this.$store.state.pageList.forEach((item) => {
        item.isGlobalNav = false;
      });
      this.$store.state.globalNavData = this.$store.state.initGlobalNavData
    },
    // 判断是否删除的是头部
    isHeader(id) {
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].templateList.filter((item) => {
        if (item.id == id) {
          if (item.moduleName == "头部") {
            this.delHeader();
          }
        }
      });
    },
    delHeader() {
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].setting.isUseHeight = false;
      this.$store.state.curTemplateList.forEach((item) => {
        item.isDisabled = false;
      });
      this.$store.state.pageList[this.$store.state.pageIndex].headerData = null;
      this.$store.state.pageList[this.$store.state.pageIndex].isHeader = false;
      this.isHeader = false;
    },
  },
  mounted() {
    clearTimeout(this.timer);
    this.$store.state.pageList[this.$store.state.pageIndex].templateList
      .length < 1 &&
      (this.timer = setTimeout(() => {
        this.cancel();
      }, 1500));
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 200px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}
.confirm {
  width: 260px;
  box-shadow: 0px 2px 25px 0px #bbb;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  .title {
    background: $fontRed;
    color: #fff;
    padding-top: 15px;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
  }
  .moudle-title {
    position: relative;
    background: #fff;
    color: $fontColor1;
    &::after {
      position: absolute;
      content: "";
      width: 220px;
      left: 20px;
      bottom: 0;
      height: 1px;
      background: #eee;
    }
  }
  .con {
    padding: 20px 0;
    font-size: 14px;
    line-height: 16px;
    span {
      font-size: 16px;
      font-weight: 600;
    }
    p {
      padding-top: 8px;
      color: $fontRed;
    }
  }
  .btn {
    display: flex;
    padding-bottom: 15px;
    .left,
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 100px;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        border-radius: 2px;
        @include border(#e5e5e5);
        cursor: pointer;
      }
      .all {
        background: $fontRed;
        color: #fff;
        @include border($fontRed);
      }
      .moudle {
        color: #fff;
        background: $baseColor1;
        @include border($baseColor1);
      }
    }
  }
}
</style>
