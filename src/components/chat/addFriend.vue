<template>
  <div
    class="add"
    :style="{ left: left + 180 + 'px', top: top + 70 + 'px' }"
    @click="changezIndex(0)"
  >
    <div class="top" @mousedown.stop.prevent="down($event)">
      查找好友
      <i class="iconfont iconguanbi-copy" @click="close"></i>
    </div>
    <div class="body">
      <div class="search">
        <input type="text" placeholder="请输入手机号" />
        <textarea name id cols="30" rows="10" placeholder="附言"></textarea>
        <button>查找</button>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/chatMixin";
export default {
  name: "addFriend",
  mixins: [mixins],
  data() {
    return {
      left: 0,
      top: 0
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.add {
  position: fixed;
  left: 0;
  top: 0;
  width: 600px;
  height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  z-index: $index5;
  background: #fff;
  .top {
    padding: 0 20px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 2px 2px 0 0;
    position: relative;
    cursor: move;
    text-align: center;
    i {
      position: absolute;
      top: 0px;
      right: 20px;
      cursor: pointer;
    }
  }
  .body {
    display: flex;
    box-sizing: border-box;
    padding: 60px;
    input {
      width: 260px;
      height: 35px;
      padding-left: 10px;
      border-radius: 3px;
      border: 1px solid #eee;
      margin-left: 118px;
      display: block;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    textarea {
      box-sizing: border-box;
      width: 260px;
      height: 100px;
      border-radius: 3px;
      border: 1px solid #eee;
      margin-left: 118px;
      display: block;
      padding: 10px;
      margin-bottom: 60px;
    }
    button {
      width: 80px;
      height: 35px;
      background: cadetblue;
      outline: medium;
      border: 0;
      cursor: pointer;
      margin-left: 203px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
