<template>
  <div class="style">
    <div class="title">{{ type }}</div>
    <div class="con" @click.stop.prevent="select">
      <i class="iconfont iconjiantou_liebiaozhankai-copy2"></i>
      {{ selVal }}
      <ul v-show="show">
        <li
          v-for="(item, i) in list"
          :key="i"
          @click.stop.prevent="selectVal(item)"
        >
          {{ item.val }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "switchstyle",
  data() {
    return {
      selVal: "左右滑动",
      list: [
        { val: "淡入淡出", con: "fade" },
        { val: "左右滑动", con: "slide" },
      ],
      show: false,
      type: "切换方式",
    };
  },
  created() {
    if (this.item.attr == "delay") {
      this.selVal = this.item.cur;
      this.type = "轮播速度";
      this.list = [
        { val: "1.5 秒", con: 1500 },
        { val: "2 秒", con: 2000 },
        { val: "2.5 秒", con: 2500 },
        { val: "3 秒", con: 3000 },
      ];
    } else {
      this.selVal = this.item.cur == "slide" ? "左右滑动" : "淡入淡出";
    }
  },
  methods: {
    select() {
      this.show = !this.show;
    },
    selectVal(v) {
      this.setData.style[this.item.attr] = v.con;
      this.selVal = v.val;
      this.show = false;
      this.item.cur = this.item.attr == "delay" ? v.val : v.con;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.style {
  height: 30px;
  padding: 0 5px;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  display: flex;
  line-height: 30px;
  .title {
    flex: 1;
    color: $fontColor2;
  }
  .con {
    user-select: none;
    .iconfont {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 2px;
      right: 0px;
      font-size: 22px;
      color: $fontColor3;
    }
    flex: 3;
    color: $fontColor1;
    padding-left: 20px;
    position: relative;
    ul {
      position: absolute;
      top: 31px;
      left: 0;
      z-index: 10;
      width: 100%;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 2px 10px 0px #e0d7d7;
      box-sizing: border-box;
      li {
        color: #333;
        padding-left: 20px;
        user-select: none;
        cursor: pointer;
        &:hover {
          background: #f8f8f8;
        }
      }
    }
  }
}
</style>
