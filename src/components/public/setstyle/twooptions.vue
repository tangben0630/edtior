<template>
  <div class="container" v-if="item.attr == 'header' ? setData.isPageMove: true">
    <div class="title">{{item.title}}</div>
    <div class="wrap">
      <div class="left item" v-for="(item, i) in sets" :key="i" @click="choose(i)">
        <p class="choose-icon" :class="{active: item.isActive}"></p>
        <div class="text-box">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  data () {
    return {
      
    }
  },
    props: {
    sets: {
      type: Array
    },
    setData: {
      type: Object
    }
  },
  methods:{
    choose(i){
      this.sets.forEach(element => {
        element.isActive = false;
      });
      this.sets[i].isActive = true;
      switch (this.item.attr) {
        case "showarea":
          this.setData.isShowGroup = this.sets[i].isShowGroup;
          break;
        case "header":
          this.setData.isUseHeight = this.sets[i].isUseHeight;
          // let flag = this.setData.isPageMove ? this.setData.isUseHeight: false;
          // this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = flag;
          this.$store.state.pageList[this.$store.state.pageIndex].setting.isUseHeight = this.setData.isUseHeight;
          break;
        default:
          break;
      }
    }
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  .title{
    width: 50px;
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
}
</style>