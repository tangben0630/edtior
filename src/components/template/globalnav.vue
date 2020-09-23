<template>
  <div
    class="globalnav"
    id="global"
    :class="{ shadow: msg.isOnclick && msg.isShow, noheight: !msg.isShow }"
    :style="position"
    :x="$store.state.pageList[$store.state.pageIndex].isGlobalNav"
    v-if="$store.state.pageList[$store.state.pageIndex].isGlobalNav"
    @mousedown="comDown($event)"
    @mouseleave="hide"
  >
    <ul class="nav-list" :style="{ height: msg.style.height }">
      <li class="item" v-for="(item, i) in list" :key="i" @click="clickFirst(i)">
        <div class="first-wrap">
          <div class="icon-wrap" v-if="msg.isImage">
            <img
              v-if="!item.isActive"
              :src="
                item.normalImg
                  ? item.normalImg
                  : item.activeImg
                  ? item.activeImg
                  : defaultNoImg
              "
              :style="{ opacity: 0.7 }"
              alt
            />
            <img
              v-if="item.isActive"
              :src="
                item.activeImg
                  ? item.activeImg
                  : item.normalImg
                  ? item.normalImg
                  : defaultAcImg
              "
              alt
            />
          </div>
          <p
            v-show="msg.isText"
            v-if="!item.isActive"
            :style="{ color: msg.style.textSecondaryColor }"
          >{{ item.title }}</p>
          <p
            v-show="msg.isText"
            v-if="item.isActive"
            :style="{ color: msg.style.textMainColor }"
          >{{ item.title }}</p>
        </div>
        <div class="second-wrap" v-if="item.isClick" :style="styleAttr">
          <div class="second-link" v-for="(item1, j) in item.children" :key="j">
            <div class="s-item">{{ item1.title }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import mixins from "@mixin/templateMixin";
import src from "@assets/image/right/img_cur_bac.png";
export default {
  mixins: [mixins],
  name: "images",
  data() {
    return {
      currentIndex: 0,
      defaultAcImg:
        "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-active.jpg",
      defaultNoImg:
        "//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/global-normal.jpg",
      msg: Object,
    };
  },
  props: {
    msg: {
      type: Object,
    },
  },
  computed: {
    list() {
      return this.$store.state.globalNavData.setData.imgArr;
    },
    num() {
      return this.$store.state.globalNavData.setData.domNum;
    },
    position() {
      let a = this.$store.state.globalNavData.setData.style.position;
      let flag = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .isUseHeight;
      let obj = {};
      obj[a] = 0;
      if (a == "top") {
        if (flag) {
          obj[a] = "40px";
        }
      }
      return obj;
    },
    styleAttr() {
      let obj = {};
      let a = this.$store.state.globalNavData.setData.style.position;
      a = a == "relative" ? "bottom" : a;
      obj[
        this.$store.state.globalNavData.setData.style.position
      ] = this.$store.state.globalNavData.setData.style.height;
      return obj;
    },
    msg() {
      return this.$store.state.globalNavData.setData;
    },
  },
  created() {},
  methods: {
    clickFirst(i) {
      if (this.currentIndex != i) {
        if (
          this.currentIndex <=
          this.$store.state.globalNavData.setData.imgArr.length - 1
        ) {
          this.$store.state.globalNavData.setData.imgArr[
            this.currentIndex
          ].isClick = false;
        }
      }
      this.currentIndex = i;
      this.$store.state.globalNavData.setData.imgArr.forEach((item, j) => {
        item.isActive = false;
      });
      this.$store.state.globalNavData.setData.imgArr[i].isActive = true;
      this.$store.state.globalNavData.setData.imgArr[i].isClick = !this.$store
        .state.globalNavData.setData.imgArr[i].isClick;
    },
    hide() {
      this.$store.state.globalNavData.setData.imgArr.forEach((item, j) => {
        item.isClick = false;
      });
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
#global {
  height: 50px;
  position: absolute;
  left: 0;
  width: 100%;
  background: #fff;
  bottom: 0;
  .nav-list {
    position: relative;
    display: flex;
    width: 100%;
    // box-sizing: border-box;
    // padding-top: 550px;
    // height: 600px;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-align: center;
      .icon-wrap {
        font-size: 0;
        img {
          width: 18px;
          height: 18px;
        }
      }
      p {
        margin-top: 2px;
        height: 16px;
      }
    }
  }
  .second-wrap {
    position: absolute;
    left: 0;
    bottom: 50px;
    z-index: 10;
    width: 100%;
    border-radius: 2px;
    box-shadow: #ccc 2px 0px 10px 0px;
  }
  .second-link {
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding: 0 5px;
    background: rgb(255, 255, 255);
    text-align: left;
    box-sizing: border-box;
  }
}
</style>
