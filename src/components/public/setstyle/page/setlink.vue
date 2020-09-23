<template>
  <div class="copy-link">
    <input class="link-input" id="link" type="text" :value="$store.state.siteLink + '?site_design='+$store.state.designId" readonly>
    <div class="copy-btn system-bg-color" @click="copy" data-clipboard-target='#link'>复制</div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import common from "@assets/js/common";
export default {
  mixins: [mixins],
  name: 'SetLink',
  data() {
    return {
      link: ''
    };
  },
  mounted() {
  },
  methods:{
    copy() {
      var clipboard = new ClipboardJS('.copy-btn');
      clipboard.on('success', (e) => {
        common.dealResult(this, 1, "复制成功")
        clipboard.destroy();
      });
      clipboard.on('error', (e) => {
        common.dealResult(this, 1, "复制失败")
        clipboard.destroy();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .copy-link{
    position: relative;
    .link-input {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 43px 0 7px;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
    }
    .copy-btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background-color: #262d3a;
      text-align: center;
      cursor: default;
    }
  }
</style>
