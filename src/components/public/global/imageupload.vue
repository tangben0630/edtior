<template>
  <div class="modal"  @click.stop="close">
    <div class="content" @click.stop>
      <span class="iconfont iconguanbi-copy close-icon" @click.stop="close"></span>
      <div class="body">
        <nav>
          <p class="item my active">我的图库</p>
          <p class="item punlic">公共图库</p>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "imageupload",
  data() {
    return {};
  },
  methods: {
    close(){
      this.$store.state.isImageUpload = false;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: $index5;
    background: rgba($color: #000, $alpha: 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .close {
      text-align: center;
      position: absolute;
      top: 0;
      line-height: 60px;
      width: 30px;
      right: 10px;
      cursor: pointer;
    }
    .content {
      position: relative;
      width: 850px;
      height: 650px;
      background: #ffffff;
      padding: 47px 37px 20px 37px;
      box-shadow: 0 2px 19px 0 #b3b3b3;
      border-radius: 10px;
      text-align: center;
      box-sizing: border-box;
      .close-icon{
        position: absolute;
        top: 15px;
        right: 15px;
        color: #b3b3b3;
        font-size: 20px;
        cursor: pointer;
      }
      nav{
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #eeeeee;
        .item{
          font-size: 18px;
          margin-right: 15px;
          color: #999;
          cursor: default;
        }
        .item.active{
          color: #000
        }
      }
    }
  }
</style>