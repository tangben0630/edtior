<template>
  <div class="container"
   :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow}" 
   :style="{
      paddingLeft: msg.style.paddingLeft + 'px',
      paddingRight: msg.style.paddingLeft + 'px',
   }"
    @mousedown="comDown($event)">
    <div class="area-title" v-if="msg.isUseTitle">{{msg.areaTitle}}</div>
    <div class="area-wrap">
      <div class="list-wrap">
        <div class="content-wrap-area">
          <p class="group-title" v-if="msg.isShowGroup">组一</p>
          <div class="content-part" 
          :style="{flexWrap: msg.style.wrap,marginTop:-msg.style.itemPaddingLeft + 'px',marginLeft:-msg.style.itemPaddingLeft + 'px'}">
            <div class="item" 
            :style="{width: msg.style.itemWidth,paddingTop:msg.style.itemPaddingLeft + 'px',paddingLeft:msg.style.itemPaddingLeft + 'px'}" 
            v-for="(item, i) in productList" :key="i">
            <a :style="{display: msg.style.display}">
              <div class="image-wrap" v-if="msg.elements.isImage"
              :style="{width: msg.style.height,paddingTop: (msg.style.height)?(msg.style.height):msg.elements.scale}" >
                <div class="image image-contain" :style="{backgroundImage: `url(`+item.image+`)`}"></div>
              </div>
              <div class="details" :style="{width: msg.style.height?'calc(100% - '+msg.style.height+')': ''}">
                <div v-if="msg.elements.isTitle" class="goods-title one-line-text">{{item.goods_title}}</div>
                <div v-if="msg.elements.isDescription" class="text one-line-text">{{item.goods_description}}</div>
                <div class="bottom" :class="{cur: msg.style.height}" v-if="msg.elements.isPrice || msg.elements.isButton">
                  <div v-if="msg.elements.isPrice" class="price" :style="{fontSize: msg.style.fontSize}">￥{{item.min_sell_price}}</div>
                  <div v-if="msg.elements.isButton" class="button iconfont icongouwuche" :style="{fontSize: msg.style.fontSize}"></div>
                </div>
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductModal :setData="msg"></ProductModal>
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
import ProductModal from "@public/modal/product";
export default {
  mixins: [mixins],
  name: "showarea",
  data() {
    return {};
  },
  props: {
  },
  components:{
    ProductModal,
  },
  computed:{
    productList: {
      get() {
        return this.msg.isGoodsFlag ? this.msg.chooseProductList: this.msg.defaultList;  
      }
    }
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .area-title {
    padding: 8px 0;
    font-size: 16px;
    color: #0d171b;
    font-weight: 500;
  }
  .content-wrap-area {
    width: 100%;
    .group-title {
      position: relative;
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    .content-part {
      display: flex;
      flex-wrap: wrap;
      margin-top: -10px;
      margin-left: -10px;
      .item {
        width: 100%;
        padding-top: 10px;
        padding-left: 10px;
        font-size: 0;
        box-sizing: border-box;
        a {
          display: block;
          width: 100%;
          text-decoration: none;
        }
          .image-wrap{
            position: relative;
            display: inline-block;
            width: 100%;
            height: 0;
            padding-top: 100%;
            border: 1px solid #ededed;
            border: none;
            box-sizing: border-box;
            border-radius: 2px;
          }
          .image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
          }
          .details {
            position: relative;
            padding: 0 8px;
            color: rgb(153, 153, 153);
            background-color: rgb(255, 255, 255);
          }
          .goods-title {
            max-height: 20px;
            line-height: 20px;
            padding-top: 5px;
            font-size: 13px;
            font-weight: bold;
            color: rgb(51, 51, 51);
            -webkit-line-clamp: 1;
          }
          .text {
            line-height: 16px;
            height: 16px;
            max-height: 16px;
            padding-top: 5px;
            font-size: 12px;
            -webkit-line-clamp: 1;
          }
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 36px;
          }
          .cur.bottom{
            position: absolute;
            bottom: 0;
            width: 90%;
          }
          .price {
            height: 20px;
            font-size: 14px;
            color: #e02020;
          }
          .button {
            margin-left: auto;
            margin-right: 0px;
            color: rgb(224, 32, 32);
            font-weight: 500;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            border-radius: 13px;
            border: 1px solid rgb(224, 32, 32);
            box-sizing: border-box;
            cursor: pointer;
          }
      }
    }
  }
}
.noheight {
  // transition: 0.3s;
  height: 0;
  border: 0;
  padding: 0;
  margin: 0;
}
</style>


