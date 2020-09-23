<template>
  <div
    class="images"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow }"
    :style="{
      paddingLeft: msg.style.paddingLeft + 'px',
      paddingRight: msg.style.paddingLeft + 'px',
      paddingTop: !msg.isShow ? 0 : msg.style.paddingTop + 'px',
      paddingBottom: !msg.isShow ? 0 : msg.style.paddingTop + 'px',
    }"
    @mousedown="comDown($event)"
  >
    <div
      class="item"
      v-for="(item, i) in list"
      :key="i"
      :style="{
        marginLeft: i % num != 0 ? msg.style.marginLeft + 'px' : '',
        marginTop: i > num - 1 ? msg.style.marginTop + 'px' : '',
      }"
    >
      <div
        class="img"
        :class="{set: item.src}"
        :style="{
          height: msg.style.height + 'px',
          width: msg.style.width + 'px',
          backgroundImage: `url(${item.src})`,
        }"
      >
        <div class="bac" :class="{ small: num > 3 }" v-if="!item.src"></div>
      </div>
      <p ref="p" v-if="item.title">{{ item.title }}</p>
      <!-- <p ref="p" v-if="item.title !== ''||item.title !== null">{{ item.title }}</p> -->
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
import src from "@assets/image/right/img_cur_bac.png";
export default {
  mixins: [mixins],
  name: "images",
  data() {
    return {};
  },
  computed: {
    list() {
      return this.msg.imgArr;
    },
    num() {
      return this.msg.domNum;
    },
    imgSrc() {},
  },
};
</script>
<style lang="scss" scoped>
.images {
  position: relative;
  width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .item {
    position: relative;
    p {
      width: 100%;
      position: absolute;
      line-height: 30px;
      bottom: 0;
      height: 30px;
      overflow: hidden;
      left: 0;
      text-align: center;
      color: #fff;
      background: rgba($color: #000000, $alpha: 0.4);
      z-index: 1;
    }
    .bac {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top: -30px;
      background: url("../../assets/image/right/img_cur_bac.png") no-repeat;
    }
    .small {
      width: 40px;
      height: 40px;
      margin-left: -20px;
      margin-top: -20px;
      background-size: 100%;
    }
    .img {
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;
      background-color: #8894a0;
      a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img.set {
      background-color: rgba($color: #8894a0, $alpha: 0);
    }
  }
}
.noheight {
  height: 0;
  border: 0;
  padding: 0;
  margin: 0;
  // transition: 0.3s;
}
</style>
