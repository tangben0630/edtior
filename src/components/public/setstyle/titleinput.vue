<template>
  <div class="text" :style="{ paddingLeft: item.paddingLeft }">
    <span class="name" v-if="item.nameTitle">{{item.nameTitle}}</span>
    <input
      :style="{ width: item.width, height: item.height }"
      @keyup.stop.prevent="keyupFn($event)"
      @blur.stop.prevent="blurFn($event)"
      :value="item.title"
      :placeholder="item.default?item.default: '请输入标题'"
    />
    <p class="limit" v-if="item.limit">{{item.title? item.title.length: 0 }}/{{ item.max }}</p>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  mixins: [mixins],
  name: "textinput",
  data() {
    return {
      isSet: false,
      curValue: "",
    };
  },
  props: {
    currentIndex: {
      type: String,
    },
  },
  methods: {
    keyupFn(e) {
      let str = e.target.value;
      let len = str.length;
      if (this.item.max) {
        this.item.title = e.target.value =
          len > this.item.max ? str.substring(0, this.item.max) : str;
        this.setAttr(this.item.title);
      } else {
        this.item.title = e.target.value;
      }
    },
    setAttr(str) {
      if (this.setData.setTitle == "头部设置") {
        this.setData.imgArr.forEach((item) => {
          if (item.isText) {
            if (item.textObj.id == this.item.id) {
              item.textObj.title = str;
            }
          } else if (item.isFunction) {
            if (item.functionObj.name == "搜索框") {
              if (item.textObj.id == this.item.id) {
                item.functionObj.search.title = str;
              }
            }
          }
        });
      } else {
        this.setData.setImgArr.forEach((item) => {
          if (item.id == this.item.id) {
            item.title = str;
          }
        });
        this.setData.imgArr.forEach((item) => {
          if (item.id == this.item.id) {
            item.title = str;
          }
        });
      }
    },
    blurFn(e) {
      if (e.target.value == "") {
        let str = "";
        switch (this.setData.setTitle) {
          case "分类导航":
            str = "导航";
            break;
          default:
            break;
        }
        this.item.title = this.curValue = str;
        this.setAttr(str);
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.text {
  position: relative;
  display: flex;
  align-items: center;
  height: 27px;
  margin-bottom: 8px;
  background: white;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 12px;
  .name {
    width: 70px;
    padding-left: 5px;
    color: $fontColor2;
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .limit {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    line-height: 25px;
    padding: 0 3px;
    color: $fontColor1;
    background: #ededed;
  }
}
</style>
