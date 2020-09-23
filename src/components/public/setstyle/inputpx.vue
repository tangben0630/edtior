<template>
  <div class="inputpx" :class="{ opacity: item.isDisabled }">
    <div class="left">{{ item.title }}</div>
    <input
      type="text"
      @keyup="keyup($event)"
      @blur="blur($event)"
      :disabled="item.isDisabled"
      :value="setData.style[this.item.attr]? parseInt(setData.style[this.item.attr]) : ''"
      placeholder="请输入纯数字"
    />
    <div class="right">{{ item.unit ? item.unit : "px" }}</div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import Common from "@assets/js/common";
export default {
  mixins: [mixins],
  name: "inputpx",
  data() {
    return {
      isSet: false,
      curValue: 10,
      time: 0,
    };
  },
  methods: {
    setAttr(e) {
      this.setData.style[this.item.attr] = this.curValue;
      this.item.cur = this.curValue;
      switch (this.setData.setTitle) {
        case "图片设置":
          e.target.value > 100 && (e.target.value = 100);
          const [obj] = this.setData.setStyleList
            .filter((item) => item.title == "展示风格")[0]
            .drop[0].sets.filter((item) => item.isActive == true);
          obj[this.item.attr] = this.curValue;
          this.setImgWidth();
          break;
        case "展区设置":
          break;
        case "轮播设置":
          break;
        default:
          break;
      }
    },
    keyup(e) {
      const time = new Date().getTime();
      if (time - this.time > 100) {
        e.target.value = Common.trimAll(e.target.value);
        if (!new RegExp("^[0-9]([0-9])*$").test(e.target.value.charAt(0))) {
          e.target.value = "";
          this.curValue = 0;
          this.item.cur = this.curValue;
        }
        if (e.target.value !== "") {
          //输入了xx
          if (!new RegExp("^[0-9]([0-9])*$").test(e.target.value)) {
            //不是纯数字
            e.target.value = e.target.value.substr(
              0,
              e.target.value.length - 1
            );
            this.curValue = parseInt(e.target.value);
          }
          // if (e.keyCode == 32) {
          e.target.value = parseInt(e.target.value);
          if (isNaN(e.target.value)) {
            e.target.value = "";
          } else {
            this.curValue = e.target.value;
          }
          // }
          // if (e.keyCode == 13) {
          //enter 键
          this.isSet = true;
          this.curValue = parseInt(e.target.value);
          this.setAttr(e);
          this.item.cur = this.curValue;

          // }
        } else {
          if (e.keyCode == 13) {
            //enter 键
            this.curValue = 0;
            this.isSet = true;
            this.setAttr(e);
            e.target.value = this.curValue;
            this.item.cur = this.curValue;
          } else {
            this.setAttr(e);
            e.target.value = "";
            this.item.cur = "";
            this.setData.style[this.item.attr] = "";
          }
        }
        this.time = time;
      }
    },
    setImgWidth() {
      this.setData.style.width =
        (320 -
          parseInt(this.setData.style.paddingLeft) * 2 -
          parseInt(this.setData.style.marginLeft) * (this.setData.domNum - 1)) /
        this.setData.domNum;
    },
    blur(e) {
      if (e.target.value === "") {
        this.setAttr(e);
        e.target.value = 0;
        this.item.cur = 0;
      }
    },
  },
  mounted() {
    this.curValue = this.item.cur;
  },
};
</script>
<style lang="scss" scoped>
.inputpx {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  color: #435862;
  font-size: 12px;
  position: relative;
  box-sizing: border-box;
  padding-left: 53px;
  .left {
    position: absolute;
    width: 53px;
    height: 100%;
    left: 0;
    text-align: right;
    font-size: 12px;
    user-select: none;
  }
  input {
    padding-left: 10px;
  }
  .right {
    position: absolute;
    right: 0;
    padding-right: 20px;
    top: 0;
  }
}
.opacity {
  opacity: 0.6;
}
</style>
