<template>
  <div class="setcolor">
    <div class="title" :style="{ width: item.width ? item.width + 'px' : '' }">{{ item.title }}</div>
    <div class="tool">
      <div class="show" @click.stop.prevent="select">
        <i class="iconfont iconjiantou_liebiaozhankai-copy2"></i>
        <div class="con" v-if="index == 0">
          <div></div>
          <div class="active"></div>
          <div></div>
        </div>
        <div class="con type2" v-if="index == 1">
          <div></div>
          <div class="active"></div>
          <div></div>
        </div>
        <div class="con type3" v-if="index == 2">
          <div></div>
          <div class="active"></div>
          <div></div>
        </div>
        <div class="con type4" v-if="index == 3">
          <div>1</div>
          <div class="active">2</div>
          <div>3</div>
        </div>
        <div class="con type5" v-if="index == 4">
          <div class="active">1</div>

          <div>/ 3</div>
        </div>
        <ul v-show="show">
          <li @click.stop="sel(0)">
            <span class="li-span1"></span>
            <span class="li-span1 active"></span>
            <span class="li-span1"></span>
          </li>
          <li @click.stop="sel(1)">
            <span class="li-span2"></span>
            <span class="li-span2 active"></span>
            <span class="li-span2"></span>
          </li>
          <li @click.stop="sel(2)">
            <span class="li-span2 short"></span>
            <span class="li-span2 active long"></span>
            <span class="li-span2 short"></span>
          </li>
          <li @click.stop="sel(3)">
            <span class="li-span3">1</span>
            <span class="li-span3 color">2</span>
            <span class="li-span3">3</span>
          </li>
          <li @click.stop="sel(4)">
            <span class="li-span3">
              <span class="color">1</span> /
              <span>3</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="select">
        <div class="item" @click.stop="showColorPicker(0)">
          <div :style="{ background: colorActive }"></div>
        </div>
        <div class="item" @click.stop="showColorPicker(1)">
          <div class="active" :style="{ background: colorCur }"></div>
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
  created() {
    this.$store.state.colorPickers.push({
      id: this.$store.state.colorPickersId,
      isCanShow: true,
    });
    this.isCanShowId = this.$store.state.colorPickersId;
    this.$store.state.colorPickersId++;
    this.colorActive = this.setData.style.colorActive;
    this.curActive = this.setData.style.colorActive;
    this.colorCur = this.setData.style.colorCur;
    this.curColor = this.setData.style.colorCur;
    this.index = this.setData.style.signStyle;
    this.curIndex = this.setData.style.signStyle;
  },
  data() {
    return {
      nowColor: "blue",
      pageColor: "rgba(255, 255, 255, 0)",
      sendColor: "blue",
      colorShow: false,
      title: "文本颜色",
      one: "#f90220",
      two: "#6236FF",
      three: "#0091FF",
      four: "#FDD713",
      show: false,
      colorActive: "#fdd713",
      curActive: "#fdd713",
      colorCur: "#e5e5e5",
      curColor: "#e5e5e5",
      who: true,
      index: 0,
      curIndex: 0,
    };
  },
  computed: {
    pageSetFlag() {
      return this.$store.state.pageList[this.$store.state.pageIndex].isPageSet;
    },
  },
  methods: {
    showColorPicker(v) {
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
      this.who = v ? false : true;
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
      if (this.who) {
        this.setData.style.colorActive = this.colorActive = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      } else {
        this.setData.style.colorCur = this.colorCur = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      }
    },
    resetColor() {
      this.index = this.setData.style.signStyle = this.curIndex;
      this.colorCur = this.setData.style.colorCur = this.curColor;
      this.colorActive = this.setData.style.colorActive = this.curActive;
    },
    itemClick(v) {
      if (this.pageSetFlag) {
        this.$store.state.pageList[this.$store.state.pageIndex].setting.style[
          "backgroundColor"
        ] = v;
      }
      this.nowColor = this.setData.style[this.item.attr] = v;
    },
    select() {
      this.show = !this.show;
    },
    sel(i) {
      this.index = i;
      this.show = false;
      this.setData.style.signStyle = i;
    },
  },
  mounted() {},
  components: {
    colorPicker,
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
      width: 80px;
      height: 24px;
      padding: 3px;
      background: white;
      border-radius: 2px;
      border: 1px solid #e5e5e5;
      position: relative;
      .con {
        width: 80px;
        height: 24px;
        display: flex;
        div {
          margin-left: 7px;
          margin-top: 4px;
          background: #e5e5e5;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .li-span1 {
          width: 8px;
          height: 8px;
        }
        .active {
          @include bacColor($baseColor1);
          width: 8px;
          height: 8px;
        }
      }
      .type2 {
        margin-top: 2px;
        div {
          width: 12px;
          height: 4px;
          border-radius: 3px;
        }
        .active {
          width: 12px;
          height: 4px;
        }
      }
      .type3 {
        margin-top: 2px;
        div {
          width: 9px;
          height: 4px;
          border-radius: 3px;
        }
        .active {
          width: 18px;
          height: 4px;
        }
      }
      .type4 {
        line-height: 10px;
        div {
          width: 9px;
          height: 4px;
          border-radius: 3px;
          background: transparent;
        }
        .active {
          background: transparent;
          color: $baseColor1;
        }
      }
      .type5 {
        line-height: 10px;
        div {
          width: 20px;
          height: 4px;
          border-radius: 3px;
          background: transparent;
          margin-left: 4px;
        }
        .active {
          background: transparent;
          color: $baseColor1;
          margin-left: 7px;
        }
      }
      i {
        position: absolute;
        font-size: 20px;
        color: #999;
        top: 0;
        right: -1px;
      }

      ul {
        position: absolute;
        top: 23px;
        left: 0;
        z-index: 1;
        width: 100%;
        border-radius: 5px;
        background: #fff;
        box-shadow: 0px 2px 10px 0px #e0d7d7;
        box-sizing: border-box;
        li {
          color: #333;
          padding-left: 10px;
          user-select: none;
          line-height: 24px;
          cursor: pointer;
          &:hover {
            background: #f8f8f8;
          }
          .li-span1 {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #e5e5e5;
            border-radius: 50%;
            margin-right: 4px;
          }
          .li-span2 {
            display: inline-block;
            width: 12px;
            height: 4px;
            background: #e5e5e5;
            border-radius: 3px;
            margin-right: 4px;
            margin-top: -2px;
          }
          .long {
            width: 18px;
          }
          .short {
            width: 9px;
          }
          .li-span3 {
            margin-right: 6px;
          }
          .active {
            @include bacColor($baseColor1);
          }
          .color {
            color: $baseColor1;
          }
        }
      }
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
        width: 20px;
        height: 20px;
        background: #e5e5e5;
        border-radius: 3px;
        // border: 1px solid #e5e5e5;
        margin-top: 2px;
      }
      i {
        color: $fontColor3;
      }
    }
  }
  .active {
    @include bacColor($baseColor1);
  }
}
</style>
