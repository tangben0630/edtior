<template>
  <div class="wrap loading-wrap" ref="wrap" v-show="$store.state.globalLoading">
    <div class="loading success" v-if="showType == 1">
      <i class="iconfont iconduihao2"></i> {{$store.state.globalMessage}}
    </div>
    <div class="loading warning" v-if="showType == 2">
      <i class="iconfont iconjinggao"></i> {{$store.state.globalMessage}}
    </div>
    <div class="loading wrong" v-if="showType == 3">
      <i class="iconfont iconguanbi"></i> {{$store.state.globalMessage}}
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    showType(){
      if(this.$store.state.globalLoading){
        $('.loading-wrap').slideDown(2000)
      }else{
         $('.loading-wrap').slideUp(2000)
      }
      return this.$store.state.globalLoading;
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}
.loading {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 16px;
  font-size: 14px;
  color: #000;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
}
.success{
  color: #16c916;
  background-color: #e4ffd7;
}
.warning{
  color: #fea91a;
  background-color: #fff7cf;
}
.wrong{
  color: #fa5c5c;
  background-color: #ffe6e6;
}
</style>
