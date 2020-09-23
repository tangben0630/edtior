<template>
  <div class="arrange" ref="arrange">
    <div
      class="item"
      v-for="(item, i) in sets"
      :key="item.con"
      :class="{ border: item.isActive }"
      @click="click(i)"
    >
      <div class="one" v-if="!i">
        <div></div>
      </div>
      <div class="two" v-if="i==1">
        <div></div>
        <div></div>
      </div>
      <div class="three" v-if="i==2">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="four" v-if="i==3">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-if="item.con">{{ item.con }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "arrangestyle",
  data() {
    return {
      disabledObj: {},
    };
  },
  props: {
    sets: {
      type: Array,
    },
    setData: {
      type: Object,
    },
    attr: {
      type: String,
    },
  },
  methods: {
    click(i) {
      const type = this.attr;
      const [obj] = this.setData.setStyleList
        .filter((item) => item.title == "外观设置")[0]
        .drop.filter((item) => item.attr == "marginLeft");
      switch (type) {
        case "navstyle":
          this.navStyle(i);
          break;
        case "navshape":
          this.navShape(i);
          break;
        default:
          if (i) {
            obj.isDisabled = false;
            this.setData.style.paddingLeft = this.sets[i].paddingLeft;
            this.setData.style.paddingTop = this.sets[i].paddingTop;
            this.setData.domNum = i + 1;
            switch (i) {
              case 1: //一行2列
                this.setData.style.marginLeft = this.sets[i].marginLeft;
                this.setData.style.marginTop = this.sets[i].marginTop;
                this.setData.style.height = this.sets[i].height;
                break;
              case 2: //一行3列
                this.setData.style.marginLeft = this.sets[i].marginLeft;
                this.setData.style.marginTop = this.sets[i].marginTop;
                this.setData.style.height = this.sets[i].height;
                break;
              case 3: //一行4列
                this.setData.style.marginLeft = this.sets[i].marginLeft;
                this.setData.style.marginTop = this.sets[i].marginTop;
                this.setData.style.height = this.sets[i].height;
                break;
              default:
                break;
            }
            this.setData.style.width =
              (320 -
                parseInt(this.setData.style.paddingLeft) * 2 -
                parseInt(this.setData.style.marginLeft) * i) /
              (i + 1);
          } else {
            obj.isDisabled = true;
            this.setData.domNum = 1;
            this.setData.style.paddingLeft = this.sets[i].paddingLeft;
            this.setData.style.paddingTop = this.sets[i].paddingTop;
            this.setData.style.marginLeft = this.sets[i].marginLeft;
            this.setData.style.marginTop = this.sets[i].marginTop;
            this.setData.style.height = this.sets[i].height;
            this.setData.style.width =
              320 - parseInt(this.setData.style.paddingLeft) * 2;
          }
          break;
      }
      this.sets.forEach((el) => {
        el.isActive = false;
      });
      this.sets[i].isActive = true;
    },
    navStyle(i) {
      this.setData.isImage = this.sets[i].isImage;
      this.setData.isText = this.sets[i].isText;
    },
    navShape(i) {
      this.setData.style["borderRadius"] = this.sets[i].radius;
    },
  },
  mounted() {
    if (this.sets[0].isActive) {
      this.setData.style.marginLeft = 0;
      const [obj] = this.setData.setStyleList
        .filter((item) => item.title == "外观设置")[0]
        .drop.filter((item) => item.attr == "marginLeft");
      obj && (obj.isDisabled = true);
    }
  },
};
</script>
<style lang="scss" scoped>
.arrange {
  box-sizing: border-box;
  display: flex;
  .item {
    flex: 1;
    width: 52px;
    height: 52px;
    margin-left: 10px;
    font-size: 12px;
    color: $fontColor3;
    text-align: center;
    user-select: none;
    position: relative;
    cursor: pointer;
    @include border(#e5e5e5);
    span {
      position: absolute;
      bottom: 2px;
      left: 2px;
    }
    &:nth-child(1) {
      margin: 0;
    }
    .one {
      width: 36px;
      height: 22px;
      background-color: $fontColor3;
      margin: 8px 0 5px 8px;
      overflow: hidden;
      div {
        background-image: url("../../../assets/image/right/img_cur_bac.png");
        background-size: 100% 100%;
        width: 20px;
        height: 18px;
        margin-left: 8px;
        margin-top: 1px;
      }
    }
    .two {
      overflow: hidden;
      margin-top: 10px;
      margin-left: 6px;
      margin-bottom: 6px;
      div {
        float: left;
        width: 18px;
        height: 18px;
        margin-right: 3px;
        background-color: $fontColor3;
        background-size: 80% 80%;
        background-image: url("../../../assets/image/right/img_cur_bac.png");
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .three {
      overflow: hidden;
      margin-top: 13px;
      margin-left: 6px;
      margin-bottom: 8px;
      div {
        float: left;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-color: $fontColor3;
        background-size: 80% 80%;
        background-image: url("../../../assets/image/right/img_cur_bac.png");
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .four {
      overflow: hidden;
      margin-top: 14px;
      margin-left: 6px;
      margin-bottom: 8px;
      div {
        float: left;
        width: 9px;
        height: 10px;
        margin-right: 1px;
        background-color: $fontColor3;
        background-size: 80% 80%;
        background-image: url("../../../assets/image/right/img_cur_bac.png");
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .border {
    @include borderColor($baseColor1);
  }
}
</style>
