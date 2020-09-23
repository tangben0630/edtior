<template>
  <div class="right">
    <div
      class="container"
      v-if="
        this.$store.state.pageList[this.$store.state.pageIndex].nowCommponent
      "
    >
      <div class="top">
        <div class="set">
          <i class="iconfont iconquanjushezhi"></i>
          {{
            this.$store.state.pageList[this.$store.state.pageIndex]
              .nowCommponent &&
              this.$store.state.pageList[this.$store.state.pageIndex]
                .nowCommponent.setTitle
          }}
        </div>
      </div>
      <div class="body">
        <nav class="clearfix">
          <div
            class="nav-item"
            :class="{
              active: this.$store.state.pageList[this.$store.state.pageIndex]
                .nowCommponent.isBaseSet,
            }"
            @click="changeSet(0)"
          >
            基础设置
          </div>
          <!-- <div
            class="nav-item"
            :class="{
              active: !this.$store.state.pageList[this.$store.state.pageIndex]
                .nowCommponent.isBaseSet,
            }"
            @click="changeSet(1)"
          >
            高级设置
          </div> -->
        </nav>
        <Base
          v-show="
            this.$store.state.pageList[this.$store.state.pageIndex]
              .nowCommponent.isBaseSet
          "
        />
      </div>
    </div>
    <div class="container" v-if="pageFlag">
      <div class="top">
        <div class="set">
          <i class="iconfont iconquanjushezhi"></i>
          {{
            this.$store.state.pageList[this.$store.state.pageIndex].setting
              .title
          }}
        </div>
      </div>
      <div class="body">
        <nav class="clearfix">
          <div
            class="nav-item"
            :class="{ active: item.isShow }"
            v-for="(item, i) in this.$store.state.pageList[
              this.$store.state.pageIndex
            ].setting.list"
            @click="change(i)"
            :key="i"
          >
            {{ item.title }}
          </div>
        </nav>
        <Pagebasic
          v-if="
            this.$store.state.pageList[this.$store.state.pageIndex].setting
              .list[0].isShow
          "
        ></Pagebasic>
        <Pageshare
          v-if="
            this.$store.state.pageList[this.$store.state.pageIndex].setting
              .list[1].isShow
          "
        ></Pageshare>
        <Pageseo
          v-if="
            this.$store.state.pageList[this.$store.state.pageIndex].setting
              .list[2].isShow
          "
        ></Pageseo>
      </div>
    </div>
    <div
      class="bac"
      v-if="
        !this.$store.state.pageList[this.$store.state.pageIndex]
          .nowCommponent && !pageFlag
      "
    ></div>
  </div>
</template>
<script>
import Base from "@tool/baseSet";
// import High from "@tool/highSet";
import Pagebasic from "@tool/pageSet/basic";
import Pageshare from "@tool/pageSet/share";
import Pageseo from "@tool/pageSet/seo";
export default {
  name: "RightEditor",
  data() {
    return {};
  },
  methods: {
    changeSet(m) {
      if (m) {
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].nowCommponent.isBaseSet = false;
      } else {
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].nowCommponent.isBaseSet = true;
      }
    },
    change(i) {
      let list = this.$store.state.pageList[this.$store.state.pageIndex].setting
        .list;
      list.forEach((ele) => {
        ele.isShow = false;
      });
      list[i].isShow = true;
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].setting.currentIndex = i;
    },
  },
  created() {
    $('.__view').css('paddingRight', "10px")
  },
  components: {
    Base,
    Pagebasic,
    Pageshare,
    Pageseo,
  },
  computed: {
    pageFlag() {
      return this.$store.state.pageList[this.$store.state.pageIndex].isPageSet;
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  position: fixed;
  top: 60px;
  right: 0;
  width: 280px;
  height: 100%;
  padding: 0px 0px 0 10px;
  background: #fff;
  z-index: 1000;
  .container {
    height: 100%;
  }
  .top {
    padding-top: 10px;
    padding-left: 10px;
    background: #efefef;
    position: relative;
    .iconquanjushezhi {
      @include fontColor($baseColor1);
      font-size: 20px;
      position: absolute;
      left: 15px;
    }
    .set {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: $fontColor1;
      padding-left: 30px;
      padding-right: 10px;
      border-radius: 5px 5px 0px 0px;
      background: #fff;
    }
  }
  .body {
    padding: 20px;
    height: calc(100% - 175px);
    nav {
      border-bottom: 1px solid #d8d8d8;
      height: 26px;
      margin-bottom: 15px;
      .nav-item {
        float: left;
        width: 50px;
        margin-left: 45px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        padding-bottom: 5px;
        color: $fontColor3;
        position: relative;
        user-select: none;
        border-bottom: 1px solid transparent;
      }
      .nav-item:nth-child(1) {
        margin-left: 0;
      }
      .active {
        color: $fontColor1;
        border-bottom-width: 2px;
        @include borderColor($baseColor1);
      }
    }
  }
  .bac {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f8f8f8;
  }
}
</style>
