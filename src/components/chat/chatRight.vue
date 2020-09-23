<template>
  <div class="right-com">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
      </div>
    </div>
    <!-- 产品动态 -->
    <div class="product">
      <h1>产品动态</h1>
      <ul>
        <li>
          <a href="">
            05/15 订单退款时营销资产权益追回
          </a>
        </li>
        <li>
          <a href="">
            05/15 订单退款时营销资产权益追回
          </a>
        </li>
        <li>
          <a href="">
            05/15 订单退款时营销资产权益追回
          </a>
        </li>
        <li>
          <a href="">
            05/15 订单退款时营销资产权益追回
          </a>
        </li>
        <li>
          <a href="">
            05/15 订单退款时营销资产权益追回
          </a>
        </li>
      </ul>
    </div>
    <!-- 自助工具-->
    <div class="product">
      <h1>自助工具</h1>
      <div class="tool">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: true, //可选选项，自动滑动
      slidesPerView: 1,
      loop: true,
    });
  },
};
</script>
<style lang="scss" scoped>
.right-com {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: 5px;
  .swiper-container {
    background: burlywood;
    width: 216px;
    height: 70px;
    .swiper-slide {
      width: 100%;
      text-align: center;
      line-height: 80px;
    }
  }
  .product {
    h1 {
      height: 20px;
      line-height: 20px;
      padding: 0 12px;
      flex-shrink: 0;
      flex-grow: 0;
      margin-top: 16px;
      margin-bottom: 12px;
      font-weight: 700;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 3px;
        width: 4px;
        height: 12px;
        background: blue;
      }
    }
    ul {
      li {
        border-bottom: 1px solid #ebedf0;
        a {
          color: #323232;
          font-size: 14px;
          height: 29px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          line-height: 30px;
          text-decoration: none;
          &:hover {
            color: blue;
          }
        }
      }
    }
    .tool {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 50px;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
