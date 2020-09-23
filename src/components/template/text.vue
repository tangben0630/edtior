<template>
  <div
    class="title com-template"
    :id="comIndex"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow}"
    :style="{
      backgroundColor: msg.style.backgroundColor,
      color: msg.style.color,
      fontSize: msg.style.fontSize,
      textAlign: msg.style.textAlign,
      paddingLeft: msg.isShow ? msg.style.paddingLeft + 'px' : 0,
      paddingRight: msg.isShow ?msg.style.paddingLeft + 'px' : 0,
    }"
    @mousedown="comDown()"
  >
    {{ msg.content }}
    <a v-if="msg.isA"></a>
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
.title {
  box-sizing: border-box;
  position: relative;
  text-align: center;
  padding: 8px 15px;
  width: 320px;
  overflow: hidden;
}
.noheight {
  // transition: 0.3s;
  height: 0;
  border: 0;
  padding: 0;
  margin: 0;
}
</style>
