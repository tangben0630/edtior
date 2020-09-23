<template>
  <div class="container">
    <p class="name">商品列表</p>
    <div class="wrap" :setData="setData">
      <ul class="list">
        <li class="item image-contain" 
           :class="{current: i == currentIndex}" 
           :style="{backgroundImage: `url(`+item.goods_imgs[0]+`)`}"
           @mouseover="mouseoverDel(i)" 
           @mouseleave="mouseleaveDel(i)" 
           v-for="(item, i) in productList" 
           :key="i"
           >
          <i class="iconfont iconguanbi delete-icon" @click="deleteItem(i)"></i>
        </li>
        <li class="add-icon iconfont iconjiahao" @click="showModal" v-if="setData.chooseProductList.length < 101"></li>
      </ul>
      <span class="text" v-if="setData.chooseProductList.length == 0">请添加商品</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isDeleteShow: false,
      currentIndex: null
    }
  },
  props:{
    setData:{
      type: Object
    }
  },
  computed:{
    productList: {
      get(){
        return this.setData.isGoodsFlag ? this.setData.chooseProductList: [];  
      }
    }
  },
  mounted(){
  },
  methods: {
    showModal(){
      this.$store.state.isProductModalShow = true;
    },
    mouseoverDel(i) {
      this.currentIndex = i
    },
    mouseleaveDel() {
      this.currentIndex = null
    },
    deleteItem(i) {
      this.setData.isDeleteGoods = true;
      this.setData.isGoodsFlag = false;
      this.setData.chooseProductList.splice(i, 1)
      this.setData.chooseProductIds.splice(i, 1)
      this.setData.isGoodsFlag = this.setData.chooseProductIds.length ? true: false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    display: flex;
    margin-bottom: 10px;
    .name{
      width: 60px;
      color: $fontColor2;
    }
    .wrap{
      display: flex;
      align-items: center;
      width: calc(100% - 26px);
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-left: 10px;
      }
      li.current{
        .delete-icon{
          display: block;
        }
      }
      .item{
        position: relative;
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        background-color: #fff;
        border: 1px solid $fontColor5;
      }
      .delete-icon{
        display: none;
        right: -6px;
        top: -7px;
      }
    }
    .add-icon{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      color: #027BFF;
      border: 1px dashed #e5e5e5;
      cursor: pointer;
    }
    .text{
      color: #acacac;
      margin-left: 10px;
    }
  }
</style>