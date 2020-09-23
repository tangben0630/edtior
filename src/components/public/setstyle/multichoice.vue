<template>
  <div class="container">
    <ul class="list" :class="{change: isChange}">
      <li class="item" :class="{disabled: v.isDisabled}" v-for="(v, i) in list" :key="i" :style="{opacity: v.opacity}" @click="choose(i, v.attr)">
        <div class="select-box" :class="{active: v.isActive}">
          <p></p>
        </div>
        <span class="name">{{v.title}}</span>
      </li>
    </ul>
    <span class="iconfont iconxiangxiagengduo more-icon" v-if="item.isMore" @click="showMore"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isChange: true
    }
  },
  props:{
    setData: {
      type: Object
    },
    sets: {
      type: Array
    },
    item: {
      type: Object
    },
    drop: {
      type: Array
    },
  },
  computed:{
    list(){
      let arr = [];
      if(this.item.attr == 'usepage'){
        this.$store.state.pageList.forEach((item)=>{
          let obj = {};
          obj.title = item.pageName;
          obj.isActive = item.isGlobalNav;
          arr.push(obj)
        })
      }else{
        arr = this.sets
      }
      return arr
    }
  },
  methods:{
    choose(i, attr){
      if(this.sets[i].opacity && this.sets[i].opacity == '0.5') return;
      let type = this.item.type;
      if(type == 'single'){
        this.sets.forEach(element => {
          element.isActive = false;
        });
        this.sets[i].isActive = true;
      }else if(type == 'multi'){
        this.sets[i].isActive = !this.sets[i].isActive;
      }
      this.dealAttr(i, attr)
    },
    dealAttr(i, attr){
      let a = this.item.attr;
      switch (a) {
        case 'goodsplot':
          this.setData.style.itemWidth = this.sets[i].width;
          this.setData.style.wrap = this.sets[i].flexWrap;
          this.setData.style.fontSize = this.sets[i].fontSize;
          this.setData.style.height = this.sets[i].height;
          this.setData.style.display = this.sets[i].display;
          if(i == 4){
            this.drop[1].sets.forEach(ele => {
              ele.isDisabled = true;
              ele.isActive = false;
              this.drop[1].sets[0].isDisabled = false;
              this.drop[1].sets[0].isActive = true;
              this.setData.elements.scale = '100%';
            });
          }else{
            this.drop[1].sets.forEach(ele => {
              ele.isDisabled = false;
            })
          }
          break;
        case 'goodselement':
          setTimeout(()=>{
            this.setData.elements[attr] = this.sets[i].isActive;
          }, 0)
          break;
        default:
          break;
      }
    },
    showMore(){
      this.isChange = !this.isChange;
    }
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.container{
  position: relative;
  .more-icon{
    position: absolute;
    right: 0;
    bottom: 0px;
    font-size: 16px;
    height: 14px;
    line-height: 16px;
    text-align: center;
    background: #e5e5e5
  }
}
.list{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-height: auto;
  margin-left: -18px;
  overflow: hidden;
  .item{
    display: flex;
    margin-left: 18px;
    margin-bottom: 10px;
    cursor: default;
  }
  .item.disabled{
    cursor:not-allowed
  }
  .select-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border: 1px solid #e5e5e5;
    cursor: default;
    p{
      height: 8px;
      width: 8px;
    }
  }
  .select-box.active{
    p{
      background: $baseColor1;
    }
  }
}
.list.change{
  max-height: 50px;
}
</style>