<template>
  <div id="app">
    <Hoader />
    <div class="main main-content">
      <!-- 左边 页面，模块 -->
      <LeftEditor></LeftEditor>
      <!-- 中间 编辑器 -->
      <MidEditor></MidEditor>
      <!-- 右边 设置项 -->
      <RightEditor></RightEditor>
      <!-- loading -->
      <Loader></Loader>
      <!-- message  -->
      <Message></Message>
      <!-- Chat -->
      <!-- <Chat /> -->
    </div>
    <!-- <div v-for="(el, i) in aaa" :key="i">{{el}}</div> -->
  </div>
</template>
<script>
import Message from "@components/public/global/globalmessage";
import Loader from "@components/public/global/globalloading";
import Hoader from "@components/header/Header";
import LeftEditor from "@components/editor/LeftEditor";
import MidEditor from "@components/editor/MidEditor";
import RightEditor from "@components/editor/RightEditor";
import Chat from "@components/chat/chat";
import common from "@assets/js/common";
export default {
  name: "App",
  components: {
    Hoader,
    LeftEditor,
    MidEditor,
    RightEditor,
    Loader,
    Chat,
    Message,
  },
  data() {
    return {
      aaa: [1, 2, 3, 4],
    };
  },
  created() {},
  methods: {},
  mounted() {
    console.log(window.performance, "===");
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
}
.main {
  position: relative;
  height: 100%;
  padding-top: 60px;
  min-width: 1200px;
  overflow-y: scroll;
}
</style>
