<template>
  <transition name="slide-fade">
    <div class="page">
      <div class="page-type">
        <div class="self" :class="{ on: this.$store.state.isSelfPage }" @click="pageType(1)">自建页面</div>
        <div class="system" :class="{ on: !this.$store.state.isSelfPage }" @click="pageType(2)">系统页面</div>
      </div>
      <div class="list">
        <!-- 下面是区分自建页面跟系统页面 -->
        <transition name="fade">
          <ul class="123" @mouseleave.stop.prevent="leave" v-if="this.$store.state.isSelfPage">
            <vue-scroll :ops="ops" :style="{ height: height + 'px' }">
              <li
                v-for="(item, i) in pageList"
                :key="i"
                :class="{ active: item.isActive }"
                @click="select(i, 1)"
                @dblclick="renameLi(i)"
                @mouseleave.stop.prevent="leave"
              >
                <div v-if="!item.isSystem">
                  <i class="iconfont icontubiaozhizuomoban" v-if="!item.isHome"></i>
                  <div class="home" v-if="item.isHome">首</div>
                  <input
                    type="text"
                    :value="item.pageName"
                    :readonly="item.readonly"
                    :class="{ rename: !item.readonly }"
                    ref="input"
                    maxlength="20"
                    @blur="blur($event, i)"
                    @keyup="keyup($event, i)"
                  />
                  <i class="iconfont iconquanjushezhi" @click.stop="set($event, i)"></i>
                  <Set v-if="item.showSet" :childtop="childtop" @itemClick="itemClick" />
                </div>
              </li>
              <li class="add" @click="add">
                <i class="iconfont iconjiahao"></i>
                新增页面
              </li>
            </vue-scroll>
          </ul>
        </transition>
        <transition name="fade">
          <ul class="456" @mouseleave.stop.prevent="leave" v-if="!this.$store.state.isSelfPage">
            <li
              v-for="(item, i) in pageList"
              :key="i"
              :class="{ active: item.isActive }"
              @click="select(i, 0)"
            >
              <div v-if="item.isSystem">{{ item.pageName }}</div>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import Set from "./pageset";
import common from "@assets/js/common";
import mixin from "@mixin/edtior";
export default {
  mixins: [mixin],
  name: "page",
  components: {
    Set,
  },
  data() {
    return {
      isSelf: true,
      activeIndex: 0,
      curPageName: "",
      height: 0,
      userPageIndex: 0,
      systemPageIndex: 0,
      childtop: 0,
      ops: {
        scrollPanel: {
          initialScrollY: false, //只要组件mounted之后自动滚动的距离。 例如 100 or 10%
          initialScrollX: false,
          scrollingX: false, //是否启用 x 或者 y 方向上的滚动
          scrollingY: true,
          gutterOfSide: "-4px",
          speed: 300, //多长时间内完成一次滚动。 数值越小滚动的速度越快
          easing: undefined, //滚动动画 参数通animation
          verticalNativeBarPos: "right", //原生滚动条的位置
        },
        rail: {
          background: "#01a99a",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "-1px",
          keepShow: false,
        },
        bar: {
          showDelay: 300, //在鼠标离开容器后多长时间隐藏滚动条
          onlyShowBarOnScroll: false, //当页面滚动时显示
          keepShow: false, //是否一直显示
          background: "#c3c3c3",
          opacity: 0,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "3px",
          disable: false, //是否禁用滚动条
        },
      },
    };
  },
  created() {
    this.isSelf = this.$store.state.isSelfPage;
  },
  props: {},
  computed: {
    pageList() {
      return this.$store.state.pageList;
    },
  },
  methods: {
    //自建页面
    blur(e, i) {
      this.$store.state.pageList.forEach((el) => {
        el.readonly = true;
      });
    },
    keyup(e, i) {
      if (e.target.value === "") {
      } else {
        this.$store.state.pageList[i].pageName = e.target.value;
      }
    },
    pageType(n) {
      //nav 切换
      if (n > 1) {
        this.isSelf = false;
        this.$store.state.isSelfPage = false;
        this.$store.state.showNowPagecurTemplateList = false;
        this.liHeight(this.systemPageIndex, "isActive");
        this.liHeight(this.systemPageIndex);
        this.$store.state.pageIndex = this.systemPageIndex;
      } else {
        this.$store.state.showNowPagecurTemplateList = true;
        this.isSelf = true;
        this.$store.state.isSelfPage = true;
        this.liHeight(this.userPageIndex, "isActive");
        this.liHeight(this.userPageIndex);
        this.$store.state.pageIndex = this.userPageIndex;
      }
    },
    add() {
      //点击添加页面按钮
      this.$store.state.isAddHtml = true;
    },
    select(i, n) {
      //点击页面列表  参数n  区别系统页面跟 用户页面
      if (n) {
        //自建页面
        this.userPageIndex = i;
        // 设置区
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

        this.$store.state.pageList.forEach((el) => {
          el.isPageSet = false;
        });
        this.$store.state.pageList[i].isPageSet = true;
        let flag = false;
        this.$store.state.pageList[i].templateList.forEach((item) => {
          // 判断头部
          if (item.moduleName == "头部") {
            flag = true;
          }
        });
        if (flag) {
          this.$store.state.curTemplateList.forEach((ele) => {
            if (ele.title == "头部") {
              ele.isDisabled = true;
            }
          });
        } else {
          this.$store.state.curTemplateList.forEach((ele) => {
            ele.isDisabled = false;
          });
        }
      } else {
        let obj;
        switch (this.$store.state.pageList[i].pageName) {
          case "登录":
            obj = {
              url: "./template/system/login",
              name: "Login",
              moduleName: "文字",
              reName: "登录",
              id: 1,
              setData: {
                setTitle: "文字设置",
                isOnclick: false,
                isShow: true,
                isBaseSet: true,
                default: {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  textColor: "rgba(0, 0, 0)",
                },
                style: {
                  backgroundColor: "#ddd",
                  color: "#000",
                  fontSize: "12px",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                },
                setStyleList: [],
                content: "起个名字~",
              },
            };
            break;
          case "注册":
            obj = {
              url: "./template/system/register",
              name: "Register",
              moduleName: "文字",
              reName: "登录",
              id: 1,
              setData: {
                setTitle: "文字设置",
                isOnclick: false,
                isShow: true,
                isBaseSet: true,
                default: {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  textColor: "rgba(0, 0, 0)",
                },
                style: {
                  backgroundColor: "#ddd",
                  color: "#000",
                  fontSize: "12px",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                },
                setStyleList: [],
                content: "起个名字~",
              },
            };
            break;
          case "个人中心":
            obj = {
              url: "./template/system/personal",
              name: "Personal",
              moduleName: "文字",
              reName: "登录",
              id: 1,
              setData: {
                setTitle: "文字设置",
                isOnclick: false,
                isShow: true,
                isBaseSet: true,
                default: {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  textColor: "rgba(0, 0, 0)",
                },
                style: {
                  backgroundColor: "#ddd",
                  color: "#000",
                  fontSize: "12px",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                },
                setStyleList: [],
                content: "起个名字~",
              },
            };
            break;
          case "详情":
            obj = {
              url: "./template/system/details",
              name: "Details",
              moduleName: "文字",
              reName: "登录",
              id: 1,
              setData: {
                setTitle: "文字设置",
                isOnclick: false,
                isShow: true,
                isBaseSet: true,
                default: {
                  backgroundColor: "rgba(255, 255, 255, 0)",
                  textColor: "rgba(0, 0, 0)",
                },
                style: {
                  backgroundColor: "#ddd",
                  color: "#000",
                  fontSize: "12px",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                },
                setStyleList: [],
                content: "起个名字~",
              },
            };
            break;
          default:
            break;
        }
        this.$store.state.pageList[i].templateList[0] = obj;
        this.systemPageIndex = i;
      }
      this.liHeight(i, "isActive");
      this.liHeight(i);
      this.$store.state.pageIndex = i; //this.$store.state.pageList[i].pageId;
    },
    renameLi(i) {
      //页面列表 重命名
      this.$store.state.pageList[i].readonly = false;
      this.$refs.input[i].focus();
      this.$store.state.pageIndex = i;
    },
    set(e, i) {
      //设置按钮
      this.childtop = this.getElementToPageTop(e.target) + 3;
      this.liHeight(i, "isActive");
      this.liHeight(i, "showSet");
      document.onclick = () => {
        this.liHeight(i);
        document.onclick = null;
      };
      this.$store.state.pageList.forEach((el) => {
        el.readonly = true;
      });
      this.activeIndex = i;
    },
    getElementToPageTop(el) {
      //dom 距离页面顶部高度
      if (el.parentElement) {
        return this.getElementToPageTop(el.parentElement) + el.offsetTop;
      }
      return el.offsetTop;
    },
    setObj(obj) {
      obj.isHome = false;
      obj.isActive = false;
      obj.pageId = "0" + obj.pageId;
      obj.pageName = obj.pageName + `(${obj.copyTime})`;
    },
    itemClick(i) {
      //设置选项 点击事件
      this.liHeight(1);
      switch (i) {
        case 0: //设置
          this.$store.state.pageIndex = this.activeIndex;
          this.pageSetClick();
          break;
        case 1: //复制
          if (this.$store.state.pageList.length < 10) {
            this.$store.state.pageList[this.activeIndex].copyTime++;
            const obj = common.deepClone(this.$store.state.pageList[this.activeIndex]);
            this.setObj(obj);
            this.$store.state.pageList.splice(
              this.activeIndex + obj.copyTime,
              0,
              obj
            );
            obj.copyTime = 0;
          } else {
            alert("最多10");
          }
          break;
        case 2: //删除
          if (!this.$store.state.pageList[this.activeIndex].isHome) {
            this.$store.state.pageList.splice(this.activeIndex, 1);
            this.$store.state.pageList[0].isActive = true;
            this.$store.state.pageIndex = 0;
          }
          break;
        case 3: //重命名
          this.$store.state.pageList[this.activeIndex].readonly = false;
          this.$refs.input[this.activeIndex].focus();
          this.curPageName = this.$store.state.pageList[
            this.activeIndex
          ].pageName;
          break;
        case 4: //设为首页
          this.$store.state.pageList.forEach((el) => {
            el.isHome = false;
          });
          this.$store.state.pageList[this.activeIndex].isHome = true;
          break;
        case 5: //存为模板
          break;
        default:
          break;
      }
    },
    leave() {
      //离开列表选项
      this.liHeight(1);
    },
    liHeight(i, type) {
      //切换
      if (type) {
        this.pageList.forEach((el) => {
          el[type] = false;
        });
        this.pageList[i][type] = true;
      } else {
        this.pageList.forEach((el) => {
          el.showSet = false;
        });
      }
    },
    rename(e) {
      //重命名
      const val = e.target.value;
      if (val && e.keyCode == 13) {
        this.$store.state.pageList[this.activeIndex].pageName = val;
        this.$store.state.pageList[this.activeIndex].readonly = true;
      }
    },
  },
  mounted() {
    const bodyHeight = document.getElementsByTagName("body")[0].offsetHeight;
    this.height = bodyHeight - 160;
  },
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.page {
  position: absolute;
  width: 180px;
  top: 40px;
  left: 0;
  box-sizing: border-box;
  .page-type {
    line-height: 30px;
    display: flex;
    div {
      flex: 1;
      text-align: center;
      cursor: pointer;
      background: #f8f8f8;
    }
    .on {
      background: $home;
    }
  }
  .list {
    padding: 15px;
    position: relative;
    ul {
      position: absolute;
      top: 10px;
      left: 15px;
      width: 150px;
    }
  }
  li {
    box-sizing: border-box;
    text-align: center;
    line-height: 35px;
    position: relative;
    border-radius: 2px;
    color: $fontColor3;
    cursor: default;
    .home {
      position: absolute;
      top: -1px;
      left: 5px;
      background: $home;
      color: #fff;
      width: 20px;
      height: 23px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      &::after {
        content: "";
        position: absolute;
        width: 4px;
        bottom: 0;
        left: 0;
        border-width: 8px;
        border-style: solid;
        border-bottom-width: 4px;
        border-color: transparent transparent #fff transparent;
      }
    }
    i {
      position: absolute;
      font-size: 20px;
      color: $fontColor3;
    }
    .icontubiaozhizuomoban {
      top: -1px;
      left: 5px;
    }
    .iconquanjushezhi {
      top: -1px;
      right: 5px;
      cursor: pointer;
    }
    input {
      width: 90px;
      border: 0;
      color: $fontColor3;
      background: transparent;
      cursor: default;
    }
  }
  .active {
    @include bacColor($baseColor1);
    input {
      color: $fontColor1;
    }
    i {
      color: $fontColor1;
    }
    .home {
      &::after {
        @include borderBottomColor($baseColor1);
        border-left-color: transparent;
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }
  }
  .add {
    width: 150px;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    text-align: center;
    color: $fontColor3;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    padding-left: 0;
    cursor: pointer;
    i {
      position: relative;
      font-size: 14px;
    }
  }
  .rename {
    background: #fff;
  }
}
</style>
