<template>
  <div class="personal filtered">
    <!-- <div class="top border1pxbot">
      登录
      <div class="aaa"></div>
      <div class="bac">
        <i class="iconfont iconjiantou2"></i>
      </div>
    </div> -->
    <div class="top border1pxbot">
      <div class="name">
        <h4>夏了夏天</h4>
        <p>账号：{{ number }}</p>
      </div>
      <div class="img"></div>
    </div>
    <div class="my-order border1pxbot">
      <div class="title">
        <span>我的订单</span>
        <span class="title-right"
          ><a href="">
            查看全部
            <i class="iconfont iconjiantou"></i> </a
        ></span>
      </div>
      <nav>
        <ul>
          <li v-for="(item, i) in orderList" :key="i">
            <div>
              <div class="icon">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              {{ item.val }}
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <ul class="my-list">
      <li v-for="(item, i) in systemList" :key="i">
        <div class="item">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{ item.val }}</p>
          <i class="iconfont" :class="item.iconright"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "personal",
  data() {
    return {
      number: "13214586542",
      orderList: [
        { val: "带付款", icon: "icondaifukuan" },
        { val: "代发货", icon: "icondaifahuodingdan" },
        { val: "待收货", icon: "icondaishouhuo" },
        { val: "待评价", icon: "iconwodedaipingjia" },
        { val: "售后/退款", icon: "icontuihuobaozhang" },
      ],
      systemList: [
        {
          val: "购物车",
          icon: "icontianchongxing-",
          iconright: "iconjiantou",
        },
        { val: "收货地址", icon: "iconshouhuodizhi", iconright: "iconjiantou" },
        { val: "帮助说明", icon: "iconicon-test1" },
        { val: "在线客服", icon: "iconzaixiankefux" },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.personal {
  a {
    text-decoration: none;
  }
  .border1pxbot {
    border-bottom: 1px solid #ddd;
  }
  padding: 16px;
  .top {
    position: relative;
    padding: 25px 0 20px 0;
    display: flex;
    .name {
      flex: 1;
      h4 {
        padding-top: 20px;
        padding-bottom: 16px;
        font-size: 16px;
        font-weight: 600;
      }
      p {
        color: #999;
        font-size: 10px;
      }
    }
    .img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: #f2f2f2;
    }
    margin-bottom: 15px;
  }
  .my-order {
    position: relative;
    padding-bottom: 15px;
    margin-bottom: 15px;
    .title {
      display: flex;
      font-weight: 600;
      font-size: 16px;
      span {
        flex: 1;
        text-align: left;
      }
      .title-right {
        font-weight: 400;
        a {
          color: #666;
        }
        i {
          font-size: 10px;
        }
        font-size: 12px;
        text-align: right;
        line-height: 20px;
      }
    }
    nav {
      padding-top: 0px;
      ul {
        display: flex;
      }
      li {
        text-align: center;
        flex: 1;
        position: relative;
        div {
          font-size: 12px;
          .icon {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        i {
          left: 16px;
          color: burlywood;
          font-size: 24px;
        }
        .icondaifahuodingdan {
          font-size: 30px;
        }
        .icondaishouhuo {
          font-size: 22px;
        }
        .icondaifukuan {
          font-size: 26px;
        }
      }
    }
  }
  .my-list {
    .item {
      position: relative;
      padding: 5px 20px 15px 30px;
      i {
        position: absolute;
        top: 2px;
        font-size: 18px;
      }
      .iconjiantou {
        right: 0;
        top: 3px;
        font-size: 14px;
      }
      .icontianchongxing- {
        color: coral;
        left: 0;
      }
      .iconshouhuodizhi {
        top: 2px;
        left: 0;
        font-size: 18px;
        color: darkcyan;
      }
      .iconicon-test1 {
        left: 1px;
        font-size: 16px;
        color: deeppink;
      }
      .iconzaixiankefux {
        left: 0;
        color: forestgreen;
        font-size: 17px;
        top: 2px;
      }
      p {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
