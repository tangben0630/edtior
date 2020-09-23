<template>
  <div class="view-modal" id="view-modal" @click.stop="close">
    <div class="modal-wrap" @click.stop>
      <span class="close iconfont iconguanbi-copy" @click.stop="close"></span>
      <div class="view-wrap">
        <div class="content">
          <iframe
            v-if="$store.state.siteLink"
            :src="mobileUrl"
            width="100%"
            height="100%"
            name="app"
            scrolling="auto"
            frameborder="0"
          ></iframe>
          <div class="blank" v-else>暂无内容</div>
        </div>
      </div>
      <div class="code-wrap">
        <div class="code-content">
          <p class="text">二维码分享</p>
          <img :src="this.reqUrl+'/api/common/qrCode?url='+$store.state.siteLink" alt />
        </div>
        <div class="link-content">
          <p class="text">链接分享</p>
          <div class="copy-link" id="copy-wrap">
            <input class="link-input" id="site-link" type="text" :value="mobileUrl" readonly />
            <div
              ref="copyBtn"
              class="copy-link-btn system-bg-color"
              @click="copy"
              data-clipboard-action="copy"
              data-clipboard-target="#site-link"
            >复制</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clipboard: "",
      reqUrl: "",
      params: "",
      src: "",
    };
  },
  mounted() {
    const href = window.location.href;
    const agreement = location.protocol;
    this.reqUrl = href.includes("test") //http://7n5dXr.test.www.wiwpay.cn/table/page?pageId=0&site_design=50258/table/page?pageId=0&site_design=50258
      ? agreement + "//test.api.zhihuokeji.com"
      : agreement + "//api.tgsaas.com";
    let design = "&site_design=" + this.$store.state.designId;
    const $domian = this.$store.state.siteLink.split("//")[1].split(".")[0];
    if (href.includes("test")) {
      this.mobileUrl = `//${$domian}.test.www.wiwpay.cn/table/page?pageId=${this.$store.state.previewPageId}&site_design=${this.$store.state.designId}`;
    } else {
      if (href.includes("host")) {
        this.mobileUrl = `//${$domian}.test.www.wiwpay.cn/table/page?pageId=${this.$store.state.previewPageId}&site_design=${this.$store.state.designId}`;
      } else {
        this.mobileUrl = `//${$domian}.tgsaas.com/table/page?pageId=${this.$store.state.previewPageId}&site_design=${this.$store.state.designId}`;
      }
    }
    this.params = this.$store.state.siteLink;
  },
  methods: {
    // 点击关闭
    close() {
      this.$emit("closeModal");
    },
    copy() {
      var clipboard = new ClipboardJS(".copy-link-btn", {
        container: document.getElementById("copy-wrap"),
      });
      clipboard.on("success", function (e) {
        clipboard.destroy();
      });
      clipboard.on("error", function (e) {
        clipboard.destroy();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.view-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.34);
  z-index: $index5;
  .modal-wrap {
    position: relative;
    display: flex;
    width: 800px;
    height: 720px;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
    .close {
      position: absolute;
      right: 15px;
      top: 0;
      font-size: 20px;
      font-weight: 200;
      color: #ccc;
    }
    p.text {
      line-height: 30px;
      color: $fontColor3;
    }
    .view-wrap {
      width: 55%;
      padding: 20px;
      background: #fff;
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 375px;
        height: 667px;
        margin: 0 auto;
      }
    }
    .code-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 45%;
      background: #fafaff;
      img {
        width: 130px;
        height: 130px;
      }
    }
  }
  .copy-link {
    position: relative;
    width: 250px;
    height: 30px;
    .link-input {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 50px 0 7px;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
    }
    .copy-link-btn {
      position: absolute;
      right: 0;
      top: 15px;
      width: 44px;
      height: 30px;
      line-height: 30px;
      background-color: $baseColor1;
      text-align: center;
      cursor: default;
    }
  }
}
</style>