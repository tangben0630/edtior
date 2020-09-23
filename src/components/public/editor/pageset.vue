<template>
  <div class="set" :style="{top:childtop+'px'}">
    <div
      class="item"
      v-for="(item, i) in list"
      :key="i"
      :class="{ active: item.isActive }"
      @mouseenter.stop="enter(i)"
      @click.stop="click(i)"
    >
      <i class="iconfont" :class="item.icon"></i>
      {{ item.val }}
    </div>
  </div>
</template>
<script>
export default {
  name: "pageset",
  data() {
    return {
      list: [
        { icon: "iconquanjushezhi", val: "页面设置", isActive: false },
        { icon: "iconfuzhi", val: "复制", isActive: false },
        { icon: "iconshanchu", val: "删除", isActive: false },
        { icon: "iconzhongmingming", val: "重命名", isActive: false },
        { icon: "iconziyuan1", val: "设为首页", isActive: false },
        // { icon: "iconmoban2", val: "存为模板", isActive: false }
      ],
    };
  },
  props: {
    childtop: Number,
  },
  methods: {
    enter(i) {
      this.list.forEach((item) => {
        item.isActive = false;
      });
      this.list[i].isActive = true;
    },
    leave() {
      this.$emit("leave");
    },
    click(i) {
      this.$emit("itemClick", i);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.set {
  position: fixed;
  width: 120px;
  right: -120px;
  top: 140px;
  left: 165px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0px #ddd;
  padding: 4px 0px;
  z-index: $index4;
  &::after {
    content: "";
    position: absolute;
    width: 0px;
    top: 7px;
    left: -10px;
    border-width: 5px;
    border-style: solid;
    border-bottom-width: 4px;
    border-color: transparent #fff transparent transparent;
  }
  .item {
    line-height: 30px;
    padding-left: 38px;
    position: relative;
    font-size: 12px;
    color: $fontColor2;
    text-align: left;
    cursor: pointer;
    i {
      position: absolute;
      font-size: 20px;
      top: -1px;
      left: 14px;
    }
    .iconzhongmingming {
      font-size: 16px;
      left: 17px;
    }
    .iconziyuan1 {
      font-size: 14px;
      left: 17px;
    }
    .iconmoban2 {
      font-size: 14px;
      left: 18px;
    }
  }
  .active {
    @include bacColor($baseColor1);
  }
}
</style>
