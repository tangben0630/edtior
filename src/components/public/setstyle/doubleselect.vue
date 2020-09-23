<template>
  <div
    class="link-box"
    :style="{
      height: this.item.isTitle ? height : '',
      liHeight: this.item.isTitle ? liHeight : '',
    }"
  >
    <div class="station" @mouseleave.stop.prevent="hideStationOptions">
      <div class="current-select" @click.stop.prevent="showStationOptions">
        <input type="text" :value="setVal" readonly />
        <span
          class="iconfont iconjiantou_liebiaozhankai-copy2 icon-collect"
          :style="{ top: this.item.isTitle ? '2px' : '' }"
        ></span>
      </div>
      <ul class="list option-list" v-if="isStationShow">
        <li
          class="option"
          v-for="(val, i) in funList"
          :key="i"
          @click.stop.prevent="selectFun(val)"
        >{{ val.value }}</li>
      </ul>
    </div>
    <div class="react-content" @mouseleave.stop.prevent="hideReactOptions">
      <div class="current-select" @click.stop.prevent="showReactOptions">
        <input
          type="text one-line-text"
          class="add-pointer"
          :title="selVal"
          :value="selVal"
          readonly
          v-show="!isLink && !isPro"
        />
        <span
          class="iconfont iconjiantou_liebiaozhankai-copy2 icon-collect"
          :style="{
            top: this.item.isTitle ? '2px' : '',
            right: this.item.isTitle ? '2px' : '',
          }"
          v-show="!isLink && !isPro"
        ></span>
        <div class="website-input" v-show="isLink && !isPro">
          <input
            type="text one-line-text"
            :title="selVal"
            :value="selVal"
            autofocus="autofocus"
            @blur="blur($event)"
          />
        </div>
        <div
          class="prodtext blue-text one-line-text"
          :title="productName"
          v-if="isPro && !isLink"
          @click="showModal"
        >{{ productName }}</div>
      </div>
      <ul class="list option-list" v-if="isReactShow">
        <li
          class="option"
          v-for="(val, i) in setList"
          :key="i"
          :value="val.link"
          @click.stop.prevent="solve(val)"
        >{{ val.pageName }}</li>
      </ul>
    </div>
    <ProductModal
      :setData="setData"
      :item="item"
      :isModalShow="isModalShow"
      @closeModal="closeModal"
      v-if="request"
    ></ProductModal>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import ProductModal from "@public/modal/setprodlink";
export default {
  mixins: [mixins],
  name: "doubleselect",
  components: {
    ProductModal,
  },
  data() {
    return {
      request: false,
      isStationShow: false,
      isReactShow: false,
      funList: [
        { value: "本站页面" },
        { value: "常用功能" },
        { value: "链接地址" },
        { value: "业务产品" },
      ],
      setList: [],
      isLink: false,
      isPro: false,
      setVal: "",
      selVal: "",
      height: "29px",
      liHeight: "28px",
      isModalShow: false,
    };
  },
  props: {
    setType: {
      type: String,
    },
  },
  computed: {
    productName: {
      get() {
        let name = this.item.function.productName
          ? this.item.function.productName
          : "请选择产品";
        if (
          this.$store.state.currentSelectedProduct &&
          this.item.function.productName
        ) {
          if (this.item.isTitle) {
            // 判断是不是文字标题
            this.setData.style.function.productId = this.item.function.productId;
            this.setData.style.function.productName = this.item.function.productName;
          } else {
            this.setData.imgArr.forEach((item) => {
              if (item.children && item.children.length > 0) {
                item.children.forEach((item1) => {
                  if (item1.id == this.item.id) {
                    item1.function.pageId = this.item.pageId;
                    item1.function.isSystem = this.item.isSystem;
                    item1.function.pageName = this.item.pageName;
                  }
                });
              } else {
                if (this.setType == "headerText") {
                  this.setData.imgArr.forEach((item) => {
                    if (item.textObj.id == this.item.id) {
                      item.textObj.function.productId = this.item.function.productId;
                      item.textObj.function.productName = this.item.function.productName;
                    }
                  });
                } else if (this.setType == "headerImage") {
                  this.setData.imgArr.forEach((item) => {
                    if (item.imageObj.id == this.item.id) {
                      item.imageObj.function.productId = this.item.function.productId;
                      item.imageObj.function.productName = this.item.function.productName;
                    }
                  });
                } else {
                  this.setData.imgArr.forEach((item) => {
                    if (item.id == this.item.id) {
                      item.function.productId = this.item.function.productId;
                      item.function.productName = this.item.function.productName;
                    }
                  });
                }
              }
            });
          }
        }
        return name;
      },
    },
  },
  methods: {
    // 隐藏选项
    hideReactOptions() {
      this.isReactShow = false;
    },
    hideStationOptions() {
      this.isStationShow = false;
    },
    // 控制显示功能
    showStationOptions() {
      this.isReactShow = false;
      this.isStationShow = !this.isStationShow;
    },
    // 控制显示选项功能具体项目
    showReactOptions() {
      this.isStationShow = false;
      this.isReactShow = !this.isReactShow;
    },
    showModal() {
      this.isModalShow = true;
      // this.$store.state.isSetProductLink = true;
    },
    selectFun(val) {
      if (val.value == "业务产品") {
        this.request = true;
      }
      this.item.function.type = val.value;
      if (this.item.isTitle) {
        this.setData.style.function.type = val.value;
      } else {
        if (this.setType == "headerText") {
          this.setData.imgArr.forEach((item) => {
            if (item.textObj.id == this.item.id) {
              item.textObj.function.type = val.value;
            }
          });
        } else if (this.setType == "headerImage") {
          this.setData.imgArr.forEach((item) => {
            if (item.imageObj.id == this.item.id) {
              item.imageObj.function.type = val.value;
            }
          });
        } else {
          this.setData.imgArr.forEach((item) => {
            if (item.id == this.item.id) {
              item.function.type = val.value;
            }
          });
        }
      }
      this.isStationShow = false;
      switch (val.value) {
        case "本站页面":
          this.setList = [
            ...this.$store.state.pageList.filter(
              (item) => item.isSystem == false
            ),
            ...this.$store.state.pageList.filter(
              (item) => item.isSystem == true
            ),
          ];
          this.isLink = false;
          this.isPro = false;
          this.selVal = "请选择";
          break;
        case "常用功能":
          this.isLink = false;
          this.isPro = false;
          this.setList = [];
          this.selVal = "暂无";
          break;
        case "链接地址":
          this.isLink = true;
          this.isPro = false;
          this.selVal = "";
          this.setList = [];
          break;
        case "业务产品":
          this.selVal = "请选择产品";
          this.isPro = true;
          this.isLink = false;
          this.setList = [];
          break;
        default:
          break;
      }
      this.setVal = val.value;
    },
    solve(val) {
      this.item.function.pageId = val.pageId;
      if (this.item.isTitle) {
        // 判断是不是文字标题
        this.setData.style.function.pageId = val.pageId;
        this.setData.style.function.isSystem = val.isSystem;
        this.setData.style.function.pageName = val.pageName;
      } else {
        this.setData.imgArr.forEach((item) => {
          if (item.children && item.children.length > 0) {
            item.children.forEach((item1) => {
              if (item1.id == this.item.id) {
                item1.function.pageId = val.pageId;
                item1.function.isSystem = val.isSystem;
                item1.function.pageName = val.pageName;
              }
            });
          } else {
            if (this.setType == "headerText") {
              if (item.textObj.id == this.item.id) {
                item.textObj.function.pageId = val.pageId;
                item.textObj.function.isSystem = val.isSystem;
                item.textObj.function.pageName = val.pageName;
              }
            } else if (this.setType == "headerImage") {
              if (item.imageObj.id == this.item.id) {
                item.imageObj.function.pageId = val.pageId;
                item.imageObj.function.isSystem = val.isSystem;
                item.imageObj.function.pageName = val.pageName;
              }
            } else {
              if (item.id == this.item.id) {
                item.function.pageId = val.pageId;
                item.function.isSystem = val.isSystem;
                item.function.pageName = val.pageName;
              }
            }
          }
        });
      }
      this.isReactShow = false;
      this.item.function.pageName = this.selVal = val.pageName;
    },
    blur(e) {
      const value = e.target.value;
      const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      if (reg.test(value)) {
        this.item.function.link = value;
        this.setData.imgArr.forEach((item) => {
          if (item.id == this.item.id) {
            item.function.link = value;
          }
        });
      } else {
        alert("网址错误");
      }
    },
    closeModal() {
      this.isModalShow = false;
    },
  },
  mounted() {
    if (this.item.isTitle) {
      switch (this.setData.style.function.type) {
        case "本站页面":
          this.setList = this.$store.state.pageList;
          this.selVal = this.item.function.pageName || "请选择";
          break;
        case "常用功能":
          break;
        case "链接地址":
          this.isLink = true;
          this.isPro = false;
          this.selVal = this.item.function.link || "";
          break;
        case "业务产品":
          this.isLink = false;
          this.isPro = true;
          this.selVal = "";
          break;
        default:
          this.selVal = "请选择";
          break;
      }
    } else {
      switch (this.item.function.type) {
        case "本站页面":
          this.setList = this.$store.state.pageList;
          this.selVal = this.item.function.pageName || "请选择";
          break;
        case "常用功能":
          break;
        case "链接地址":
          this.isLink = true;
          this.isPro = false;
          this.selVal = this.item.function.link || "";
          break;
        case "业务产品":
          this.isLink = false;
          this.isPro = true;
          this.selVal = "";
          break;
        default:
          this.selVal = "请选择";
          break;
      }
    }
    this.setVal = this.item.function.type || "跳转设置";
  },
};
</script>
<style lang="scss" scoped>
.link-box {
  display: flex;
  position: relative;
  width: 100%;
  height: 25px;
  line-height: 25px;
  margin-top: 5px;
  border: 1px solid;
  border-color: $fontColor5;
  box-sizing: border-box;
  .station {
    position: relative;
    width: 70px;
    padding-left: 5px;
    height: 100%;
  }
  .react-content {
    float: left;
    position: relative;
    padding-left: 3px;
    width: calc(100% - 70px);
  }
  .current-select {
    float: left;
    width: 100%;
    height: 100%;
    input {
      color: $fontColor2;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  .prodtext {
    width: 100%;
    height: 100%;
  }
  .icon-collect {
    position: absolute;
    right: -2px;
    top: 0;
    font-size: 18px;
    color: $fontColor3;
  }
  .option-list {
    position: absolute;
    top: 23px;
    left: 0;
    z-index: 10;
    width: 100%;
    color: #333;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0px #e0d7d7;
    box-sizing: border-box;
    li {
      line-height: 25px;
      padding: 0 8px;
      cursor: pointer;
    }
    li:hover {
      background: $hoverColor;
    }
  }
}
</style>
