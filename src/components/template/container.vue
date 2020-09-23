<template>
  <div
    class="images"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow }"
    :style="{
      paddingLeft: msg.style.paddingLeft + 'px',
      paddingRight: msg.style.paddingLeft + 'px',
      textAlign: msg.style.textAlign
    }"
    @mousedown="comDown($event)"
  >
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="aaa">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>-->
    </div>
    <!-- <div
      class="item"
      v-for="(item, i) in list"
      :key="i"
      :style="{
        marginLeft: i % num != 0 ? msg.style.marginLeft + 'px' : '',
        marginTop: i > num - 1 ? msg.style.marginTop + 'px' : '',
      }"
    >-->
    <!-- <div
        class="img"
        v-show="i < 1"
        :style="{
          height: msg.style.height + 'px',
          width: msg.style.width + 'px',
          backgroundImage: `url(${item.src})`,
        }"
    >-->

    <!-- <div class="bac" :class="{ small: num > 3 }" v-if="!item.src"></div> -->
    <!-- </div> -->
    <!-- <p ref="p" v-if="item.title !== ''">{{ item.title }}</p> -->
    <!-- </div> -->
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
import src from "@assets/image/right/img_cur_bac.png";
export default {
  mixins: [mixins],
  name: "banner",
  data() {
    return {
      delay: 2000,
      effect: "slide",
      textAlign: "right",
      swiper: null,
      showStyle: 1,
      signStyle: 1
    };
  },
  watch: {
    // delay() {
    //   if (this.swiper) {
    //     this.swiper.destroy();
    //     this.initSwiper();
    //   }
    // },
    // effect() {
    //   if (this.swiper) {
    //     this.swiper.destroy();
    //     this.initSwiper();
    //   }
    // },
    // showStyle() {
    //   if (this.swiper) {
    //     this.swiper.destroy();
    //     this.initSwiper();
    //   }
    // },
    // signStyle() {
    //   if (this.swiper) {
    //     this.swiper.destroy();
    //     this.initSwiper();
    //   }
    // },
    // textAlign() {
    //   console.log(this.msg.style.textAlign, "textAlign");
    // }
  },
  computed: {
    list() {
      return this.msg.imgArr;
    },
    num() {
      return this.msg.domNum;
    }
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        effect: this.effect, //fade, slide
        autoplay: {
          delay: this.delay,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
        preventClicksPropagation: false,
        preventClicks: false, //默认true
        allowTouchMove: false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  },
  mounted() {
    console.log(this.msg, "this.msg");

    // this.delay = this.msg.swiper.delay;
    // this.effect = this.msg.swiper.effect;
    // this.textAlign = this.msg.swiper.textAlign;
    // this.showStyle = this.msg.swiper.showStyle;
    // this.signStyle = this.msg.swiper.signStyle;
    this.$nextTick(() => {
      this.initSwiper();
    });
  }
};
</script>
<style lang="scss" scoped>
.images {
  position: relative;
  width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .swiper-container {
    width: 100%;
    height: 150px;
    div {
      text-align: center;
    }
    .swiper-slide {
      background: cadetblue;
    }
    .swiper-pagination {
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
  .swiper-pagination-bullet {
    background: brown;
  }
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: red;
  }
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
