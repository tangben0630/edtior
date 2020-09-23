<template>
  <div
    class="image-wrap free-image-wrap"
    @mouseover="mouseoverDel"
    @mouseleave="mouseleaveDel"
    @click="showUploadImage"
  >
    <i
      v-if="!imageSrc && this.setData.setTitle != '分享设置'"
      class="iconfont iconjiahao"
      :class="{active: setAttr=='activeImg'}"
    ></i>
    <i
      v-if="!shareSrc && this.setData.setTitle == '分享设置'"
      class="iconfont iconjiahao"
      :class="{active: setAttr=='activeImg'}"
    ></i>
    <img
      class="image free-image"
      v-if="imageSrc"
      v-show="this.setData.setTitle != '分享设置'"
      :src="imageSrc"
      alt
    />
    <img class="image free-image" v-show="this.setData.setTitle == '分享设置'" :src="shareSrc" alt />
    <input
      accept="image/png, image/jpeg, image/jpg, image/gif"
      type="file"
      @change="commonUploadImage($event)"
      name="file"
      id="pagebg"
    />
    <p class="tag" v-if="setData.tag">{{setData.tag}}</p>
    <p class="tag" v-if="setData.size">{{size}}</p>
    <span class="iconfont iconguanbi delete-icon" v-show="isDeleteShow" @click.stop="deleteImage"></span>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "setimage",
  componenets: {},
  data() {
    return {
      isDeleteShow: false,
      formDataImage: {},
      type: "",
      shareSrc: "",
    };
  },
  props: {
    setAttr: {
      type: String,
    },
  },
  computed: {
    imageSrc() {
      let src = this.item.attr
        ? this.setData.style[this.item.attr]
        : this.item[this.setAttr];
      return src;
    },
    size() {
      switch (this.setData.domNum) {
        case 1:
          return "300 * 150";
          break;
        case 2:
          return "145 * 150";
          break;
        case 3:
          return "90 * 90";
          break;
        case 4:
          return "60 * 60";
          break;
        default:
          break;
      }
    },
  },
  watch: {
    imageSrc(a, b) {
      if (this.setData.setTitle == "分享设置") {
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].setting.share.image = a;
      }
    },
  },
  mounted() {
    // if (Array.isArray(this.setData.style)) {
    //   this.setData.style = {};
    // }
    this.shareSrc = this.setData.style.shareImage;
  },
  methods: {
    // 点击显示图片框
    showUploadImage() {
      // this.$store.state.isImageUpload = true
    },
    // 删除图片
    deleteImage() {
      this.imageSrc = "";
      this.isDeleteShow = false;
      if (this.item.attr == "backgroundImage") {
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].setting.style.backgroundImage = "";
        this.setData.style[this.item.attr] = "";
      } else {
        this.item[this.setAttr] = "";
        this.setData.imgArr &&
          this.setData.imgArr.forEach((ele) => {
            if (this.item.id == ele.id) {
              ele[this.setAttr] = "";
            }
          });
        if (this.setData.setTitle == "分享设置") {
          this.shareSrc = "";
          this.setData.style[this.item.attr] = "";
        }
      }
    },
    // 鼠标移入删除区域
    mouseoverDel() {
      this.isDeleteShow = this.imageSrc ? true : false;
    },
    mouseleaveDel() {
      this.isDeleteShow = false;
    },
    // 单图上传
    commonUploadImage(e, target) {
      let _this = this;
      const files = e.target.files;
      this.formDataImage = new FormData();
      this.formDataImage.append("image", files[0]);
      const xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
      const agreement = location.protocol;
      const baseURL =
        process.env.NODE_ENV === "development"
          ? agreement + "//test.api.zhihuokeji.com"
          :  agreement + "//api.tgsaas.com"; // 线上
      // const baseURL = process.env.NODE_ENV === "development" ? 'http://test.api.zhihuokeji.com' : 'http://test.api.zhihuokeji.com';  // 测试
      xhr.open("post", baseURL + "/api/common/upload/image", true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.onerror = this.uploadFailed; //请求失败
      xhr.send(this.formDataImage); //开始上传，发送form数据
      xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
          let res = xhr.responseText;
          if (res) {
            let data = JSON.parse(res);
            _this.setData.style[_this.item.attr] = data.message.image;
            if (_this.item.attr == "backgroundImage") {
              _this.$store.state.pageList[
                _this.$store.state.pageIndex
              ].setting.style.backgroundImage = data.message.image;
            } else {
              _this.item[_this.setAttr] = data.message.image;
              _this.setData.imgArr &&
                _this.setData.imgArr.forEach((el) => {
                  if (el.id == _this.item.id) {
                    el[_this.setAttr] = data.message.image;
                  }
                });
              if (_this.setData.setTitle == "分享设置") {
                _this.shareSrc = data.message.image;
              }
            }
          }
        } else {
          _this.uploadFailed();
        }
        e.target.value = "";
      };
    },
    // 请求失败
    uploadFailed() {
      alert("请求失败了");
    },
  },
};
</script>
<style lang="scss" scoped>
.set-image {
  display: flex;
  align-items: center;
}
.image-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 1px dashed #e5e5e5;
  cursor: pointer;
  i {
    font-size: 25px;
    color: #d8d8d8;
  }
  i.active {
    color: #027bff;
  }
  .image.normal {
    opacity: 0.7;
  }
  .delete-icon {
    right: -6px;
    top: -8px;
    z-index: 2;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: $index2;
  }
  .tag {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 17px;
    line-height: 18px;
    font-size: 12px;
    color: #fff;
    background: #999;
    opacity: 0.59;
    text-align: center;
  }
}
</style>
