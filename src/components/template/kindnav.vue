<template>
  <div
    class="kindnav"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow }"
    :style="{ backgroundColor: msg.style.backgroundColor }"
    @mousedown="comDown($event)"
  >
    <div class="fix-wrap" ref="swiper">
      <div
        class="scroll-wrap"
        :re="wrapWidth"
        :style="{ width: wrapWidth, marginLeft: marginLeft }"
        @touchstart="touchstart"
        @touchmove="touchmove"
      >
        <div
          class="item"
          v-for="(item, i) in msg.imgArr"
          :key="i"
          :style="{ width: itemWidth, order: i }"
        >
          <div class="image" v-if="msg.isImage">
            <img
              :style="{ borderRadius: msg.style.borderRadius }"
              :src="item.src ? item.src : defaultSrc"
              alt=""
            />
          </div>
          <p class="tag" :class="{mtop: msg.isImage}" v-if="msg.isText">{{ item.title }}</p>
        </div>
      </div>
      <div class="menu-btn-list">
        <span
          class="bullet"
          :class="{ active: i == curIndex }"
          v-if="msg.style.times > 1"
          v-for="(item, i) in msg.style.times"
          @click="setLeft(i)"
          :key="i"
        ></span>
      </div>
    </div>
    <!-- <div class="fix-wrap swiper-container" ref="swiper">
      <div class="scroll-wrap swiper-wrapper" :re="wrapWidth">
        <div class="item swiper-slide" v-for="(item, i) in msg.imgArr">
          <a class="href">
            <div class="image" v-if="msg.isImage" >
              <img :style="{borderRadius: msg.style.borderRadius}" src="//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/default.jpg" alt="">
            </div>
            <p class="tag" v-if="msg.isText">{{item.title}}</p>
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
export default {
  name: "kindnav",
  mixins: [mixins],
  data() {
    return {
      defaultSrc:
        "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/default.jpg",
      width: "",
      mySwiper: "",
      marginLeft: 0,
      curIndex: 0,
      startX: "",
      startY: "",
    };
  },
  computed: {
    itemWidth() {
      let w = (1 / this.msg.style.column).toFixed(2);
      let t = this.msg.style.times;
      this.marginLeft = 0;
      this.curIndex = 0;
      return (w / t) * 100 + "%";
    },
    wrapWidth() {
      let t = this.msg.style["times"];
      this.marginLeft = 0;
      this.curIndex = 0;
      return t * 100 + "%";
    },
  },
  methods: {
    // 点击下方分页器 设置margin-left
    setLeft(i) {
      this.marginLeft = -100 * i + "%";
      this.curIndex = i;
    },
    initSwiper() {
      let c = this.msg.style.column;
      let r = this.msg.style.row;
      var mySwiper = new Swiper(".swiper-container", {
        allowTouchMove: false,
        slidesPerView: c,
        slidesPerColumn: r,
        slidesPerColumnFill: "column",
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    },
    //触发按下事件
    touchstart() {
      event.preventDefault(); //阻止默认事件（长按的时候出现复制）

      this.startX = event.changedTouches[0].pageX;
      this.startY = event.changedTouches[0].pageY;
    },
    touchmove() {
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      event.preventDefault();
      var moveEndX = event.changedTouches[0].pageX;
      var moveEndY = event.changedTouches[0].pageY;
      var X = moveEndX - this.startX; // X的结果如果正数，则说明手指是从左往右划动, 负数，则说明手指是从右往左划动
      var Y = moveEndY - this.startY;
      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        alert("left 2 right");
      } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        alert("right 2 left");
      } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        alert("top 2 bottom");
      } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        alert("bottom 2 top");
      } else {
        alert("just touch");
      }
    },
  },
  mounted() {
    this.width = this.$refs.swiper.offsetWidth;
  },
};
</script>
<style lang="scss" scoped>
.kindnav {
  .fix-wrap {
    width: 100%;
    overflow: hidden;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }
  .scroll-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 5px 0;
    .item {
      width: 20%;
      margin: 5px 0;
      text-align: center;
      a {
        display: inline-block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        color: #333;
      }
      .image {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tag {
        line-height: 1;
      }
      .tag.mtop{
        margin-top: 5px;
      }
    }
  }
  .menu-btn-list {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: 0.3 opacity;
    text-align: center;
    z-index: 10;
    .bullet {
      display: inline-block;
      width: 8px;
      height: 4px;
      margin: 0px 2px;
      background: rgb(229, 229, 229);
      border-radius: 5px;
      cursor: pointer;
    }
    .active {
      width: 12px;
      background: rgb(253, 215, 19);
    }
  }
}
</style>
