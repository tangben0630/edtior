<template>
  <div class="container">
    <p class="title">{{item.title}}</p>
    <div class="wrap">
      <div class="item" :class="{disabled: item.isDisabled}" :style="{opacity: item.opacity}" :key="i" v-for="(item, i) in sets" @click="choose(i)">
        <p class="choose-icon" :class="{active: item.isActive}"></p>
        <span>{{item.title}}</span>
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
      this.deal(i)
    },
    deal(i){
      let attr = this.item.attr;
      switch (attr) {
        case "imagescale":
          let scale = this.sets[i].scale;
          this.setData.elements.scale = 1/scale*100 + '%';
          break;
        case "navstyle":
          this.$store.state.globalNavData.setData.isImage = this.setData.isImage = this.sets[i].isImage;
          this.$store.state.globalNavData.setData.isText = this.setData.isText = this.sets[i].isText;
          break;
        default:
          break;
      }
    }
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
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% - 60px);
    .item{
      display: flex;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 5px;
      cursor: default;
    }
    .item.disabled{
      opacity: 0.3;
      cursor:not-allowed;
    }
  }
}
</style>