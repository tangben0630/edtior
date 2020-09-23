<template>
  <div
    class="header-area"
    id="header"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow, useHeight: isUseHeight }"
    :style="{backgroundColor: msg.style.backgroundColor}"
    @mousedown="comDown($event)"
  >
    <div class="wrapper">
      <div class="item">
        <div class="block" :class="{hide: item.isHide}" v-for="(item, i) in msg.imgArr" :key="i" 
        :style="{flex: item.isText?1: item.isFunction&&item.functionObj.name == '搜索框'?2: 0}">
          <div class="text" v-if="item.isText" 
          :style="{textAlign: item.textObj.position, color: msg.style[item.textObj.color.attr]}">{{item.textObj.title}}</div>
          <div class="image" v-if="item.isImage">
            <img :src="item.imageObj.src?item.imageObj.src: defaultSrc" alt="">
          </div>
          <div class="function" v-if="item.isFunction">
            <div class="search-wrap" v-if="item.functionObj.name=='搜索框'">
              <i class="iconfont iconsousuo1"></i>
              <input type="text" :style="{color: msg.style[item.functionObj.search.color.attr]}" :value="item.functionObj.search.title" placeholder="请输入搜索内容">
            </div>
            <div class="return-wrap" v-if="item.functionObj.name=='返回'">
              <i class="iconfont iconjiantou2" :style="{color: msg.style[item.functionObj.return.color.attr]}"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
export default {
  name: "HeaderSet",
  mixins: [mixins],
  data () {
    return {
      defaultSrc: "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/temp-img/user-default.png",
    }
  },
  props: {
    msg: {
      type: Object
    }
  },
  computed: {
    isUseHeight() {
      return this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight;
    }
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.editor .header-area{
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}
.editor .header-area.useHeight{
  position: relative;
  top: 0;
  width: 100%;
  z-index: 10;
}
.wrapper{
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .block{
      margin-right: 10px;
    }
    .block:nth-last-child(1){
      margin-right: 0;
    }
    .block.hide{
      visibility: hidden
    }
  }
  .text{
    font-weight: bold;
    font-size: 13px;
  }
  .image{
    width: 22px;
    height: 22px;
    font-size: 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .search-wrap{
    position: relative;
    height: 27px;
    line-height: 27px;
    background: rgba($color: #fff, $alpha: 0.5);
    border-radius: 4px;
    .iconfont{
      position: absolute;
      left: 5px;
      font-size: 15px;
      color: #ccc;
    }
    input{
      width: 100%;
      height: 100%;
      padding-left: 25px;
      padding-right: 5px;
      background: rgba($color: #fff, $alpha: 0);
      box-sizing: border-box;
    }
  }
  .return-wrap{
    i{
      font-size: 17px;
      vertical-align: middle;
      font-weight: bold;
    }
  }
}
</style>