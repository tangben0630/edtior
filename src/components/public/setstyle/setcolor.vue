<template>
  <div class="setcolor" v-if="isShowColor">
    <div class="title">{{ item.title }}</div>
    <div class="tool">
      <div class="show show-color-pick">
        <div
          class="child"
          :style="{ background: setData.style[this.item.attr] }"
          @click.stop="showColorPicker"
        ></div>
      </div>
      <div class="select">
        <div class="item" v-for="(val, i) in item.sets" :key="i" @click="itemClick(val)">
          <div :style="{ background: val }"></div>
        </div>
        <div class="item" @click="resetColor()">
          <i class="iconzhongzhi iconfont"></i>
        </div>
      </div>
    </div>
    <colorPicker
      class="color-picker-select"
      @updateValue="setColor"
      :curColor="setData.style[this.item.attr]"
      v-if="
        colorShow && this.$store.state.colorPickers[this.isCanShowId].isCanShow
      "
    ></colorPicker>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import colorPicker from "@public/setstyle/colorpick";

export default {
  mixins: [mixins],
  name: "setColor",
  components: {
    colorPicker,
  },
  props: {
    currentIndex: {
      type: String,
    },
  },
  created() {
    this.$store.state.colorPickers.push({
      id: this.$store.state.colorPickersId,
      isCanShow: true,
    });
    this.isCanShowId = this.$store.state.colorPickersId;
    this.$store.state.colorPickersId++;
  },
  data() {
    return {
      curColor: "blue",
      nowColor: "blue",
      pageColor: "rgba(255, 255, 255, 0)",
      sendColor: "blue",
      colorShow: false,
      title: "文本颜色",
      one: "#f90220",
      two: "#6236FF",
      three: "#0091FF",
      four: "#FDD713",
    };
  },
  computed: {
    pageSetFlag() {
      return this.$store.state.pageList[this.$store.state.pageIndex].isPageSet;
    },
    isShowColor() {
      let flag = true;
      if (this.setData.setTitle == "全局导航") {
        flag = this.setData.isText;
      }
      return flag;
    },
  },
  methods: {
    showColorPicker() {
      this.colorShow = true;
      this.$store.state.colorPickers.forEach((item) => {
        item.isCanShow = false;
      });
      this.$store.state.colorPickers[this.isCanShowId].isCanShow = true;
      document.onclick = (e) => {
        if (
          e.target.className == "vc-saturation--black" ||
          e.target.className == "vc-sketch-active-color" ||
          e.target.className == "vc-hue-container" ||
          e.target.className == "vc-input__label" ||
          e.target.className == "vc-alpha-container" ||
          e.target.className == "vc-hue-picker" ||
          e.target.className == "vc-sketch-active-color" ||
          e.target.className == "vc-input__input" ||
          e.target.className == "vc-sketch-presets" ||
          e.target.className == "vc-sketch-presets-color" ||
          e.target.className == "vc-checkerboard" ||
          e.target.className == "vc-sketch-sliders" ||
          e.target.className == "vc-saturation" ||
          e.target.className == "vc-sketch-controls" ||
          e.target.className == "vc-sketch-field" ||
          e.target.className == "vc-sketch-field--single" ||
          e.target.className == "vc-hue-pointer" ||
          e.target.className == "vc-hue vc-hue--horizontal" ||
          e.target.className == "vc-alpha-gradient" ||
          e.target.className == "vc-alpha-pointer" ||
          e.target.className == "vc-editable-input" ||
          e.target.className == "vc-sketch"
        ) {
        } else {
          this.colorShow = false;
          document.onclick = null;
        }
      };
    },
    setColor(val) {
      const rgba = val.rgba;
      if (this.pageSetFlag) {
        this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
          "backgroundColor"
        ] = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      }
      this.nowColor = this.setData.style[
        this.item.attr
      ] = this.$store.state.globalNavData.setData.style[
        this.item.attr
      ] = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    },
    resetColor() {
      if (this.pageSetFlag) {
        let color = this.$store.state.pageList[this.$store.state.pageIndex]
          .setting.default.backgroundColor;
        this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
          "backgroundColor"
        ] = color;
        this.nowColor = this.setData.style[this.item.attr] = color;
      } else {
        let color = this.setData.default[this.item.attr];
        this.nowColor = this.setData.style[
          this.item.attr
        ] = this.$store.state.globalNavData.setData.style[
          this.item.attr
        ] = color;
      }
    },
    itemClick(v) {
      if (this.pageSetFlag) {
        this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
          "backgroundColor"
        ] = v;
      }
      this.nowColor = this.setData.style[
        this.item.attr
      ] = this.$store.state.globalNavData.setData.style[this.item.attr] = v;
      console.log(this.item.attr);
    },
  },
  mounted() {
    this.nowColor = this.setData.style[this.item.attr];
  },
};
</script>
<style lang="scss" scoped>
.setcolor {
  display: flex;
  color: $fontColor2;
  font-size: 12px;
  margin-bottom: 5px;
  padding-top: 5px;
  position: relative;
  line-height: 24px;
  .title {
    width: 48px;
  }
  .tool {
    flex: 1;
    display: flex;
    padding-left: 15px;

    .show {
      box-sizing: border-box;
      width: 50px;
      height: 24px;
      padding: 3px;
      background: white;
      border-radius: 2px;
      border: 1px solid #e5e5e5;
      position: relative;
    }
    .child {
      position: absolute;
      width: 42px;
      height: 16px;
      top: 3px;
      left: 3px;
      z-index: 1;
      border-radius: 2px;
    }
    .select {
      display: flex;
      flex: 1;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .item {
      flex: 1;
      position: relative;
      cursor: pointer;
      div {
        box-sizing: border-box;
        width: 15px;
        height: 15px;
        border-radius: 2px;
        border: 1px solid #e5e5e5;
        margin-top: 5px;
      }
      i {
        color: $fontColor3;
      }
    }
  }
}
</style>
