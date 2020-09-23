<template>
  <div
    class="line com-template"
    :id="comIndex"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow}"
    :style="{
      backgroundColor: msg.style.backgroundColor,
      paddingLeft: msg.isShow ? msg.style.paddingLeft + 'px' : 0,
      paddingRight: msg.isShow ? msg.style.paddingLeft + 'px' : 0,
      paddingTop: msg.isShow ? msg.style.paddingTop + 'px' : 0,
      paddingBottom: msg.isShow ? msg.style.paddingTop + 'px' : 0,
    }"
    @mousedown="comDown()"
  >
    <div
      :style="{borderTopColor:  msg.style.color, borderTopStyle: msg.style.solid, borderTopWidth: '1px'}"
    ></div>
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
export default {
  mixins: [mixins],
  name: "text-com",
  data() {
    return {
      spanShow: false,
      crashList: [],
      idCanAdd: false,
      oldTemplateList: [],
    };
  },

  created() {},
  methods: {},
  mounted() {},
  components: {
    // Tool,
  },
};
</script>
<style lang="scss" scoped>
.line {
  box-sizing: border-box;
  position: relative;
  text-align: center;
  width: 320px;
  overflow: hidden;
  div {
    border-top-width: 1px;
    height: 0;
  }
}
.noheight {
  // transition: 0.3s;
  height: 0;
  border: 0;
  padding: 0;
  margin: 0;
}
</style>
