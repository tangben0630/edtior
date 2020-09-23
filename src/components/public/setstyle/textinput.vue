<template>
  <div class="text" :style="{ paddingLeft: item.paddingLeft }">
    <span class="name" v-if="item.title">{{ item.title }}：</span>
    <textarea
      :style="{ width: item.width, height: item.height }"
      :placeholder="item.placeholder"
      @input.stop.prevent="keyupFn($event)"
      :value="setData[this.item.attr]"
    ></textarea>
    <span class="limit" v-if="item.limit">{{ item.curLen }}/{{ item.max }}</span>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "textinput",
  data() {
    return {};
  },
  computed: {
    pageSetFlag() {
      return this.$store.state.pageList[this.$store.state.pageIndex].isPageSet;
    },
  },
  methods: {
    keyupFn(e) {
      let str = e.target.value;
      let len = str.length;
      if (this.item.max) {
        e.target.value = this.setData[this.item.attr] =
          len > this.item.max ? str.substring(0, this.item.max) : str;
        this.item.curLen = this.setData[this.item.attr].length;
        if (this.item.attr == "sharetitle") {
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].setting.share.title = e.target.value;
        }
        if (this.item.attr == "sharecontent") {
          this.$store.state.pageList[
            this.$store.state.pageIndex
          ].setting.share.context = e.target.value;
        }
      } else {
        this.setData[this.item.attr] = e.target.value;
      }
    },
  },
  mounted() {
    this.value = this.setData[this.item.attr];
  },
};
</script>
<style lang="scss" scoped>
.text {
  position: relative;
  padding-top: 5px;
  margin-bottom: 8px;
  background: white;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  padding-left: 42px;
  box-sizing: border-box;
  font-size: 12px;
  .name {
    font-size: 12px;
    position: absolute;
    top: 5px;
    left: 5px;
    color: $fontColor2;
  }
  textarea {
    width: 192px;
    height: 65px;
  }
  .limit {
    position: absolute;
    bottom: 2px;
    color: $fontColor4;
    right: 3px;
  }
}
</style>
