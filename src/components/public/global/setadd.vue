<template>
  <div
    class="add add-item"
    @click="click($event)"
    :class="{ disabled: isDisabled }"
    :style="{ opacity: opacity }"
  ></div>
</template>
<script>
import mixins from "@mixin/setMixin";
import common from "@assets/js/common";
export default {
  name: "setadd",
  mixins: [mixins],
  data() {
    return {
      opacity: 1,
      timer: null,
      time: 0,
      index: 0,
    };
  },
  computed: {
    isDisabled() {
      let flag = false;
      if (this.setData.id > 9001) {
        flag = !this.$store.state.pageList[this.$store.state.pageIndex]
          .isGlobalNav;
      }
      return flag;
    },
  },
  methods: {
    click(e) {
      let scrollEL = $(".add-item").parents(".__panel");
      let contentEL = $(".add-item").parents(".__view");
      let txt = this.setData.setTitle;
      const time = new Date().getTime();
      const sDom = document
        .getElementById("baseSet")
        .getElementsByClassName("__view")[0];
      if (time - this.time > 300) {
        let len = this.setData.imgArr.length + 1;
        if (txt == "全局导航") {
          if (len > 5) return alert("最多可添加5个导航项");
        }
        let obj = this.getType();
        let obj1 = this.getType();
        if (txt == "全局导航") {
          this.$store.state.globalNavData.setData.setImgArr.push(obj);
          this.$store.state.globalNavData.setData.imgArr.push(obj1);
        } else {
          obj.title = "";
          this.setData.setImgArr.push(obj);
          this.setData.imgArr.push(obj1); //domNum
          // this.setData.domNum = this.setData.imgArr.length; //domNum
        }
        // object  指针位置是一样的
        clearTimeout(this.timer);
        this.opacity = 0.5;
        // contentEL.addClass('add-padding')
        setTimeout(() => {
          this.opacity = 1;
          // contentEL.removeClass('add-padding')
        }, 300);
        this.time = new Date().getTime();
      }
      if (this.setData.setTitle == "分类导航") {
        this.setContainer();
      }
      common.toPointPosition(scrollEL, contentEL, 90);
    },
    getType() {
      let data = {};
      let { id } = this.setData.imgArr.reduce((a, b) => (a.id > b.id ? a : b));
      id++;
      switch (this.setData.setTitle) {
        case "分类导航":
          data["name"] = "ImgUploadImage";
          data.title = "导航";
          data.max = 5;
          data.limit = true;
          data.src = "";
          break;
        case "图片设置":
          data["name"] = "ImgUploadImage";
          data.title = "";
          data.max = 28;
          data.limit = true;
          data.src = "";
          break;
        case "全局导航":
          data["name"] = "setGlobalNav";
          data.title = "标题";
          data.max = 5;
          data.limit = false;
          data.activeImg = "";
          data.normalImg = "";
          data.children = [];
          data.isClick = false;
          data.isActive = false;
          break;
        default:
          break;
      }
      var obj = {
        name: data.name,
        id: id,
        title: data.title,
        limit: data.limit,
        max: data.max,
        activeImg: data.activeImg,
        src: data.src,
        normalImg: data.normalImg,
        children: data.children,
        isActive: data.isActive,
        isClick: data.isClick,
        src: data.src,
        function: {
          pageId: 0,
          pageName: "",
          isSystem: true,
          link: false,
          production: false,
          type: "",
        },
      };
      return obj;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.index = this.setData.setStyleList.findIndex(
        (item) => item.isAdd == true
      );
    });
  },
};
</script>
<style lang="scss" scoped>
.add {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 290px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 5px 0 5px 3px #ddd;
  &::after {
    content: "+ 添加";
    position: absolute;
    top: 10px;
    left: 20px;
    width: 250px;
    height: 30px;
    @include bacColor($baseColor1);
    text-align: center;
    line-height: 30px;
  }
}
.disabled.add::after {
  opacity: 0.3;
}
.disabled.add {
  pointer-events: none;
}
</style>
