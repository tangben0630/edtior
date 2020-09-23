<template>
  <div class="container">
    <ul class="list" :class="{change: isChange}" ref="wrap">
      <li class="item" :class="{disabled: v.isNoGlobal}" v-for="(v, i) in list" :key="i" @click="choose(i)">
        <div class="select-box" :class="{active: v.isGlobalNav}">
          <p></p>
        </div>
        <span class="name">{{v.pageName}}</span>
      </li>
    </ul>
    <span class="iconfont iconxiangxiagengduo more-icon" @click="showMore"></span>
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
      return this.$store.state.pageList
    },
  },
  methods:{
    choose(i){
      let attr = this.$store.state.pageList[this.$store.state.pageIndex].setting.paddingAttr;
      if(!this.$store.state.pageList[i].isGlobalNav){
        this.$store.state.pageList[i].setting.style[attr] = this.setData.style.height;
      }else{
        this.$store.state.pageList[i]
        .setting.style['paddingBottom'] = this.$store.state.pageList[i].setting.style['paddingTop'] = 0;
      }
      this.$store.state.pageList[i].isGlobalNav = !this.$store.state.pageList[i].isGlobalNav;
    },
    showMore(){
      this.isChange = !this.isChange;
    }
  },
  mounted(){
    this.isChange = this.$refs.wrap.offsetHeight > 50 ? true: false;
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
.disabled{
  opacity: 0.3;
  pointer-events: none;
}
</style>