<template>
  <div
    class="images"
    ref="images"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow }"
    :style="{
      paddingLeft: paddingLeft + 'px',
      paddingRight: paddingLeft + 'px',
      paddingTop: msg.isShow ? msg.style.paddingTop + 'px' : 0,
      paddingBottom: msg.isShow ? msg.style.paddingTop + 'px' : 0,
    }"
    @mousedown="comDown($event)"
  >
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="(item, i) in list" :key="i">
          <div
            class="img"
            :class="{set: item.src}"
            :style="{
              backgroundImage: `url(${item.src})`,
            }"
          >
            <div class="bac" v-if="!item.src"></div>
            <p ref="p" v-if="item.title !== '' && item.title !== undefined">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination" :style="{textAlign: textAlign}" v-show="textAlign != 'left'"></div> -->
      <!-- 自定义 分页器 -->
      <div
        v-show="!this.msg.style.signStyle && showPagination"
        class="my-pagination"
        :style="{ textAlign: msg.style.textAlign }"
      >
        <span
          v-for="(item, i) in list"
          :key="i"
          :class="{ active: i == bannerIndex }"
          :style="{
            background:
              i == bannerIndex ? msg.style.colorActive : msg.style.colorCur,
          }"
        ></span>
      </div>
      <div
        v-if="this.msg.style.signStyle == 1 && showPagination"
        class="my-pagination"
        :style="{ textAlign: msg.style.textAlign }"
      >
        <span
          class="type2"
          v-for="(item, i) in list"
          :key="i"
          :class="{ active: i == bannerIndex }"
          :style="{
            background:
              i == bannerIndex ? msg.style.colorActive : msg.style.colorCur,
          }"
        ></span>
      </div>
      <div
        v-if="this.msg.style.signStyle == 2 && showPagination"
        class="my-pagination"
        :style="{ textAlign: msg.style.textAlign }"
      >
        <span
          class="type3"
          v-for="(item, i) in list"
          :key="i"
          :class="{ active3: i == bannerIndex }"
          :style="{
            background:
              i == bannerIndex ? msg.style.colorActive : msg.style.colorCur,
          }"
        ></span>
      </div>
      <div
        v-if="this.msg.style.signStyle == 3 && showPagination"
        class="my-pagination"
        :style="{ textAlign: msg.style.textAlign }"
      >
        <span
          class="type4"
          v-for="(item, i) in list"
          :key="i"
          :class="{ active4: i == bannerIndex }"
          :style="{
            color:
              i == bannerIndex ? msg.style.colorActive : msg.style.colorCur,
          }"
        >{{ i + 1 }}</span>
      </div>
      <div
        v-if="this.msg.style.signStyle == 4 && showPagination"
        class="my-pagination"
        :style="{ textAlign: msg.style.textAlign }"
      >
        <span class="type5">
          <span
            class="active4"
            :style="{
              color: msg.style.colorActive,
            }"
          >{{ pIndex }}</span>
          /
          <span
            :style="{
              color: msg.style.colorCur,
            }"
          >{{ list.length }}</span>
        </span>
      </div>
    </div>

    <span class="no">
      {{ delay }}{{ effect }} {{ showStyle }}{{ signStyle }} {{ switchstyle
      }}{{ num }}
    </span>
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
      // delay: 2000,
      // effect: "slide",
      swiper: null,
      showStyle: 1,
      signStyle: 1,
      bannerIndex: 0,
      pIndex: 0,
      switchstyle: "slide",
      first: true,
      isInit: true,
    };
  },
  created() {
    this.switchstyle = this.msg.style.switchstyle;
  },
  computed: {
    paddingLeft() {
      return this.msg.style.paddingLeft;
    },
    showStyle() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
      return this.msg.style.showStyle;
    },
    signStyle() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
      return this.msg.style.signStyle;
    },
    effect() {
      return this.msg.style.switchstyle;
    },
    delay() {
      return this.msg.style.delay;
    },
    list() {
      return this.msg.imgArr;
    },
    num() {
      return this.msg.imgArr.length;
    },
    showPagination() {
      if (this.msg.style.textAlign == "left") {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    effect(val) {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
        this.first = true;
        this.bannerIndex = 0;
      }
    },
    bannerIndex(a, b) {},
    delay() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
        this.first = true;
        this.bannerIndex = 0;
      }
    },
    paddingLeft() {
      if (this.swiper) {
        setTimeout(() => {
          this.swiper.destroy();
          this.initSwiper();
          this.bannerIndex = 0;
          this.first = true;
        }, 100);
      }
    },
    num() {
      setTimeout(() => {
        this.swiper.destroy();
        this.initSwiper();
        this.first = true;
        this.bannerIndex = 0;
      }, 100);
    },
    list: {
      handler(newVal) {
        if (this.swiper) {
          this.swiper.destroy();
          this.initSwiper();
          this.bannerIndex = 0;
          this.first = true;
        }
      },
      immediate: true,
      deep: true, // 表示开启深度监听
    },
  },
  methods: {
    initSwiper() {
      if (this.swiper) {
        this.swiper.destroy();
      }
      const me = this;
      const dom = this.$refs.images.getElementsByClassName(
        "swiper-container"
      )[0];
      setTimeout(() => {
        this.isInit = true;
        this.swiper = new Swiper(dom, {
          loop: true, // 循环模式选项
          effect: me.effect, //fade, slide
          autoplay: {
            delay: this.delay, //this.delay,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          cssMode: false,
          // 如果需要分页器
          // pagination: {
          //   el: ".swiper-pagination"
          // },
          preventClicksPropagation: false,
          preventClicks: false, //默认true
          allowTouchMove: false,
          // 如果需要前进后退按钮
          on: {
            slideChange: function () {
              me.bannerIndex = this.activeIndex;
              if (me.isInit) {
                me.bannerIndex = 0;
              } else {
                if (this.activeIndex == 1 || this.activeIndex == 2) {
                  me.bannerIndex = 1; //就是第二个
                } else {
                  if (this.activeIndex == me.list.length + 1) {
                    me.bannerIndex = 0;
                  } else {
                    me.bannerIndex = this.activeIndex - 1;
                  }
                }
              }
            },
          },
        });
        this.isInit = false;
      }, 50);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
};
</script>
<style lang="scss" scope>
.no {
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  opacity: 0;
}
.images {
  position: relative;
  width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .swiper-container {
    position: relative;
    width: 100%;
    height: 150px;
    div {
      text-align: center;
    }
    .swiper-pagination {
      box-sizing: border-box;
      padding: 0 10px;
    }
    .swiper-pagination-bullet-active {
      background-color: #52b54b;
    }
  }
  .my-pagination {
    position: absolute;
    bottom: 0;
    height: 20px;
    width: 100%;
    left: 0;
    z-index: $index1;
    box-sizing: border-box;
    padding: 0 20px;
    span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: burlywood;
      border-radius: 50%;
      margin-left: 7px;
    }
    .type2 {
      width: 12px;
      height: 4px;
      background: #e5e5e5;
      border-radius: 3px;
    }
    .type3 {
      width: 9px;
      height: 4px;
      background: #e5e5e5;
      border-radius: 3px;
    }
    .type4 {
      background: transparent;
    }
    .type5 {
      width: 40px;
      background: transparent;
      span {
        margin-left: 0px;
        background: transparent;
      }
    }
    span:nth-child(1) {
      margin-left: 0;
    }
    .active {
      background: blue;
    }
    .active3 {
      width: 18px;
      background: blue;
    }
    .active4 {
      color: burlywood;
    }
  }
  .item {
    position: relative;
    p {
      width: 100%;
      position: absolute;
      line-height: 30px;
      bottom: 0;
      box-sizing: border-box;
      padding: 0 10px;
      height: 30px;
      overflow: hidden;
      left: 0;
      text-align: left;
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
      width: 100%;
      height: 100%;
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
    .img.set{
      background-color: rgba($color: #8894a0, $alpha: 0)
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
