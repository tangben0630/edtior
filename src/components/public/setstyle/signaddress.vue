<template>
  <div class="fontsize">
    <div
      class="title"
      :style="{ width: item.width ? item.width + 'px' : '' }"
    >{{ item.title || "字体大小" }}</div>
    <div class="tool">
      <div class="item" v-for="(val, i) in item.sets" :key="i" @click.stop="sel(val.value)">
        <div class="box" :class="{ active: setData.style.location== val.value }"></div>
        {{ val.con }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "fontSize",
  data() {
    return {};
  },
  props: {
    setData: {
      type: Object,
    },
    item: {
      type: Object,
    },
  },
  methods: {
    sel(v) {
      const attr = this.item.attr;
      this.setData.style.location = v;
    },
    setContainer() {
      let len = this.setData.imgArr.length;
      let c_num = this.setData.style["column"];
      let r_num = this.setData.style["row"];
      let a = c_num * r_num;
      let t = Math.ceil(len / (c_num * r_num));
      this.setData.style["times"] = t;
    },
  },
};
</script>
<style lang="scss" scoped>
.fontsize {
  display: flex;
  color: $fontColor2;
  margin-bottom: 10px;
  padding-top: 5px;
  font-size: 12px;
  .title {
    width: 48px;
  }
  .tool {
    display: flex;
    flex: 1;
    padding-left: 15px;
    .item {
      flex: 1;
      padding-left: 19px;
      position: relative;
      cursor: pointer;
      .box {
        box-sizing: border-box;
        position: absolute;
        top: 2px;
        left: 0;
        width: 12px;
        height: 12px;
        border: 1px solid #ebebeb;
        border-radius: 50%;
      }
      .active {
        border: 4px solid $baseColor1;
        @include borderColor($baseColor1);
      }
    }
  }
}
</style>
