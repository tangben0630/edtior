<template>
  <div class="container">
    <div class="title">{{item.title}}</div>
    <div class="wrap">
      <div class="left item" @click="deal">
        <p class="choose-icon" :class="{active: isActive}"></p>
        <div class="text-box">{{item.selectText}}</div>
      </div>
      <div class="right" v-if="item.isUse">
        <input type="text" :value="setData.areaTitle" @input.stop.prevent="inputFn($event)" maxlength="6">
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  data () {
    return{
      
    }
  },
  computed: {
    isActive(){
      let flag;
      switch (this.item.attr) {
        case "showarea":
          flag = this.setData.isUseTitle;
          break;
        case "header":
          flag = this.setData.isPageMove;
          break;
      }
      return flag
    }
  },
  methods:{
    deal(){
      switch (this.item.attr) {
        case "showarea":
          // 选择是否使用展区标题
          this.setData.isUseTitle = !this.setData.isUseTitle;
          break;
        case "header":
          // 选择是否使用展区标题
          this.setData.isPageMove = !this.setData.isPageMove;
          this.$store.state.pageList[this.$store.state.pageIndex].setting.isPageMove = this.setData.isPageMove;
          if(!this.setData.isPageMove){
            this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = true;
          }else{
            this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = this.setData.isUseHeight;
          }
          // let flag = this.setData.isPageMove ? this.setData.isUseHeight: false;
          // this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = flag;
          break;
        default:
          break;
      }
    },
    // 修改标题
    inputFn(e){
      this.setData.areaTitle = e.target.value;
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .title{
    min-width: 50px;
    margin-right: 10px;
    color: $fontColor2;
  }
  .wrap{
    display: flex;
  }
  .item{
    display: flex;
    align-items: center;
    cursor: default;
    .text-box{
      width: 50px;
      height: 22px;
      line-height: 22px;
      margin-right: 10px;
      border-radius: 2px;
      border: 1px solid #eaeaea;
      text-align: center;
    }
  }
  input{
    width: 88px;
    height: 22px;
    padding-left: 10px;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    color: #0D171B;
  }
}
</style>
