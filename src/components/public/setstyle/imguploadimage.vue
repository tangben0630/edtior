<template>
  <div ref="wrap">
    <div v-for="(item, i) in imgArr" :key="i">
      <div class="img-uploadimage">
        <!-- <span ref="spanRight">1</span> -->
        <i class="iconguanbi iconfont" @click.stop.prevent="close(item.id)"></i>
        <Imagebox
          :setData="setData"
          :item="item"
          :setAttr="attr"
          :class="{ disabled: !isImage }"
        ></Imagebox>
        <div class="right">
          <div class="input" :class="{ disabled: !isText }">
            <Titleinput :setData="setData" :item="item"></Titleinput>
          </div>
          <Doubleselect :item="item" :setData="setData"></Doubleselect>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import common from "@assets/js/common";
import Imagebox from "@public/global/imagebox";
import Titleinput from "@public/setstyle/titleinput";
import Doubleselect from "@public/setstyle/doubleselect";
import Sortable from "sortablejs";
export default {
  name: "imguploadimage",
  mixins: [mixins],
  data() {
    return {
      index: 0,
      attr: "src",
    };
  },
  props: {
    sets: {
      type: Object,
    },
  },
  components: {
    Imagebox,
    Titleinput,
    Doubleselect,
  },
  computed: {
    imgArr() {
      return this.setData.setImgArr;
    },
    isImage() {
      let flag = true;
      if (this.setData.setTitle == "分类导航") {
        flag = this.setData.isImage;
      }
      return flag;
    },
    isText() {
      let flag = true;
      if (this.setData.setTitle == "分类导航") {
        flag = this.setData.isText;
      }
      return flag;
    },
  },
  methods: {
    close(id) {
      if (this.setData.imgArr.length < 2) {
      } else {
        const newArr = [];
        this.setData.imgArr.forEach((el) => {
          const [obj] = this.setData.setImgArr.filter(
            (item) => item.id == el.id
          );
          newArr.push(obj);
        });
        this.setData.setImgArr = newArr;
        this.setData.setImgArr = this.setData.setImgArr.filter(
          (item) => item.id != id
        );
        this.setData.imgArr = this.setData.imgArr.filter(
          (item) => item.id != id
        );
        this.$emit("reset");
      }
      this.setData.domNum = this.setData.imgArr.length; //domNum
      if (this.setData.setTitle == "分类导航") {
        this.setContainer();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const templateList = this.$refs.wrap;
      new Sortable(templateList, {
        group: {
          name: "shared",
          pull: false,
        },
        animation: 300,
        forceFallback: true,
        removeCloneOnHide: true,
        fallbackOnBody: true,
        onEnd: (e) => {
          if (e.oldIndex != e.newIndex) {
            const oldItem = this.setData.imgArr[e.oldIndex];
            this.setData.imgArr.splice(e.oldIndex, 1);
            this.setData.imgArr.splice(e.newIndex, 0, oldItem);
          }
        },
      });
      this.index = this.setData.setStyleList.findIndex(
        (item) => item.isAdd == true
      );
    });
  },
};
</script>
<style lang="scss" scoped>
.img-uploadimage {
  box-sizing: border-box;
  padding: 5px;
  width: 240px;
  height: 72px;
  border: 1px dashed;
  position: relative;
  margin-bottom: 10px;
  border: 1px dashed $fontColor4;
  i {
    border-radius: 50%;
    position: absolute;
    right: -3px;
    top: -2px;
    font-size: 14px;
    height: 16px;
    width: 16px;
    color: red;
    display: none;
    cursor: pointer;
    z-index: $index1;
  }
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  &:hover {
    @include borderColor($baseColor1);
    i {
      display: block;
    }
  }
  display: flex;
  .image-wrap {
    width: 58px;
    height: 58px;
  }
  .right {
    width: calc(100% - 75px);
    input {
      width: 145px;
      padding-left: 10px;
      height: 27px;
      border: 1px solid #eee;
    }
  }
}
</style>
