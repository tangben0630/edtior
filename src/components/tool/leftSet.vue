<template>
  <div class="left">
    <div class="top">
      <div class="select" :class="{ bacLeft: isActive }">
        <div class="left-con" @click="select(1)">
          <i class="iconfont iconcengjiguanli" :class="{ active: isActive }"></i>
          页面列表
        </div>
      </div>
      <div class="select" :class="{ bacRight: !isActive }">
        <div class="right-con" @click="select(0)">
          <i class="iconfont iconliebiao" :class="{ active: !isActive }"></i>当页模块
        </div>
      </div>
    </div>
    <Module v-if="!isActive"></Module>
    <Page v-if="isActive"></Page>
  </div>
</template>
<script>
import Module from "@public/editor/module";
import Page from "@public/editor/page";
export default {
  name: "component_name",
  components: {
    Module,
    Page,
  },
  data() {
    return { isActive: true };
  },
  methods: {
    select(a) {
      if (!a) {
        this.$store.state.showNowPagecurTemplateList = false;
        this.isActive = false;
      } else {
        this.$store.state.showNowPagecurTemplateList = true;
        this.isActive = true;
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.left {
  background: #fff;
  position: absolute;
  width: 180px;
  left: -180px;
  height: 100%;
  top: 0;
  border-right: 1px solid #efefef;
  .top {
    height: 30px;
    padding-top: 10px;
    background: #efefef;
    display: flex;
    text-align: center;
    overflow: hidden;
    user-select: none;
    .select {
      user-select: none;
      flex: 1;
      padding: 0 5px;
      div {
        border-radius: 5px 5px 0px 0px;
        color: $fontColor1;
        line-height: 30px;
        cursor: pointer;
        i {
          color: $fontColor1;
        }
        .active {
          @include fontColor($baseColor1);
        }
      }
    }
    .bacLeft {
      border-top-right-radius: 6px;
      background: #fff;
    }
    .bacRight {
      border-top-left-radius: 6px;
      background: #fff;
    }
  }
}
</style>
