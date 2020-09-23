<template>
  <div class="down">
    <div class="title" :class="{bacfff:show}" @click.stop.prevent="drop">
      {{ item.title }}
      <div class="icon">
        <i class="iconfont iconjiantou_liebiaozhankai-copy2" :class="{rotate: !show}"></i>
      </div>
    </div>
    <div class="sets" :class="{disabled: isDisabled}" v-show="show">
      <div class="wrap" ref="wrap">
        <component
          v-for="(item1, i) in item.drop"
          :setData="setData"
          :drop="item.drop"
          :item="item1"
          :sets="item1.sets"
          :attr="item1.attr"
          :key="i"
          :is="item1.name"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import { setTimeout } from "timers";
export default {
  mixins: [mixins],
  name: "dropdown",
  components: {
    Arrange: () => import("@public/setstyle/arrangestyle"),
    SelectStyle: () => import("@public/setstyle/selectstyle"),
    SetFontSize: () => import("@public/setstyle/fontsize"),
    SetColor: () => import("@public/setstyle/setcolor"),
    SetTextAlign: () => import("@public/setstyle/fontsize"),
    SetPadding: () => import("@public/setstyle/inputpx"),
    SetAdd: () => import("@public/global/setadd"),
    ImgUploadImage: () => import("@public/setstyle/imguploadimage"),
    SingleSelect: () => import("@public/global/singleselect"),
    GoodsList: () => import("@public/setstyle/goods/goodslist"),
    TwoOptions: () => import("@public/setstyle/twooptions"),
    ChooseShow: () => import("@public/setstyle/chooseshow"),
    MultiChoice: () => import("@public/setstyle/multichoice"),
    Arrangebanner: () => import("@public/setstyle/arrangebanner"),
    SingleChoice: () => import("@public/setstyle/singlechoice"),
    SetNav: () => import("@public/setstyle/bottom/setnav"),
    NavPosition: () => import("@public/setstyle/bottom/navposition"),
    UsePage: () => import("@public/setstyle/bottom/usepage"),
    SetHeader: () => import("@public/setstyle/header/set"),
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    isDisabled() {
      let flag = false;
      if (this.setData.id == 9901) {
        if (this.item.title == "使用界面") {
          flag = false;
        } else {
          flag = !this.$store.state.pageList[this.$store.state.pageIndex]
            .isGlobalNav;
        }
      }
      return flag;
    },
  },
  methods: {
    drop() {
      this.show = !this.show;
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.height = this.$refs.wrap.offsetHeight;
    //   this.isHidden = this.height ? "" : "hidden";
    //   setTimeout(() => {
    //     this.transition = "0.3s";
    //   }, 100);
    // }, 50);
  },
};
</script>
<style lang="scss" scoped>
.down {
  margin-bottom: 15px;
  background: #fff;
  .title {
    position: relative;
    background: #f7f7f7;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: $fontColor2;
    text-indent: 0px;
    margin-bottom: 5px;
    user-select: none;
    cursor: pointer;
  }
  .bacfff {
    background: #fff;
  }
  .wrap {
    padding-top: 10px;
  }
  .icon {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 15px;
  }
  .iconfont {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    right: -7px;
    font-size: 22px;
    color: $fontColor3;
  }
  .rotate {
    transform: rotate(-90deg);
    top: 6px;
    right: -6px;
  }
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
