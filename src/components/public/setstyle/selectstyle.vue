<template>
  <div class="container">
    <div class="arrange" ref="arrange" v-if="attr != 'navshape'">
      <div
        v-for="(item, i) in sets"
        :key="i"
        :style="{ width: item.width, height: item.height}"
        :class="{ active: item.isActive, disabled: !item.src }"
        @click="click(i)"
      >
        <img v-if="item.src" :src="item.src" />
        <span v-if="item.con">{{ item.con }}</span>
      </div>
    </div>
    <div class="container" v-if="attr == 'navshape'">
      <div class="arrange" ref="arrange" v-if="setData.isImage && setData.isText">
        <div
          v-for="(item, x) in sets[0].items"
          :key="x"
          :style="{ width: item.width, height: item.height}"
          :class="{ active: item.isActive, disabled: item.isDisabled }"
          @click="click(x, 0)"
        >
          <img v-if="item.src" :src="item.src" />
          <span v-if="item.con">{{ item.con }}</span>
        </div>
      </div>
      <div class="arrange" ref="arrange" v-if="setData.isImage && !setData.isText">
        <div
          v-for="(item, x) in sets[1].items"
          :key="x"
          :style="{ width: item.width, height: item.height}"
          :class="{ active: item.isActive, disabled: item.isDisabled }"
          @click="click(x, 1)"
        >
          <img v-if="item.src" :src="item.src" />
          <span v-if="item.con">{{ item.con }}</span>
        </div>
      </div>
      <div class="arrange" ref="arrange" v-if="!setData.isImage && setData.isText">
        <div
          v-for="(item, x) in sets[2].items"
          :key="x"
          :style="{ width: item.width, height: item.height}"
          :class="{ active: item.isActive, disabled: item.isDisabled }"
          @click="click(x, 2)"
        >
          <img v-if="item.src" :src="item.src" />
          <span v-if="item.con">{{ item.con }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "selectstyle",
  data() {
    return {};
  },
  props: {
    sets: {
      type: Array,
    },
    setData: {
      type: Object,
    },
    attr: {
      type: String,
    },
  },
  methods: {
    click(i, n) {
      let type = this.attr;
      switch (type) {
        case "navstyle":
          this.navStyle(i);
          this.sets.forEach((el) => {
            el.isActive = false;
          });
          this.sets[i].isActive = true;
          break;
        case "navshape":
          this.navShape(i, n);
          this.sets[n].items.forEach((el) => {
            el.isActive = false;
          });
          this.sets[n].items[i].isActive = true;
          break;
        case "headerstyle":
          this.headerStyle(i);
          this.sets.forEach((el) => {
            el.isActive = false;
          });
          this.sets[i].isActive = true;
          break;
      }
      this.sets.forEach((el) => {
        el.isActive = false;
      });
      this.sets[i].isActive = true;
    },
    navStyle(i) {
      this.setData.isImage = this.sets[i].isImage;
      this.setData.isText = this.sets[i].isText;
    },
    navShape(i, n) {
      let attr = this.sets[n].items[i].attr;
      this.setData.style[attr] = this.sets[n].items[i].radius;
    },
    headerStyle(i) {
      this.setData.number = this.sets[i].number;
    },
  },
  mounted() {
    this.setData.style.paddingLeft = 10;
  },
};
</script>
<style lang="scss" scoped>
.arrange {
  box-sizing: border-box;
  display: flex;
  div {
    flex: 1;
    width: 52px;
    height: 52px;
    margin-left: 10px;
    font-size: 12px;
    color: $fontColor3;
    text-align: center;
    cursor: pointer;
    @include border(#e5e5e5);
    &:nth-child(1) {
      margin: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .active {
    @include borderColor($baseColor1);
  }
  .disabled {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
