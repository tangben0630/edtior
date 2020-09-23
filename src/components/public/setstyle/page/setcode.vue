<template>
  <div class="operate-code">
    <div class="code-image">
      <img :src="src" alt="">
    </div>
    <div class="edit-code">
      <p class="beauty">美化二维码</p>
      <p class="download">下载二维码</p>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: 'SetCode',
  data() {
    return {
      src: ''
    };
  },
  mounted() {
    this.src = this.$store.state.pageList[this.$store.state.pageIndex].setting.share.codeImage
  },
  methods:{
  }
};
</script>
<style lang="scss" scoped>
  .operate-code{
    display: flex;
    margin-bottom: 10px;
    .code-image {
      width: 82px;
      height: 82px;
      padding: 3px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .edit-code p {
      width: 88px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      margin-bottom: 10px;
      color: #0d171b;
      text-align: center;
      background: white;
      border: 1px solid #e5e5e5;
      cursor: pointer;
    }
  }
</style>
