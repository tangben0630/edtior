<template>
  <div class="mid-list" id="midlist">
    <vue-scroll :ops="ops">
      <li
        class="my"
        :class="{ other: !item.ismy }"
        v-for="(item, i) in this.$store.state.nowChatList"
        :key="i"
      >
        <div class="pic"></div>
        <div class="con" v-if="item.type == 'mes'">{{ item.con }}</div>
        <div class="con" v-if="item.type == 'img'">
          <div class="aaa" v-show="item.preImg">
            <Loading />
          </div>
          <img :src="item.src" :style="{ width: item.width, height: item.height }" alt />
        </div>
        <div class="con" v-if="item.type == 'video'">
          <div class="aaa" v-show="item.preImg">
            <Loading />
          </div>
          <video
            @click="play($event)"
            :src="item.src"
            :style="{ width: item.width, height: item.height }"
            alt
          />
        </div>
      </li>
    </vue-scroll>
  </div>
</template>
<script>
import Loading from "@public/global/loading";
export default {
  name: "component_name",
  components: {
    Loading
  },
  data() {
    return {
      ops: {
        scrollPanel: {
          initialScrollY: false, //只要组件mounted之后自动滚动的距离。 例如 100 or 10%
          initialScrollX: false,
          scrollingX: false, //是否启用 x 或者 y 方向上的滚动
          scrollingY: true,
          speed: 300, //多长时间内完成一次滚动。 数值越小滚动的速度越快
          easing: undefined, //滚动动画 参数通animation
          verticalNativeBarPos: "right" //原生滚动条的位置
        },
        rail: {
          background: "#01a99a",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "-1px",
          keepShow: false
        },
        bar: {
          showDelay: 300, //在鼠标离开容器后多长时间隐藏滚动条
          onlyShowBarOnScroll: false, //当页面滚动时显示
          keepShow: false, //是否一直显示
          background: "#c3c3c3",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "5px",
          disable: false //是否禁用滚动条
        }
      },
      isPlay: false
    };
  },
  methods: {
    play(e) {
      const video = e.target;
      if (this.isPlay) {
        video.pause();
        this.isPlay = false;
      } else {
        this.isPlay = true;
        video.play();
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.aaa {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  border-radius: 4px;
  background: #000;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mid-list {
  width: 100%;
  padding-left: 5px;
}
li {
  // line-height: 200px;
  display: flex;
  flex-direction: row;
  padding: 5px;
  .pic {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background: #f2f3f5;
    margin-right: 10px;
  }
  .con {
    max-width: 400px;
    box-sizing: border-box;
    word-break: break-all;
    background: #f2f3f5;
    border-radius: 4px;
    padding: 7px 14px;
    position: relative;
    min-height: 34px;
    font-size: 14px;
    line-height: 22px;
  }
  img {
    display: block;
    border: 0;
  }
}
.other {
  flex-direction: row-reverse;
  .pic {
    margin-left: 10px;
  }
}
</style>
