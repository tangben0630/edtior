<template>
  <div class="skin">
    <div class="c" @click.stop="change('theme3')">默认</div>
    <div class="a" @click.stop="change('theme1')">蓝色</div>
    <div class="b" @click.stop="change('theme2')">黄色</div>
    <div class="d" @click.stop="change('theme4')">紫色</div>
  </div>
</template>
<script>
export default {
  name: "skin",
  data() {
    return {};
  },
  methods: {
    change(str) {
      window.document.documentElement.setAttribute("theme", str);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.skin {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  @include border(#f5f5f5);
  div {
    width: 40px;
    height: 40px;
    float: left;
    margin: 10px;
  }
  .a {
    background: $baseColor1;
  }
  .b {
    background: $baseColor2;
  }
  .c {
    background: $baseColor3;
  }
  .d {
    background: $baseColor4;
  }
}
</style>
