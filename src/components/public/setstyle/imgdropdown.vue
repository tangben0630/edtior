<template>
  <div class="down">
    <div class="title" :class="{bacfff:show}" @click.stop.prevent="drop">
      {{ item.title }}
      <div class="icon">
        <i class="iconfont iconjiantou_liebiaozhankai-copy2" :class="{rotate: !show}"></i>
      </div>
    </div>
    <div class="sets" v-show="show" :style="{
      }">
      <div class="wrap" ref="wrap">
        <ImgUploadImage
          :setData="setData"
          :item="item"
          :sets="item.sets"
          @reset="reset"
          v-if="isRender"
        />
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import Sortable from "sortablejs";
import Common from "@assets/js/common";
import ImgUploadImage from "@public/setstyle/imguploadimage";
export default {
  mixins: [mixins],
  name: "imgdropdown",

  components: {
    ImgUploadImage,
  },
  data() {
    return {
      height: 0,
      transition: "0",
      canHeight: false,
      index: 0,
      list: [],
      isHidden: "",
      isRender: true,
      show: true,
    };
  },
  computed: {
    imgArr() {
      return this.setData.setImgArr;
    },
  },
  methods: {
    drop() {
      this.show = !this.show;
      if (this.isHidden) {
        setTimeout(() => {
          this.isHidden = !this.show ? "" : "hidden";
        }, 300);
      } else {
        this.isHidden = !this.show ? "" : "hidden";
      }
    },
    reset() {
      this.isRender = false;
      setTimeout(() => {
        this.isRender = true;
      }, 30);
    },
  },

  mounted() {
    setTimeout(() => {
      this.index = this.setData.setStyleList.findIndex(
        (item) => item.isAdd == true
      );
    }, 50);
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
  .iconfont {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 15px;
    font-size: 22px;
    color: $fontColor3;
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
  .aaaa {
    line-height: 40px;
    text-align: center;
    border: 1px solid #ddd;
    margin-bottom: 2px;
    position: relative;
    span {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      right: 0;
      background: royalblue;
      cursor: pointer;
    }
  }
}
</style>
