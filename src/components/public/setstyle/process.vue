<template>
  <div class="pro">
    <div class="left">不透明度</div>
    <div class="mid">
      <div class="click" @click.stop="proClick($event)"></div>
      <div class="mid-child">
        <div class="box" :style="{ width: `${process}%` }"></div>
        <div class="ball" @mousedown.stop="ballDown($event)" :style="{ left: `${process}%` }"></div>
      </div>
    </div>
    <div class="right">
      <input
        type="text"
        :value="process"
        @blur="blurFn($event)"
        @keyup="keyupFn($event)"
        @keyup.up="keyboupFn($event)"
      />
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "process",
  data() {
    return {
      process: "20",
      copy: "20"
    };
  },
  methods: {
    ballDown(e) {
      const startX = e.clientX;
      const nowWidth = (parseInt(this.process) / 100) * 110;
      const me = this;
      document.onmousemove = function(e) {
        let moveX = e.clientX - startX;
        let nowPro = ((nowWidth + parseInt(moveX)) / 110) * 100;
        nowPro < 0 && (nowPro = 0);
        nowPro > 100 && (nowPro = 100);
        me.process = parseInt(nowPro);
        me.copy = me.process;
      };
      document.onmouseup = function(e) {
        document.onmousemove = null;
      };
    },
    keyupFn(e) {
      if (e.target.value === "0") {
        this.process = 0;
        this.copy = 0;
      } else {
        if (!new RegExp("^[1-9]([0-9])*$").test(e.target.value)) {
          e.target.value = "";
        }
        if (e.target.value !== "") {
          this.process = parseInt(e.target.value);
          this.copy = this.process;
        }
      }
    },
    blurFn(e) {
      if (e.target.value === "") {
        this.process = this.copy;
        e.target.value = this.copy;
      }
    },
    proClick(e) {
      let { clientX } = e;
      let left = this.getElementLeft(e.target);
      let pro = clientX - left;
      this.process = parseInt((pro * 100) / 120);
      this.copy = this.process;
    },
    //获取dom距离窗口的 left
    getElementLeft(element) {
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    }
  },
  mounted() {
    this.copy = this.process;
  }
};
</script>
<style lang="scss" scoped>
.pro {
  overflow: hidden;
  background: #fff;
  div {
    float: left;
    margin-right: 10px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: $fontColor3;
  }
  .mid-child {
    position: absolute;
    width: 110px;
    height: 100%;
    left: 0;
    top: 0;
  }
  .left {
    width: 48px;
    user-select: none;
  }
  .mid {
    width: 120px;
    height: 4px;
    background: #f1f1f1;
    margin-top: 10px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    .box {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 4px;
      border-radius: 4px;
      @include darkColor($darkColor1);
    }
    .click {
      position: absolute;
      width: 100%;
      height: 10px;
      left: 0;
      top: 0;
      z-index: 1;
      background: transparent;
    }
    .ball {
      position: absolute;
      right: 0;
      top: -3px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: #d8d8d8;
      z-index: 2;
      margin: 0;
    }
  }
  .right {
    width: 50px;
    height: 22px;
    margin-right: 0;
    color: $fontColor1;
    position: relative;
    border-radius: 2px;
    box-sizing: border-box;
    padding-right: 18px;
    padding-left: 10px;
    border: 1px solid #e5e5e5;
    &::after {
      position: absolute;
      right: 5px;
      top: -2px;
      content: "%";
    }
    input {
      display: block;
      width: 100%;
      text-align: center;
      height: 20px;
      line-height: 14px;
    }
  }
}
</style>
