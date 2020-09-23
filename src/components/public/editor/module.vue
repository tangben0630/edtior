<template>
  <transition name="slide-fade">
    <div class="page-wrap">
      <div class="page">
        当前页面：{{
        this.$store.state.pageList[this.$store.state.pageIndex].pageName
        }}
        <div
          class="empity"
          v-if="templateList.length < 1 && !$store.state.pageList[$store.state.pageIndex].isHeader && !currentGlobal"
        >当前没有模块</div>
      </div>
      <div class="set-left" ref="setLeft">
        <div
          class="left-item"
          :class="{ active: headerData.setData.isOnclick }"
          v-if="$store.state.pageList[$store.state.pageIndex].isHeader"
        >
          <div @click.stop.prevent="setLeftFn()">
            <span
              :class="{
                light: headerData.setData.isShow,
                notshow: !headerData.setData.isShow,
              }"
            >{{ headerData.reName }}</span>
          </div>
          <i
            class="iconfont"
            :class="{
              iconxianshi_huaban: headerData.setData.isShow,
              'iconicon-test': !headerData.setData.isShow,
            }"
            @click.stop.prevent="showCom()"
          ></i>
          <i class="iconfont iconshanchu" @click.stop.prevent="setCom()"></i>
        </div>
        <div
          class="left-item"
          :class="{ active: $store.state.globalNavData.setData.isOnclick }"
          v-if="currentGlobal"
        >
          <div @click.stop.prevent="setLeftFn(9901)">
            <span
              :class="{
                light: $store.state.globalNavData.setData.isShow,
                notshow: !$store.state.globalNavData.setData.isShow,
              }"
            >{{ $store.state.globalNavData.reName }}</span>
          </div>
          <i
            class="iconfont"
            :class="{
              iconxianshi_huaban: $store.state.globalNavData.setData.isShow,
              'iconicon-test': !$store.state.globalNavData.setData.isShow,
            }"
            @click.stop.prevent="showCom(9901)"
          ></i>
          <i class="iconfont iconshanchu" @click.stop.prevent="setCom(9901)"></i>
        </div>
      </div>
      <vue-scroll :ops="ops" :style="{ height: height + 'px' }" v-if="this.$store.state.isSelfPage">
        <div class="set-left set-left-module" ref="setLeft">
          <div
            class="left-item"
            :class="{ active: item.setData.isOnclick }"
            v-for="(item, i) in templateList"
            v-show="item.moduleName != '全局导航'"
            :key="item.id"
            @mousedown.stop.prevent="setLeftFn(i)"
          >
            <div @mousedown.stop.prevent="setLeftFn(i)">
              <span
                :class="{
                  light: item.setData.isShow,
                  notshow: !item.setData.isShow,
                }"
              >{{ item.reName }}</span>
            </div>
            <i
              class="iconfont"
              :class="{
                iconxianshi_huaban: item.setData.isShow,
                'iconicon-test': !item.setData.isShow,
                disabled: item.setData.setTitle == '全局导航',
              }"
              @mousedown.stop.prevent="showCom(i)"
            ></i>
            <i class="iconfont iconshanchu" @mousedown.stop.prevent="setCom(i)"></i>
          </div>
        </div>
      </vue-scroll>
    </div>
  </transition>
</template>
<script>
import $ from "jquery";
import Sortable from "sortablejs";
import mixin from "@mixin/edtior";
import { maroon } from "color-name";
import common from "@assets/js/common";
export default {
  mixins: [mixin],
  name: "module",
  data() {
    return {
      clickTime: 0,
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
      height: 0,
      msg: {},
      obj: {},
    };
  },
  computed: {
    templateList: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex]
          .templateList;
      },
    },
    headerData: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex]
          .headerData;
      },
    },
    currentGlobal: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav;
      }
    } 
  },
  methods: {
    setLeftFn(index) {
      let show_flag;
      if (typeof index == "number") {
        if(index == 9901){
          show_flag = this.$store.state.globalNavData.setData.isShow;
        }else{
          show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
            .templateList[index].setData.isShow;
        }
      } else {
        show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
          .headerData.setData.isShow;
      }
      // 统一去除黄线框
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].templateList.forEach((item) => {
        item.setData.isOnclick = false;
      });
      if (this.$store.state.pageList[this.$store.state.pageIndex].headerData) {
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].headerData.setData.isOnclick = false;
      }
      if (this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav) {
        this.$store.state.globalNavData.setData.isOnclick = false;
      }
      if (show_flag) {
        const body = document.getElementsByClassName("main-content")[0];
        if(typeof index == "number"){
          if(index == 9901){
            this.msg = this.$store.state.globalNavData.setData;
            this.msg.id = index;
            this.$store.state.globalNavData.setData.isOnclick = true;
          }else{
            this.msg = this.$store.state.pageList[this.$store.state.pageIndex].templateList[index].setData;
            this.msg.id = this.$store.state.pageList[this.$store.state.pageIndex].templateList[index].id;
            this.$store.state.pageList[this.$store.state.pageIndex].templateList[index].setData.isOnclick = true;
          }
        }else{
          this.msg = this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData;
          this.msg.id = this.$store.state.pageList[this.$store.state.pageIndex].headerData.id;
          this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isOnclick = true;
        }
        this.$store.commit("changeNowComponent", this.msg);
        setTimeout(() => {
          const divs = document.getElementsByClassName("com-wrap")[0].children;
          const wrapHeight = document.getElementsByClassName("com-wrap")[0]
            .offsetHeight;
          let height = 0;
          while (index && index < 9901) {
            height += divs[index].offsetHeight;
            index--;
          }
          wrapHeight > 600 &&
            $(body).animate(
              {
                scrollTop: height - 600,
              },
              300
            );
        }, 50);
      }
    },
    showCom(i) {
      let show_flag;
      if (typeof index == "number") {
        if(index == 9901){
          show_flag = this.$store.state.globalNavData.setData.isShow;
        }else{
          show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
            .templateList[index].setData.isShow;
        }
      } else {
        show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
          .headerData.setData.isShow;
      }
      if (show_flag) {
        if(typeof index == "number"){
          if(index == 9901){
            this.$store.state.globalNavData.setData.isShow = false;
          }else{
            this.$store.state.pageList[this.$store.state.pageIndex].templateList[i].setData.isShow = false;
          }
        }else{
          this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isShow = false;
        }
      } else {
        if(typeof index == "number"){
          if(index == 9901){
            this.$store.state.globalNavData.setData.isShow = true;
          }else{
            this.$store.state.pageList[this.$store.state.pageIndex].templateList[i].setData.isShow = true;
          }
        }else{
          this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isShow = true;
        }
        this.setLeftFn(i);
      }
    },
    setCom(i) {
      this.setLeftFn(i);
      let show_flag;
      if (typeof i == "number") {
        if(i == 9901){
          show_flag = this.$store.state.globalNavData.setData.isShow;
        }else{
          show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
            .templateList[i].setData.isShow;
        }
      } else {
        show_flag = this.$store.state.pageList[this.$store.state.pageIndex]
          .headerData.setData.isShow;
      }
      if (!show_flag) {
        if(typeof i == "number"){
          if(i == 9901){
            this.$store.state.globalNavData.setData.isShow = false;
          }else{
            this.$store.state.pageList[this.$store.state.pageIndex].templateList[i].setData.isShow = false;
          }
        }else{
          this.$store.state.pageList[this.$store.state.pageIndex].headerData.setData.isShow = false;
        }
      }
      this.$store.state.isDelete = true;
      if(typeof i == "number"){
        if(i == 9901){
          this.$store.state.deleteId = i;
        }else{
          this.$store.state.deleteId = this.$store.state.pageList[this.$store.state.pageIndex].templateList[i].id
        }
      }else{
        this.$store.state.deleteId = this.$store.state.pageList[this.$store.state.pageIndex].headerData.id;
      }
      this.$store.state.deleteHeader = typeof i == "number" ? false : true;
    },
  },
  mounted() {
    const templateList = this.$refs.setLeft;
    const me = this;
    new Sortable(templateList, {
      group: {
        name: "shared",
        pull: false,
      },
      animation: 300,
      forceFallback: true,
      bubbleScroll: true,
      invertSwap: true,
      ghostClass: "ghost1",
      dragClass: "drag1",
      bubbleScroll: true,
      removeCloneOnHide: true,
      scrollSpeed: 8,
      scroll: true,
      scrollSensitivity: 60,
      fallbackOnBody: true,
      swapThreshold: 1,
      onAdd: (e) => {
        let obj;
        const txt = e.clone.getAttribute("data");
        this.$store.state.pageList[this.$store.state.pageIndex].comId++;
        const len =
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.filter(
            (item) => item.moduleName == txt && !item.isCopy
          ).length + 1;
          
        obj = this.getModuleData(txt, len);
        this.$store.commit("changeAddComponent", obj);
        this.obj = obj.setData;
        this.obj.id = obj.id;
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList.forEach((item) => {
          item.setData.isOnclick = false;
        });
        obj.setData.isOnclick = true;
        this.$store.commit("changeNowComponent", this.obj);
        templateList.removeChild(e.item);
        this.$store.commit("addComponent", e.newIndex);
        Array.from(document.getElementsByClassName("left-item-click")).forEach(
          (el, i) => {
            const txt = this.$store.state.curTemplateList[i].title;
            el.onmousedown = function (e) {
              const x = e.clientX;
              const y = e.clientY;
              document.onmouseup = function (e) {
                const upX = e.clientX;
                const upY = e.clientY;
                x == upX && y == upY && me.elclick(txt, $);
                document.onmouseup = null;
              };
            };
          }
        );
        this.setLeftFn(e.newIndex);
      },
      onEnd: (e) => {
        if (e.oldIndex != e.newIndex) {
          this.$store.commit("updateTemplateList", {
            oldIndex: e.oldIndex,
            newIndex: e.newIndex,
          });
          this.setLeftFn(e.newIndex);
        }
      },
    });
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
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0s;
}
.page-wrap {
  padding-bottom: 20px;
  // overflow-y: scroll;
  overflow-x: hidden;
}
.page {
  width: 150px;
  box-sizing: border-box;
  padding-left: 20px;
  position: relative;
  line-height: 30px;
  text-align: left;
  background: #f9f9f9;
  color: #8d8e92;
  margin: 10px 15px;
}
.right {
  position: absolute;
  width: 17px;
  height: 100%;
  top: 40px;
  right: 0;
  z-index: 22;
  background: #fff;
}
.ghost1 {
  text-align: center;
  position: relative;
}
.drag1 {
  text-align: center;
  position: relative;
  width: 180px;
  i {
    display: none;
  }
}
.empity {
  line-height: 50px;
  text-align: center;
  color: $fontColor3;
  position: absolute;
  font-size: 16px;
  box-sizing: border-box;
  top: 40px;
  left: 0;
  height: 34px;
  line-height: 32px;
  width: 150px;
  z-index: 1;
  user-select: none;
  border: 2px dashed;
  @include borderColor($baseColor1);
}
.set-left {
  .left-item {
    user-select: none;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 20px;
    border-bottom: 1px solid #eee;
    position: relative;
    input {
      position: absolute;
      top: 5px;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 30px;
    }
    div {
      width: 90px;
      overflow: hidden;
      height: 30px;
    }
    i {
      position: absolute;
      top: 0px;
      right: 42px;
      font-size: 18px;
      cursor: pointer;
      color: $fontColor2;
    }
    .iconshanchu {
      right: 18px;
      font-size: 20px;
    }
  }

  .active {
    @include bacColor($baseColor1);
  }
  .light {
    color: $fontColor2;
  }
  .notshow {
    color: $fontColor4;
  }
}
.set-left-module {
  min-height: 500px;
}
.disabled {
  opacity: 0.3;
  pointer-events: none;
}
</style>
