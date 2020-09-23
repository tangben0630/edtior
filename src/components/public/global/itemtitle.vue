<template>
  <div class="group">
    <div class="title">{{item.title}}</div>
    <div class="sets">
      <div class="wrap" ref="wrap">
        <component
          v-for="(ele, i) in item.element"
          :setData="setData"
          :item="ele"
          :sets="ele.sets"
          :key="i"
          :is="ele.name"
          :setAttr="ele.attr"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "itemtitle",
  components: {
    SetColor: () => import("@public/setstyle/setcolor"),
    SetText: () => import("@public/setstyle/textinput"),
    SetInput: () => import("@public/setstyle/textinput"),
    SetImage: () => import("@public/setstyle/setimage"),
    SetBackgroundSize: () => import("@public/setstyle/backgroundsize"),
    SetLink: () => import("@public/setstyle/page/setlink"),
    SetCode: () => import("@public/setstyle/page/setcode"),
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.group {
  margin-bottom: 15px;
  .title {
    position: relative;
    background: #f7f7f7;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: $fontColor2;
    text-indent: 10px;
    margin-bottom: 5px;
  }
  .sets {
    transition: 0.4s;
  }
  .wrap {
    padding-top: 10px;
  }
  .iconfont {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 15px;
    font-size: 22px;
    color: $fontColor3;
  }
}
</style>