<template>
  <div class="left-editor" :style="{ left: left + 'px' }">
    <LeftSet />

    <i class="iconfont iconshouqi1" @click="showLeft"></i>
    <div class="tool">
      <div class="title">工具</div>
      <div class="moudle" v-show="this.$store.state.isSelfPage">
        <div class="moudle-title">模块</div>
        <div ref="itemWrap" :style="{height: height + 'px'}">
          <div
            class="left-item-click"
            v-for="item in curTemplateList"
            :key="item.id"
            :data="item.title"
            :class="{ disabled: item.isDisabled }"
          >
            <i class="iconfont" :class="item.icon"></i>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftSet from "@tool/leftSet";
import mixin from "@mixin/edtior";
import Sortable from "sortablejs";
import $ from "jquery";
import { setTimeout } from "timers";
export default {
  name: "LeftEditor",
  components: {
    LeftSet,
  },
  mixins: [mixin],
  data() {
    return {
      isChild: false,
      clickTime: 0,
      left: 180,
      obj: {},
      height: 0,
    };
  },
  computed: {
    curTemplateList: {
      get() {
        let arr = this.$store.state.curTemplateList;
        if (this.$store.state.pageList[this.$store.state.pageIndex].isHeader) {
          arr.forEach((item) => {
            if (item.title == "头部") {
              item.isDisabled = true;
            }
          });
        }
        return arr;
      },
    },
    templateList: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex]
          .templateList;
      },
    },
  },
  methods: {
    showLeft() {
      this.left = this.left > 0 ? 0 : 180;
    },
  },
  mounted() {
    const body = document.getElementsByTagName("body")[0];
    const curTemplateList = this.$refs.itemWrap;
    const me = this;
    this.height = body.offsetHeight - 200;
    Array.from(document.getElementsByClassName("left-item-click")).forEach(
      (el, i) => {
        const txt = this.$store.state.curTemplateList[i].title;
        el.onmousedown = function (e) {
          const x = e.clientX;
          const y = e.clientY;
          document.onmouseup = function (e) {
            const upX = e.clientX;
            const upY = e.clientY;
            x == upX && y == upY && me.elclick(txt, $);
            document.onmouseup = null;
          };
        };
      }
    );
    new Sortable(curTemplateList, {
      group: {
        name: "shared",
        pull: "clone",
        put: false, // 不允许拖拽进这个列表
      },
      animation: 300,
      forceFallback: true,
      removeCloneOnHide: true,
      sort: false,
      scroll: true,
      ghostClass: "sortable-ghost2",
      onStart: (e) => {
        me.$store.state.coverShow = true;
        return;
      },
      onEnd: (e) => {
        me.$store.state.coverShow = false;
      },
    });
  },
};
</script>
<style lang="scss" scoped>
.left-editor {
  position: fixed;
  top: 60px;
  left: 0;
  height: 708px;
  background: #fff;
  width: 240px;
  height: 100%;
  transition: 0.3s;
  border-right: 1px solid $borderColor;
  .iconshouqi1 {
    position: absolute;
    width: 10px;
    top: 45%;
    left: -10px;
    font-size: 30px;
    cursor: pointer;
    color: $fontColor3;
  }
  .title {
    padding: 10px 15px;
    border-bottom: 1px solid $borderColor;
    user-select: none;
  }
  .disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .moudle {
    padding: 3px 15px;
    .moudle-title {
      padding: 14px 0 10px 0;
      color: $fontColor2;
      user-select: none;
    }
    .left-item-click {
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      margin: 0 10px 10px 0px;
      width: 60px;
      float: left;
      border: 1px dashed #e5e5e5;
      border-radius: 5px;
      font-size: 12px;
      user-select: none;
      i {
        font-size: 25px;
        line-height: 40px;
        color: #666;
      }
      p {
        height: 20px;
        line-height: 15px;
        color: #666;
      }
    }
  }
  .bac-span {
    width: 300px;
  }
}
</style>
