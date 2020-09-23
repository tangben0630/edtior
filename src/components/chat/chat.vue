<template>
  <div class="chat-wrap" :style="{}" v-if="this.$store.state.isShowChat">
    <div class="chat" :style="{ left: left + 'px', top: top + 'px' }">
      <div class="top" @mousedown.stop.prevent="down($event)">炙火客服</div>
      <div class="bot">
        <div class="left">
          <chatleft />
        </div>
        <div class="mid">
          <div class="mes-box">
            <chatmid />
          </div>
          <div class="input">
            <chatinput />
          </div>
        </div>
        <div class="right">
          <chatright />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chatmid from "./chatMid";
import chatright from "./chatRight";
import chatleft from "./chatLeft";
import chatinput from "./chatInput";
import mixins from "@mixin/chatMixin";

export default {
  name: "chat",
  mixins: [mixins],
  components: {
    chatmid,
    chatright,
    chatinput,
    chatleft
  },
  data() {
    return {
      ops: {},
      left: 0,
      top: 0,
      pageWidth: 0,
      pageHeight: 0
    };
  }
};
</script>
<style lang="scss" scoped>
.chat-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: #707d8c;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  z-index: $index4;
  .chat {
    width: 980px;
    height: 650px;
    position: absolute;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #ebedf0;
    box-shadow: 0 11px 30px 3px #445569;
    overflow: hidden;
    .top {
      width: 100%;
      height: 50px;
      text-align: left;
      background: #f7f8fa;
      border-bottom: 1px solid #ebedf0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: #323232;
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      cursor: move;
    }
    .bot {
      display: flex;
      .left {
        flex: 1;
        height: 600px;
        background: #fdfdfd;
      }
      .mid {
        flex: 3;
        border-left: 1px solid #ebedf0;
        .mes-box {
          height: 423px;
          display: flex;
          padding: 5px;
          padding-right: 0;
          border-bottom: 1px solid #ebedf0;
          position: relative;
          overflow: hidden;
        }
        .input {
          height: 175px;
          box-sizing: border-box;
          padding: 8px;
          position: relative;
        }
      }
      .right {
        flex: 1;
        position: relative;
        border-left: 1px solid #ebedf0;
        box-sizing: border-box;
        padding: 0 8px;
        height: 600px;
      }
    }
  }
}
</style>
