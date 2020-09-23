<template>
  <div
    class="add"
    :style="{ left: left + 150 + 'px', top: top + 50 + 'px' }"
    @click="changezIndex(1)"
  >
    <div class="top" @mousedown.stop.prevent="down($event)">
      消息盒子
      <i class="iconfont iconguanbi-copy" @click="close"></i>
    </div>
    <div class="body">
      <ul class="add-list">
        <li v-for="(item, i) in list" :key="i">
          <img :src="item.src" v-if="!item.isSystem" />
          <p class="name" v-if="!item.isSystem">
            {{ item.username }}
            <span>{{ item.time }}</span>
          </p>
          <p class="con" v-if="!item.isSystem">
            {{ item.require }}
            <span>附言: {{ item.say }}</span>
          </p>
          <p class="con system" v-if="item.isSystem">
            <span class="sys">系统:</span>
            {{item.con }}
            <span class="sys-time">{{item.time}}</span>
          </p>
          <p class="right" v-if="!item.isSystem">
            <button class="left-btn">同意</button>
            <button class="right-btn">拒绝</button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mixins from "@mixin/chatMixin";
export default {
  name: "addFriend",
  mixins: [mixins],
  data() {
    return {
      list: [
        {
          isSystem: false,
          src:
            "//q.qlogo.cn/qqapp/101235792/B78751375E0531675B1272AD994BA875/100",
          username: "李彦宏",
          say: "有问题要问",
          require: "申请您添加为好友",
          time: "刚刚"
        },
        {
          isSystem: true,
          con: "雷军 拒绝了你的好友申请",
          time: "刚刚"
        }
      ],
      left: 0,
      top: 0
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.add {
  position: fixed;
  left: 0;
  top: 0;
  width: 600px;
  height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  z-index: $index5;
  background: #fff;
  .top {
    text-align: center;
    padding: 0 20px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 2px 2px 0 0;
    position: relative;
    cursor: move;
    i {
      position: absolute;
      top: 0px;
      right: 20px;
      cursor: pointer;
    }
  }
  .add-list {
    padding: 15px;
    box-sizing: border-box;
    li {
      position: relative;
      margin-bottom: 10px;
      padding: 0 130px 10px 60px;
      padding-bottom: 10px;
      line-height: 22px;
      border-bottom: 1px dotted #e2e2e2;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 50px;
      }
      .name {
        padding-top: 5px;
        span {
          padding-left: 5px;
          color: #999;
        }
      }
      .con {
        margin-top: 3px;
        span {
          padding-left: 5px;
          color: #999;
        }
        .sys {
          color: red;
        }
      }
      .system {
        margin-left: -60px;
      }
      .sys-time {
        color: #999;
      }
      .right {
        position: absolute;
        right: 0;
        top: 12px;
        color: #999;
        button {
          padding: 0 15px;
          margin-left: 5px;
          outline: medium;
          &:hover {
            opacity: 0.8;
          }
        }
        .left-btn {
          display: inline-block;
          vertical-align: middle;
          height: 38px;
          line-height: 38px;
          padding: 0 18px;
          background-color: #009688;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          font-size: 14px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }
        .right-btn {
          display: inline-block;
          vertical-align: middle;
          height: 38px;
          line-height: 38px;
          padding: 0 18px;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          font-size: 14px;
          border-radius: 2px;
          cursor: pointer;
          border: 1px solid #c9c9c9;
          background-color: #fff;
          color: #555;
        }
      }
    }
  }
}
</style>
