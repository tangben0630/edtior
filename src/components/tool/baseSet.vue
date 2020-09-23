<template>
  <div
    class="base"
    v-if="this.$store.state.isDrop"
    id="baseSet"
    :style="{
      height: setData.isAdd ? 'calc(100% - 50px)' : '100%',
    }"
  >
    <vue-scroll :ops="ops">
      <component
        v-for="item in setData.setStyleList"
        :key="item.id"
        :is="item.name"
        :setData="setData"
        :item="item"
      ></component>
    </vue-scroll>
  </div>
</template>
<script>
export default {
  name: "baseSet",
  components: {
    SetText: () => import("@public/setstyle/textinput"),
    SetInput: () => import("@public/setstyle/titleinput"),
    TemplateReName: () => import("@public/setstyle/templaterename"),
    SetFontSize: () => import("@public/setstyle/fontsize"),
    SetColor: () => import("@public/setstyle/setcolor"),
    SetTextAlign: () => import("@public/setstyle/fontsize"),
    Signaddress: () => import("@public/setstyle/signaddress"),
    SetPadding: () => import("@public/setstyle/inputpx"), //lineshowstyle
    Dropdown: () => import("@public/global/dropdown"),
    ImgDropDown: () => import("@public/setstyle/imgdropdown"),
    SetAdd: () => import("@public/global/setadd"),
    Switchstyle: () => import("@public/setstyle/switchstyle"),
    Signstyle: () => import("@public/setstyle/signstyle"),
    Doubleselect: () => import("@public/setstyle/doubleselect"),
    Lineshowstyle: () => import("@public/setstyle/lineshowstyle"),
  },
  data() {
    return {
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
  computed: {
    setData: {
      get() {
        let a = this.$store.state.pageList[this.$store.state.pageIndex]
          .nowCommponent;
        let curTemp;
        if (a) {
          let title = a.setTitle;
          if (title == "全局导航") {
            curTemp = this.$store.state.globalNavData.setData;
          } else {
            curTemp = this.$store.state.pageList[this.$store.state.pageIndex]
              .nowCommponent;
          }
        } else {
          curTemp = { setStyleList: [] };
        }
        return curTemp;
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.base {
  height: calc(100% - 50px);
}
</style>
