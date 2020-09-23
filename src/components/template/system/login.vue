<template>
  <div class="user filtered">
    <div class="top border1pxbot">
      登录
      <div class="aaa"></div>
      <div class="bac">
        <i class="iconfont iconjiantou2"></i>
      </div>
    </div>
    <div class="body">
      <div class="logo" src alt />
      <h5 class="title">欢迎登录</h5>
      <div class="account">
        <div class="account-title">账号</div>
        <div class="input border1pxbot">
          <input
            type="text"
            :value="account"
            placeholder="请输入您的账号"
            ref="input"
            @blur="blur($event)"
          />
          <i class="iconfont iconguanbi" @click="clear($event)"></i>
        </div>
      </div>
      <div class="account password">
        <div class="account-title">密码</div>
        <div class="input border1pxbot">
          <input type="password" placeholder="请输入您的密码" ref="psd" />
          <i
            class="iconfont iconicon-test"
            :class="{ iconxianshi_huaban: show }"
            @click="showPsd"
          ></i>
        </div>
      </div>
      <div class="btn">登录</div>
      <div class="reg sign">
        还没有账号？
        <a>立即注册</a>
      </div>
    </div>
    <div class="third">—— 第三方登录 ——</div>
    <div class="footer">
      <div class="chat"></div>
      <div class="chat"></div>
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
    };
  },
  methods: {
    back() {},
    clear(e) {},
    showPsd() {},
    blur(e) {},
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.border1pxbot {
  border-bottom: 1px solid #ddd;
}
.top {
  text-align: center;
  line-height: 50px;
  letter-spacing: 2px;
  font-weight: 600;
  position: relative;
  // border: 1px solid #ddd;
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
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #f2f2f2;
    margin-bottom: 25px;
  }
  .title {
    letter-spacing: 1px;
    margin-bottom: 40px;
    font-size: 18px;
    font-weight: 600;
  }
  .account {
    position: relative;
    .account-title {
      font-size: 10px;
      color: #333;
    }
    .input {
      position: relative;
      line-height: 45px;
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
    text-align: center;
    color: #999;
    font-size: 12px;
    transform: scale(0.8);
    span {
      color: blue;
    }
    a {
      color: blue;
    }
  }
}
.third {
  color: #f2f2f2;
  font-size: 10px;
  text-align: center;
  margin-bottom: 3px;
}
.footer {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  .chat:nth-child(1) {
    margin-left: 0;
  }
  .chat {
    width: 28px;
    height: 28px;
    margin-left: 10px;
    background: #f2f2f2;
    border-radius: 50%;
  }
}
</style>
