<template>
  <div class="editor" id="zhihuo-editor">
    <div class="edtior-wrap">
      <HeaderSet
        v-if="$store.state.pageList[$store.state.pageIndex].isHeader"
        :is="headerData.name"
        :msg="headerData.setData"
      ></HeaderSet>
      <div class="com-wrap" ref="comWrap" id="com-wrap" :style="pageStyle">
        <component
          class="component"
          v-for="(item, i) in templateList"
          :key="item.id"
          :is="item.name"
          :comIndex="i"
          :msg="item.setData"
        ></component>
      </div>
      <EdtiorBottom v-if="!$store.state.pageList[$store.state.pageIndex].isSystem"></EdtiorBottom>
      <GlobalNav
        v-if="$store.state.pageList[$store.state.pageIndex].isGlobalNav"
        :comIndex="9901"
        :msg="$store.state.globalNavData"
      ></GlobalNav>
    </div>
    <div
      class="empity"
      v-if="
        !$store.state.pageList[$store.state.pageIndex].isSystem &&
          templateList.length < 1 && !$store.state.pageList[$store.state.pageIndex].isHeader
      "
    >
      <p>请从左侧工具模块区</p>
      <p>
        选择需要的模块
        <span>点击</span> 或
        <span>拖拽</span> 到此编辑区
      </p>
      <p>进行页面设计</p>
    </div>
    <RightTool />
    <Addhtml v-if="this.$store.state.isAddHtml" />
    <Deltoast v-if="this.$store.state.isDelete" />
    <div class="show-message" v-if="0" @click="showLinkMan">信息</div>
    <linkman />
    <ImageUpload v-if="this.$store.state.isImageUpload"></ImageUpload>
  </div>
</template>
<script>
import RightTool from "@tool/midRightTool";
import Deltoast from "@public/global/deltoast";
import Addhtml from "@public/editor/addhtml";
import linkman from "@chat/linkman";
import mixin from "@mixin/edtior";
import mixinTemp from "@mixin/templateMixin";
import $ from "jquery";
import Sortable from "sortablejs";
import ImageUpload from "@public/global/imageupload";
import { isBoolean, log } from "util";
import EdtiorBottom from "./EdtiorBottom";
import HeaderSet from "@template/header";
import GlobalNav from "@template/globalnav";
export default {
  mixins: [mixin, mixinTemp],
  name: "MidEditor",
  components: {
    RightTool,
    Deltoast,
    Addhtml,
    linkman,
    ImageUpload,
    EdtiorBottom,
    HeaderSet,
    GlobalNav,
    Title: () => import("@template/text"),
    LineCom: () => import("@template/line"),
    Images: () => import("@template/images"),
    Banner: () => import("@template/banner"),
    KindNav: () => import("@template/kindnav"),
    ShowArea: () => import("@template/showarea"),
    Container: () => import("@template/container"),
    Login: () => import("@template/system/login"),
    Details: () => import("@template/system/details"),
    Personal: () => import("@template/system/personal"),
    Register: () => import("@template/system/register"),
  },
  data() {
    return {
      opstion: {
        rail: {
          opacity: 0,
          size: "4px",
          specifyBorderRadius: false,
          gutterOfSide: "0",
          keepShow: true,
          border: "none",
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false,
          background: "#ddd",
        },
      },
      clickTime: 0,
      obj: {},
      height: 0,
    };
  },
  computed: {
    templateList: {
      get() {
        let a = 0;
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList.forEach((item, i) => {
          if (item.moduleName == "全局导航") {
            item.setData = this.$store.state.globalNavData.setData;
            a++;
            item.id += a;
            this.$store.state.pageList[
              this.$store.state.pageIndex
            ].templateList.splice(i, 1);
          }
        });
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList = this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList.filter((item) => item.moduleName != "头部");
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
    pageStyle() {
      this.$store.state.pageList.forEach((item) => {
        if (item.isGlobalNav) {
          item.flag = true;
        }
      });
      let obj = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .style;
      let flag = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .isUseHeight;
      let src = obj.backgroundImage;
      src = src ? src.split("url(")[1].split(")")[0] : src;
      obj["backgroundImage"] = "url(" + src + ")";
      let attr = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .paddingAttr;
      obj[attr] = this.$store.state.pageList[
        this.$store.state.pageIndex
      ].setting.style[attr];
      // if (attr == "paddingBottom") {
      //   if (flag) {
      //     this.$store.state.pageList[
      //       this.$store.state.pageIndex
      //     ].setting.style.paddingTop = "40px";
      //   } else {
      //     this.$store.state.pageList[
      //       this.$store.state.pageIndex
      //     ].setting.style.paddingTop = 0;
      //   }
      // } else if (attr == "paddingTop") {
      //   if (flag) {
      //     this.$store.state.pageList[
      //       this.$store.state.pageIndex
      //     ].setting.style.paddingTop = "90px";
      //   } else {
      //     this.$store.state.pageList[
      //       this.$store.state.pageIndex
      //     ].setting.style.paddingTop = "50px";
      //   }
      // }
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].setting.style.paddingBottom = 0;
      return obj;
    },
  },
  methods: {
    showLinkMan() {
      this.$store.state.linkManRight = 2;
    },
    coverHeight(list, mark) {},
  },
  mounted() {
    const me = this;
    const body = document.getElementsByTagName("body")[0];
    const templateList = this.$refs.comWrap;
    new Sortable(templateList, {
      group: {
        name: "shared",
        pull: false,
      },
      animation: 300,
      filter: ".product-list-modal-part",
      forceFallback: true,
      removeCloneOnHide: true,
      fallbackOnBody: true,
      onAdd: (e) => {
        me.$store.state.coverShow = false;
        const txt = e.clone.getAttribute("data");
        const len =
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].templateList.filter(
            (item) => item.moduleName == txt && !item.isCopy
          ).length + 1;
        let obj;
        this.$store.state.pageList[this.$store.state.pageIndex].comId++;
        obj = this.getModuleData(txt, len);
        this.$store.state.elHeight = obj.height;
        if (obj.height) {
          this.$store.state.coverHeight -= obj.height;
        }
        this.$store.commit("changeAddComponent", obj);
        this.obj = obj.setData;
        this.obj.id = obj.id;
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
        if (
          this.$store.state.pageList[this.$store.state.pageIndex].isGlobalNav
        ) {
          this.$store.state.globalNavData.setData.isOnclick = false;
        }
        templateList.removeChild(e.item);
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList.splice(e.newIndex, 0, obj);
        this.$store.state.pageList[this.$store.state.pageIndex].templateList[
          e.newIndex
        ].setData.isOnclick = true;
        this.$store.commit("changeNowComponent", this.obj);
        if (txt == "全局导航") {
          this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
            "paddingBottom"
          ] = this.obj.style.height;
        }

        // 判断头部
        if (txt == "头部") {
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].setting.isUseHeight = true;
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].isHeader = true;
          this.$store.commit("changeCurTempList", true);
          // this.$store.state.curTemplateList.forEach((item) => {
          //   if (item.title == "头部") {
          //     this.$store.state.pageList[
          //       this.$store.state.pageIndex
          //     ].setting.isUseHeight = true;
          //   }
          // });
        }
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
      },
      onEnd: (e) => {
        if (e.oldIndex != e.newIndex) {
          this.$store.commit("updateTemplateList", {
            oldIndex: e.oldIndex,
            newIndex: e.newIndex,
          });
        }
      },
      onStart: function (/**Event*/ evt) {},
      onMove: () => {},
    });
  },
};
</script>
<style lang="scss" scoped>
.editor {
  position: relative;
  padding: 10px;
  width: 340px;
  min-height: 585px;
  margin: 45px auto;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  .edtior-wrap {
    min-height: 565px;
    position: relative;
    @include border(#f8f8f8);
  }
  .com-wrap {
    position: relative;
    width: 320px;
    min-height: 460px;
  }

  .empity {
    text-align: center;
    color: $fontColor3;
    position: absolute;
    font-size: 16px;
    background: #fff;
    top: 10%;
    left: 3%;
    right: 3%;
    box-sizing: border-box;
    padding: 40px 30px;
    user-select: none;
    border: 2px dashed;
    @include borderColor($baseColor1);
    p {
      font-size: 14px;
      @include fontColor($baseColor1);
      span {
        color: red;
      }
    }
  }
  .component {
    position: relative;
  }
}
.show-message {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 40px;
  background: #fff;
  box-shadow: 0 11px 30px 3px #fff;
  z-index: $index5;
  text-align: center;
  line-height: 40px;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
}
</style>
