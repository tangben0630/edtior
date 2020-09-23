<template>
  <div class="input">
    <input
      type="text"
      :style="{
      width: style.width,
      height: style.height,
      background: style.background,
      textAlign: style.textAlign,
      border: style.border,
      borderRadius: style.borderRadius,
      paddingLeft: style.paddingLeft,
    }"
      :placeholder="style.placeholder"
      @keydown.stop.prevent="keydown($event)"
    />
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      style: {
        width: "270px",
        height: "32px",
        background: "#fff",
        textAlign: "left",
        border: "1px solid #eee",
        borderRadius: "3px",
        paddingLeft: "20px",
        placeholder: "请输入关键字"
      }
    };
  },
  methods: {
    keydown(e) {}
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.input {
  text-align: left;
}
</style>
