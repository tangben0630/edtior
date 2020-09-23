<template>
  <div class="container">
    <p class="title">{{item.title}}</p>
    <div class="wrap">
      <div class="item" :class="{active: item.isActive}" :key="i" v-for="(item, i) in sets" @click="choose(i)">
        <img :src="item.src" alt="">
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
  mounted(){
  },
  methods: {
    choose(i) {
      if (this.sets[i].isDisabled) return
      this.sets.forEach(element => {
        element.isActive = false;
      });
      this.sets[i].isActive = true;
      let type = this.sets[i].position;
      let attr = this.sets[i].styleAttr;
      this.setData.style.position = type;
      this.$store.state.globalNavData.setData.style.position = type;
      this.$store.state.pageList[this.$store.state.pageIndex]
          .setting['paddingAttr'] = attr ;
      this.$store.state.pageList[this.$store.state.pageIndex]
          .setting.style['paddingBottom'] = this.$store.state.pageList[this.$store.state.pageIndex].setting.style['paddingTop'] = 0;
      this.$store.state.pageList[this.$store.state.pageIndex]
          .setting.style[attr] = this.setData.style.height;
    },
  },
  props: {
    sets: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  margin-bottom: 10px;
  .title{
    width: 50px;
    margin-right: 10px;
    color: $fontColor2
  }
  .wrap{
    display: flex;
    align-items: center;
    .item{
      display: flex;
      align-items: center;
      margin-right: 10px;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(229,229,229,1);
      cursor: default;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item.active{
      border: 1px solid rgba(253,215,19,1);
    }
    .item.disabled{
      cursor:not-allowed
    }
  }
}
</style>