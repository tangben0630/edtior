<template>
  <div class="container" :style="{width: item.width, height: item.height}">
    <span class="name" :style="{width: item.cwidth}">{{item.title}}</span>
    <div class="select" @click="showOptions" @mouseleave.stop.prevent="hideOptions">
      <div class="wrap">
        <p class="current">{{currentSelect}}</p>
        <i class="iconfont iconjiantou_liebiaozhankai-copy2"></i>
      </div>
      <ul class="options" v-show="isOptionShow" :style="{top: (parseInt(item.height)-2)+'px'}">
        <li @click="choose(i, item.name, item.num)" :key="i" v-for="(item, i) in item.sets">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: 'backgroundimage',
  data() {
    return {
      isOptionShow: false,
    };
  },
  props: {
    currentIndex: {
      type: String
    }
  },
  computed: {
    currentSelect(){
      let str = this.setData.style[this.item.attr];
      if(this.setData.setTitle == "头部设置"){
        str = this.setData.imgArr[this.currentIndex].functionObj.name
      }
      return str
    }
  },
  methods:{
    // 控制显示选项
    showOptions() {
      this.isOptionShow = !this.isOptionShow
    },
    // 隐藏
    hideOptions(){
      this.isOptionShow = false;
    },
    // 点击选择选项
    choose(i, name, num) {
      if(this.setData.setTitle == "头部设置"){
        this.setData.imgArr[this.currentIndex].functionObj.name = name;
      }else{
        this.setData.style[this.item.attr] = name;
      }
      let type = this.item.attr;
      switch (type) {
        case "showColumn":
          this.showColumn(i, num)
          break;
        case "showRow":
          this.showRow(i, num)
          break;
        case "chooseFunction":
          this.changeFunction(name)
          break;
        default:
        this.pagestyle(i);
          break;
      }
    },
    // 导航设置 列数
    showColumn(i, num){
      this.setData.style['column'] = num;
      this.setContainer()
    },
    // 导航设置 行数
    showRow(i, num){
      this.setData.style['row'] = num;
      this.setContainer()
    },
    // 功能选择
    changeFunction(name){
      switch (name) {
        case "搜索框":
          
          break;
        case "返回":
          
          break;
      
        default:
          break;
      }
      
    },
    // 页面设置 形式
    pagestyle(i){
      this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundSize = "";
      this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundPosition = "";
      switch (i) {
        case 0:
          this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundSize = "contain";
          break;
        case 1:
          this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundSize = "100% 100%";
          break;
        case 2:
          this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundSize = "cover";
          break;
        case 3:
          this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundPosition = "center";
          break;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
  .container{
    display: flex;
    align-items: center;
    width: 100%;
    height: 27px;
    margin-bottom: 10px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    .name{
      width: 32px;
      text-align: right;
      color: $fontColor2;
    }
    .select{
      position: relative;
      display: flex;
      align-items: center;
      width: calc(100% - 32px);
      height: 100%;
      padding: 0 3px;
      cursor: default;
      .current{
        width: 100%;
        padding-left: 8px;
        font-size: 12px;
      }
      i{
        position: absolute;
        right: 0;
        top: -1px;
        font-size: 20px;
        color: #999;
      }
      .options{
        position: absolute;
        left: 3px;
        width: calc(100% - 3px);
        background: #fff;
        border-radius: 3px;
        box-shadow: 0px 2px 10px 0px #e0d7d7;
        z-index: 2;
        li{
          padding: 0 6px;
          line-height: 24px;
        }
        li:hover{
          background: $hoverColor
        }
      }
    }
  }
</style>


