<template>
  <div class="set-size">
    <Singleselect :setData="setData" :item="item"></Singleselect>
    <div class="block">
      <!-- <div class="item" v-for="(item, i) in item.others" @click="repeat(i)"
       :class="{active: i == 0?leftShow: rightShow}">{{item.name}}</div> -->
      <div class="item" @click="repeat(0)"
       :class="{active: leftActive}">垂直</div>
      <div class="item" @click="repeat(1)"
       :class="{active: rightActive}">水平</div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import Singleselect from "@public/global/singleselect";
export default {
  mixins: [mixins],
  name: 'backgroundsize',
  components: {
    Singleselect
  },
  data() {
    return {
      currentIndex: '',
      leftShow: false,
      rightShow: false,
    };
  },
  mounted() {
  },
  computed: {
    leftActive() {
      let a = this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundRepeat;
      let flag = a == "repeat" || a == "repeat-y";
      this.leftShow = flag;
      return flag
    },
    rightActive() {
      let a = this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundRepeat;
      let flag = a == 'repeat' || a == "repeat-x";
      this.rightShow = flag;
      return flag
    }
  },
  methods:{
    repeat(i) {
      let ele = this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundRepeat;
      let attr = "no-repeat";
      i == 0 ? this.leftShow = !this.leftShow: this.rightShow = !this.rightShow;
      if(this.leftShow && this.rightShow) {
        attr = 'repeat';
      }else if(this.leftShow || this.rightShow){
        attr = this.leftShow ? "repeat-y": "repeat-x";
      }
      this.setData.style['backgroundRepeat'] = attr;
      this.$store.state.pageList[this.$store.state.pageIndex].setting.style.backgroundRepeat  = attr;
    }
  }
};
</script>
<style lang="scss" scoped>
  .set-size{
    display: flex;
  }
  .block{
    display: flex;
    .item{
      width: 45px;
      height: 23px;
      line-height: 23px;
      margin-left: 10px;
      color: #435862;
      text-align: center;
      background: rgba(245,245,245,1);
      border-radius: 2px;
      border: 1px solid rgba(234,234,234,1);
      cursor: default;
    }
    .item.active{
      background: $baseColor1;
    }
  }
</style>


