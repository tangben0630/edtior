<template>
  <div class="wrapper">
    <div class="list" ref="wrap" v-if="isRender">
      <div class="item" v-for="(item, i) in list" :key="i">
        <span class="iconfont iconguanbi delete-icon i" @click="deleteFirstNav(item.id)"></span>
        <div class="set-title" v-if="setData.isText">
          <input
            type="text"
            placeholder="请输入标题"
            :value="item.title"
            maxlength="5"
            @blur.stop.prevent="notEmpty($event, item.id, 'first')"
            @input.stop.prevent="keyupFn($event, item.id, 'first')"
          />
          <div class="opt-list">
            <div class="bottom">
              <el-tooltip class="item1" effect="dark" content="点击添加二级菜单" placement="bottom-end">
                <el-button>
                  <span class="iconfont iconjiahao" @click="addSecondLink(item.id)"></span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item1" effect="dark" content="点击显示/隐藏内容" placement="bottom-end">
                <el-button>
                  <span class="iconfont iconjiantou_liebiaozhankai-copy2" @click="collect(i)"></span>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div class="content" ref="content">
            <div class="set-image" v-if="setData.isImage">
              <Imagebox :setData="setData" :item="item" :setAttr="normalImg"></Imagebox>
              <Imagebox :setData="setData" :item="item" :setAttr="activeImg"></Imagebox>
              <p>
                高亮可选填
                <br />建议：60x60
              </p>
            </div>
            <div class="set-first" :class="{disabled: item.children.length > 0}">
              <Doubleselect :item="item" :setData="setData"></Doubleselect>
            </div>
            <div class="set-second">
              <ul class="second-list">
                <li class="s-item" v-for="(item1, j) in item.children" :key="j">
                  <span
                    class="iconfont iconguanbi delete-icon ii"
                    @click="deleteSecondNav(item.id, j)"
                  ></span>
                  <p class="icon"></p>
                  <div class="set-link">
                    <input
                      type="text"
                      :value="item1.title"
                      class="second-title"
                      placeholder="请输入"
                      maxlength="4"
                      @blur.stop.prevent="notEmpty($event, item.id, 'second', item1.id,)"
                      @input.stop.prevent="keyupFn($event, item.id, 'second', item1.id)"
                    />
                    <Doubleselect :item="item1" :setData="setData"></Doubleselect>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Imagebox from "@public/global/imagebox";
import Doubleselect from "@public/setstyle/doubleselect";
import Sortable from "sortablejs";
import { setTimeout } from "timers";
export default {
  name: "set",
  data() {
    return {
      index: 0,
      normalImg: "normalImg",
      activeImg: "activeImg",
      isRender: true,
    };
  },
  props: {
    setData: {
      type: Object,
    },
    item: {
      type: Object,
    },
  },
  components: {
    Imagebox,
    Doubleselect,
  },
  computed: {
    list: {
      get() {
        return this.$store.state.globalNavData.setData.setImgArr;
      },
    },
  },
  mounted() {
    this.sort();
  },
  methods: {
    sort() {
      this.$nextTick(() => {
        const templateList = this.$refs.wrap;
        new Sortable(templateList, {
          group: {
            name: "shared",
            pull: false,
          },
          animation: 300,
          forceFallback: true,
          removeCloneOnHide: true,
          onEnd: (e) => {
            if (e.oldIndex != e.newIndex) {
              const oldItem = this.$store.state.globalNavData.setData.imgArr[
                e.oldIndex
              ];
              this.$store.state.globalNavData.setData.imgArr.splice(
                e.oldIndex,
                1
              );
              this.$store.state.globalNavData.setData.imgArr.splice(
                e.newIndex,
                0,
                oldItem
              );
            }
          },
        });
        this.index = this.$store.state.globalNavData.setData.setStyleList.findIndex(
          (item) => item.isAdd == true
        );
      });
    },
    // 删除一级菜单
    deleteFirstNav(id) {
      let len = this.$store.state.globalNavData.setData.imgArr.length;
      if (len == 2) return alert("至少保留两个导航项");
      const newArr = [];
      this.$store.state.globalNavData.setData.imgArr.forEach((el) => {
        const [obj] = this.$store.state.globalNavData.setData.setImgArr.filter(
          (item) => item.id == el.id
        );
        newArr.push(obj);
      });
      this.$store.state.globalNavData.setData.setImgArr = newArr;
      this.$store.state.globalNavData.setData.imgArr = this.$store.state.globalNavData.setData.imgArr.filter(
        (item) => item.id != id
      );
      this.$store.state.globalNavData.setData.setImgArr = this.$store.state.globalNavData.setData.setImgArr.filter(
        (item) => item.id != id
      );
      this.isRender = false;
      setTimeout(() => {
        this.isRender = true;
        this.sort();
      }, 30);
    },
    // 删除二级菜单
    deleteSecondNav(id, i) {
      let arr = [];
      this.$store.state.globalNavData.setData.imgArr.forEach((item) => {
        if (item.id == id) {
          let len = item.children.length;
          if (len > 2) {
            item.children.splice(i, 1);
          }
        }
        arr.push(item);
      });
      const newArr = [];
      this.$store.state.globalNavData.setData.imgArr.forEach((el) => {
        const [obj] = this.$store.state.globalNavData.setData.setImgArr.filter(
          (item) => item.id == el.id
        );
        newArr.push(obj);
      });
      this.$store.state.globalNavData.setData.setImgArr = newArr;
      this.$store.state.globalNavData.setData.imgArr.forEach((item) => {
        if (item.id == id) {
          let len = item.children.length;
          if (len > 2) {
            item.children.splice(i, 1);
          }
        }
      });
      this.$store.state.globalNavData.setData.setImgArr.forEach((item) => {
        if (item.id == id) {
          let len = item.children.length;
          if (len > 2) {
            item.children.splice(i, 1);
          }
        }
      });
      this.isRender = false;
      setTimeout(() => {
        this.isRender = true;
        this.sort();
      }, 30);
    },
    // 添加二级菜单
    addSecondLink(id) {
      const newArr = [];
      this.$store.state.globalNavData.setData.imgArr.forEach((el) => {
        const [obj] = this.$store.state.globalNavData.setData.setImgArr.filter(
          (item) => item.id == el.id
        );
        newArr.push(obj);
      });
      this.$store.state.globalNavData.setData.setImgArr = newArr;
      this.$store.state.globalNavData.setData.imgArr.forEach((item) => {
        if (item.id == id) {
          let len = item.children.length;
          if (len < 5) {
            let obj = {
              title: "二级标题",
              id: id + "-" + (len + 1),
              function: {
                pageId: 0,
                pageName: "",
                isSystem: false,
                link: false,
                production: false,
                type: "",
              },
            };
            item.children.push(obj);
          }
        }
      });
      this.$store.state.globalNavData.setData.setImgArr.forEach((item) => {
        if (item.id == id) {
          let len = item.children.length;
          if (len < 5) {
            let obj = {
              title: "二级标题",
              id: id + "-" + (len + 1),
              function: {
                pageId: 0,
                pageName: "",
                isSystem: false,
                link: false,
                production: false,
                type: "",
              },
            };
            item.children.push(obj);
          }
        }
      });
      this.isRender = false;
      setTimeout(() => {
        this.isRender = true;
        this.sort();
      }, 30);
    },
    // 收起
    collect(i) {
      let str = this.$refs.content[i].style.display;
      if (str == "" || str == "block") {
        this.$refs.content[i].style.display = "none";
      } else {
        this.$refs.content[i].style.display = "block";
      }
    },
    // 输入
    keyupFn(e, id, type, id1) {
      const newArr = [];
      this.$store.state.globalNavData.setData.imgArr.forEach((el) => {
        const [obj] = this.$store.state.globalNavData.setData.setImgArr.filter(
          (item) => item.id == el.id
        );
        newArr.push(obj);
      });
      this.$store.state.globalNavData.setData.setImgArr = newArr;
      let str = e.target.value;
      let len = str.length;
      this.$store.state.globalNavData.setData.imgArr.forEach((item) => {
        if (item.id == id) {
          if (type == "first") {
            item.title = e.target.value;
          } else {
            item.children.forEach((item1) => {
              if (item1.id == id1) {
                item1.title = e.target.value;
              }
            });
          }
        }
      });
      this.$store.state.globalNavData.setData.setImgArr.forEach((item) => {
        if (item.id == id) {
          if (type == "first") {
            item.title = e.target.value;
          } else {
            item.children.forEach((item1) => {
              if (item1.id == id1) {
                item1.title = e.target.value;
              }
            });
          }
        }
      });
      this.isRender = false;
      setTimeout(() => {
        this.isRender = true;
        this.sort();
      }, 30);
    },
    // 文本框内容不能为空
    notEmpty(e, i, type, j) {
      // if(e.target.value == ''){
      //   if(type == 'first'){
      //     this.$store.state.globalNavData.setData.imgArr[i].title = this.$store.state.globalNavData.setData.setImgArr[i].title = '标题';
      //   }else if(type == 'second'){
      //     this.$store.state.globalNavData.setData.imgArr[i].children[j].title = this.$store.state.globalNavData.setData.setImgArr[i].children[j].title = '二级标题';
      //   }
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.hide {
  visibility: hidden;
}
.list {
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .delete-icon {
    display: none;
  }
  .item:hover {
    border: 1px dashed $baseColor1;
    .i {
      display: block;
      top: 0;
      right: 0;
    }
  }
  .bottom {
    clear: both;
    text-align: center;
    .el-button {
      border: none;
      padding: 3px;
      font-size: 20px;
      margin-left: 0;
    }
  }
  .item {
    position: relative;
    padding: 10px 10px 0;
    margin-bottom: 10px;
    border: 1px dashed $fontColor5;
    .i {
      top: 0;
      right: 0;
    }
    .set-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 6px;
      margin-bottom: 10px;
      color: #0d171b;
      font-weight: 500;
      border: 1px solid $fontColor5;
      box-sizing: border-box;
      .opt-list {
        display: flex;
      }
    }
    .set-image {
      display: flex;
      .image-wrap {
        margin-right: 15px;
      }
      p {
        color: $fontColor6;
        margin-top: 10px;
      }
    }
    .set-first {
      .link-box {
        width: 215px;
        height: 30px;
        line-height: 30px;
        .current-select {
          width: 70px;
          input {
            height: 26px;
          }
        }
        .station {
          width: 90px;
        }
      }
    }
    .set-image {
      margin-bottom: 10px;
    }
    .set-first {
      margin-bottom: 10px;
    }
    .set-second {
      .icon {
        width: 10px;
        height: 10px;
        border-left: 2px solid #7d8694;
        border-bottom: 2px solid #7d8694;
      }
      .s-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .ii {
          right: -7px;
          top: -7px;
          z-index: 99;
        }
        .set-link {
          display: flex;
          margin-left: 10px;
          .second-title {
            width: 53px;
            height: 25px;
            padding-left: 3px;
            border: 1px solid $fontColor5;
            border-right: none;
          }
        }
        .link-box {
          height: 25px;
          margin-top: 0;
        }
      }
      .s-item:hover {
        .ii {
          display: block;
        }
      }
    }
  }
}
</style>