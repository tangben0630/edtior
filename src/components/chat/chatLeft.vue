<template>
  <div class="chat-left">
    <vue-scroll :ops="ops">
      <ul>
        <li
          v-for="(item, i) in this.$store.state.leftChattingList"
          :key="i"
          :class="{ active: $store.state.nowChatId == item.id }"
          @click="select(item)"
        >
          <div class="pic"></div>
          <div class="con">
            <h1>{{ item.name }}</h1>
            <p>{{ item.con }}</p>
          </div>
        </li>
      </ul>
    </vue-scroll>
  </div>
</template>
<script>
export default {
  name: "chatLeft",
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
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "3px",
          disable: false, //是否禁用滚动条
        },
      },
    };
  },
  methods: {
    select(item) {
      this.$store.state.nowChatId = item.id;
      this.$store.state.nowChatList = [];
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.chat-left {
  height: 598px;
}
li {
  display: flex;
  flex-direction: row;
  padding: 8px;
  font-size: 14px;
  height: 40px;
  cursor: pointer;
  .pic {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background: #f2f3f5;
  }
  .con {
    max-width: 400px;
    box-sizing: border-box;
    word-break: break-all;
    border-radius: 4px;
    padding: 0px 10px;
    position: relative;
    min-height: 34px;
    font-size: 14px;
    p {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
    }
  }
  img {
    display: block;
    border: 0;
  }
}
.active {
  background: #ddd;
}
</style>
