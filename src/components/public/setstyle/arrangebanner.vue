<template>
  <div class="arrange" ref="arrange">
    <div
      class="item"
      v-for="(item, i) in sets"
      :key="item.con"
      :class="{ border: item.isActive, noclick: i > 0 }"
      @click="click(i)"
    >
      <div :class="'item' + i"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "arrangestyle",
  data() {
    return {
      disabledObj: {},
    };
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
    click(i) {
      this.sets.forEach((el) => {
        el.isActive = false;
      });
      this.sets[i].isActive = true;
    },
    navStyle(i) {
      this.setData.isImage = this.sets[i].isImage;
      this.setData.isText = this.sets[i].isText;
    },
    navShape(i) {
      this.setData.style["borderRadius"] = this.sets[i].radius;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.arrange {
  box-sizing: border-box;
  display: flex;
  .item {
    flex: 1;
    width: 38px;
    height: 52px;
    margin-left: 10px;
    font-size: 12px;
    color: $fontColor3;
    text-align: center;
    user-select: none;
    position: relative;
    cursor: pointer;

    @include border(#e5e5e5);
    div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .item0 {
      background-image: url("../../../assets/image/right/banner-1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .item1 {
      background-image: url("../../../assets/image/right/banner-2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .item2 {
      background-image: url("../../../assets/image/right/banner-3.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .item3 {
      background-image: url("../../../assets/image/right/banner-4.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    span {
      position: absolute;
      bottom: 2px;
      left: 2px;
    }
    &:nth-child(1) {
      margin: 0;
    }
  }
  .noclick {
    pointer-events: none;
    opacity: 0.2;
  }
  .border {
    @include borderColor($baseColor1);
  }
}
</style>
