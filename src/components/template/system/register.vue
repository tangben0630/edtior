<template>
  <div class="user filtered">
    <div class="top border1pxbot">
      注册
      <div class="bac">
        <i class="iconfont iconjiantou2"></i>
      </div>
    </div>
    <div class="body">
      <h5 class="title">注册</h5>
      <div class="account">
        <div class="account-title">手机号</div>
        <div class="input border1pxbot">
          <input
            type="text"
            :value="account"
            placeholder="请输入您的账号"
            ref="input"
            @blur="blur($event)"
          />
          <span class="get" @click="getVerify">{{ verify }}</span>
        </div>
      </div>
      <div class="account password">
        <div class="account-title">验证码</div>
        <div class="input border1pxbot">
          <input type="text" placeholder="请输入短信验证码" ref="psd" />
        </div>
      </div>
      <div class="account password">
        <div class="account-title">设置初始密码</div>
        <div class="input border1pxbot">
          <input type="password" placeholder="请输入您的密码" ref="psd" />
          <i
            class="iconfont iconicon-test"
            :class="{ iconxianshi_huaban: show }"
            @click="showPsd"
          ></i>
        </div>
      </div>
      <div class="reg" @click="agree">
        <span class="square border1px">
          <i class="iconduihao iconfont" v-show="isAgree"></i>
        </span>
        已阅读并同意
        <span @click.stop="showService">《注册服务协议》</span>
      </div>
      <div class="btn">注册</div>
      <div class="reg sign">
        已有账号？
        <span>
          <a>立即登陆</a>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  middleware: "aaa",
  asyncData({ store, query }) {
    console.log("这是 login 页面 传过来的参数是：", query, store.state);
    return {
      info: query,
    };
  },
  data() {
    return {
      account: "",
      password: "",
      show: false,
      isAgree: false,
      verify: "获取验证码",
      timer: null,
      number: 60,
      time: 0,
    };
  },
  methods: {
    blur(e) {},
    back() {},
    showPsd() {},
    agree() {},
    showService() {},
    getVerify() {},
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.border1pxbot {
  border-bottom: 1px solid #ddd;
}
.border1px {
  border: 1px solid #ddd;
}
.top {
  text-align: center;
  line-height: 50px;
  letter-spacing: 2px;
  font-weight: 600;
  position: relative;

  .bac {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 20px;
    color: #666;
    i {
      font-size: 20px;
    }
  }
}
.body {
  padding: 25px;
  .title {
    letter-spacing: 1px;
    margin-bottom: 45px;
    font-size: 18px;
    margin-top: 20px;
    font-weight: 700;
  }
  .account {
    position: relative;
    .account-title {
      font-size: 10px;
      color: #333;
      font-weight: 600;
    }
    .input {
      position: relative;
      line-height: 45px;
      .get {
        position: absolute;
        height: 28px;
        width: 80px;
        text-align: center;
        border-radius: 5px;
        background: blue;
        font-size: 10px;
        color: #fff;
        top: 10px;
        line-height: 28px;
        right: 0;
      }
      input {
        border: 0;
        font-size: 14px;
      }
      .iconguanbi {
        position: absolute;
        right: 0;
        top: 2px;
        width: 20px;
        height: 20px;
        color: #ddd;
      }
      .iconicon-test {
        @extend .iconguanbi;
      }
    }
  }
  .password {
    margin-top: 20px;
  }

  .btn {
    text-align: center;
    margin-top: 50px;
    background: blue;
    color: #fff;
    border-radius: 3px;
    line-height: 40px;
    margin-bottom: 12px;
    letter-spacing: 2px;
    font-weight: 600;
  }
  .reg {
    text-align: left;
    color: #999;
    font-size: 12px;
    height: 16px;
    margin-top: 8px;
    line-height: 16px;
    padding-left: 16px;
    overflow: hidden;
    position: relative;
    transform: scale(0.8);
    margin-left: -29px;
    .square {
      left: 1px;
      top: 2px;
      position: absolute;
      width: 10px;
      height: 10px;
      i {
        position: absolute;
        top: -2px;
        left: 0;
        color: blue;
        font-size: 10px;
      }
    }
    span {
      color: blue;
    }
  }
  .sign {
    text-align: center;
  }
}
</style>
