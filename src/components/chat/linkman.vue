<template>
  <div class="link" :style="{ right: this.$store.state.linkManRight + 'px' }">
    <div class="top">
      <div class="title">
        刘德华
        <i class="iconfont iconguanbi-copy" @click="close()"></i>
      </div>
      <ul class="nav">
        <li
          class="nav-list"
          :class="{ active: item.isActive }"
          v-for="(item, i) in navList"
          :key="i"
          @click="clickNav(i)"
        >
          <i class="iconfont" :class="item.icon"></i>
        </li>
      </ul>
    </div>
    <!-- 中间显示列表 -->
    <div class="list">
      <vue-scroll :ops="ops">
        <!-- 消息列表 -->
        <ul v-show="!this.$store.state.isChatSearch && navList[0].isActive" class="mesList">
          <li
            class="list-li"
            v-for="(item, i) in this.$store.state.mesList"
            :key="i"
            @dblclick.stop="toChat(item)"
          >
            <div class="icon">
              <i class="iconfont icontouxiang"></i>
            </div>
            <div class="con">
              <div class="name">{{ item.name }}</div>
              <p class>{{ item.con }}</p>
            </div>
          </li>
        </ul>
        <!-- 联系人列表 -->
        <ul v-show="!this.$store.state.isChatSearch && navList[1].isActive" class="link-list">
          <li class="list-slide" v-for="(item, i) in this.$store.state.linkList" :key="i">
            <i class="iconfont iconjiantou2" :class="{ down: item.showList }"></i>
            <div class="type" @click="slide(i)">{{ item.type }}</div>
            <div v-show="item.showList" class="show-list">
              <div
                class="list-show-li"
                v-for="(item, i) in item.list"
                :key="i"
                :class="{ borderTop: i > 0 }"
                @dblclick="toChat(item)"
              >
                <div class="icon">
                  <i class="iconfont icontouxiang"></i>
                </div>
                <div class="con">
                  <div class="name">{{ item.name }}</div>
                  <p class>{{ item.con }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- search -->
        <ul v-if="this.$store.state.isChatSearch" class="mesList search-list">
          <li
            class="list-li"
            v-for="(item, i) in this.$store.state.searchList"
            :key="i"
            @dblclick.stop="toChat(item)"
          >
            <div class="icon">
              <i class="iconfont icontouxiang"></i>
            </div>
            <div class="con">
              <div class="name">{{ item.name }}</div>
              <p class>{{ item.con }}</p>
            </div>
          </li>
        </ul>
      </vue-scroll>
    </div>
    <!-- footer -->
    <div class="footer">
      <input type="text" class="search" v-show="search" @keyup="input($event)" />
      <i class="iconfont iconguanbi-copy" v-show="search" @click="closeSearch"></i>
      <ul class="nav">
        <li
          class="nav-list"
          :class="{ active: item.isActive }"
          v-for="(item, i) in toolList"
          :key="i"
          @click="tool(i)"
        >
          <i class="iconfont" :class="item.icon"></i>
        </li>
      </ul>
    </div>
    <addFriend :style="{zIndex: this.$store.state.addzIndex}" v-if="showAdd" @close="closeShowAdd" />
    <notice
      :style="{zIndex: this.$store.state.noticezIndex}"
      v-if="showNotice"
      @close="closeNotice"
    />
  </div>
</template>
<script>
import notice from "./notice";
import addFriend from "./addFriend";

export default {
  name: "linkman",
  components: {
    addFriend,
    notice
  },
  data() {
    return {
      ops: {
        scrollPanel: {
          initialScrollY: false, //只要组件mounted之后自动滚动的距离。 例如 100 or 10%
          initialScrollX: false,
          scrollingX: false, //是否启用 x 或者 y 方向上的滚动
          scrollingY: true,
          gutterOfSide: "-4px",
          speed: 300, //多长时间内完成一次滚动。 数值越小滚动的速度越快
          easing: undefined, //滚动动画 参数通animation
          verticalNativeBarPos: "right" //原生滚动条的位置
        },
        rail: {
          background: "#01a99a",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "-1px",
          keepShow: false
        },
        bar: {
          showDelay: 300, //在鼠标离开容器后多长时间隐藏滚动条
          onlyShowBarOnScroll: false, //当页面滚动时显示
          keepShow: false, //是否一直显示
          background: "#c3c3c3",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "3px",
          disable: false //是否禁用滚动条
        }
      },
      navList: [
        {
          icon: "iconxiaoxi",
          isActive: true
        },
        {
          icon: "icongeren2",
          isActive: false
        },
        {
          icon: "iconlianxiren",
          isActive: false
        }
      ],
      toolList: [
        {
          icon: "iconsousuo1",
          isActive: true
        },
        {
          icon: "iconguangbo",
          isActive: false
        },
        {
          icon: "iconjiahao",
          isActive: false
        }
      ],
      mesList: [
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        },
        {
          name: "刘德华",
          con: "你在干什么？",
          img: "",
          type: "mes"
        },
        {
          name: "罗玉凤",
          con: "",
          img: "",
          type: "mes"
        }
      ],
      linkList: [
        {
          type: "知名人物",
          list: [
            {
              name: "的快速路父级的",
              con: "你在干什么？",
              img: ""
            },
            {
              name: "罗玉凤",
              con: "",
              img: ""
            }
          ],
          showList: false
        },
        {
          type: "小学同学",
          list: [
            {
              name: "xxx",
              con: "你在干什么？",
              img: ""
            },
            {
              name: "小龙",
              con: "",
              img: ""
            }
          ],
          showList: false
        }
      ],
      right: 0,
      search: false,
      showAdd: false,
      showNotice: false,
      addzIndex: 99999,
      noticezIndex: 99999
    };
  },
  methods: {
    clickNav(i) {
      this.navList.forEach(el => {
        el.isActive = false;
      });
      this.navList[i].isActive = true;
    },
    toChat(item) {
      this.$store.state.isShowChat = true;
      if (
        this.$store.state.leftChattingList.filter(el => el.id == item.id)
          .length < 1
      ) {
        this.$store.state.leftChattingList.unshift(item);
      }
      this.$store.state.nowChatList = [];
      this.$store.state.nowChatId = item.id;
      this.$store.state.isChatSearch = false;
      this.$store.state.searchList = [];
    },
    // 联系人
    slide(i) {
      this.$store.state.linkList[i].showList = !this.$store.state.linkList[i]
        .showList;
    },
    close() {
      this.$store.state.linkManRight = -300;
    },
    tool(i) {
      if (i) {
        if (i == 1) {
          this.showNotice = true;
          this.$store.state.addzIndex = 99999;
          this.$store.state.noticezIndex = 999999;
        } else {
          this.showAdd = true;
          this.$store.state.addzIndex = 999999;
          this.$store.state.noticezIndex = 99999;
        }
      } else {
        this.search = true;
      }
    },
    closeSearch() {
      this.search = false;
      this.$store.state.isChatSearch = false;
      this.$store.state.searchList = [];
    },
    closeShowAdd() {
      this.showAdd = false;
    },
    closeNotice() {
      this.showNotice = false;
    },
    input(e) {
      let val = e.target.value;
      if (val) {
        this.$store.state.searchList = this.$store.state.linkList[0].list.filter(
          item => item.name.indexOf(val) > -1
        );
        this.$store.state.isChatSearch = true;
      } else {
        this.$store.state.searchList = [];
        this.$store.state.isChatSearch = false;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.link {
  position: fixed;
  width: 260px;
  height: 550px;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  transition: 0.4s;
  z-index: $index5;
  .footer {
    background: #ebedf0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    .iconguanbi-copy {
      position: absolute;
      right: 12px;
      top: 9px;
      cursor: pointer;
    }
    .search {
      position: absolute;
      top: 10%;
      left: 2%;
      width: 96%;
      height: 80%;
      box-sizing: border-box;
      background: #ddd;
      padding-left: 5px;
      border-radius: 5px;
    }
    .nav {
      display: flex;
    }
    .nav-list {
      user-select: none;
      display: flex;
      flex: 1;
      height: 40px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      i {
        color: #666;
      }
    }
  }
  .top {
    background: #ebedf0;
    .title {
      user-select: none;
      position: relative;
      text-align: left;
      padding-left: 10px;
      padding-top: 10px;
      font-size: 16px;
      i {
        position: absolute;
        right: 9px;
        top: 7px;
        color: #666;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .nav {
      padding-top: 20px;
      display: flex;
      .nav-list {
        display: flex;
        flex: 1;
        height: 30px;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #ebedf0;
        padding-bottom: 5px;
        cursor: pointer;
        i {
          font-size: 20px;
          color: #666;
        }
        .iconlianxiren {
          font-size: 30px;
        }
      }
      .active {
        border-bottom: 2px solid blue;
      }
    }
  }
  .list {
    height: 460px;
    box-sizing: border-box;
    padding-bottom: 39px;
    user-select: none;
    .mesList {
      padding: 11px 0;
      .list-li {
        padding: 10px 15px;
        display: flex;
        &:hover {
          background: #f2f2f2;
        }
        i {
          font-size: 26px;
        }
        .con {
          margin-left: 10px;
          .name {
            font-size: 14px;
          }
          p {
            font-size: 12px;
            color: #666;
            padding-top: 5px;
          }
        }
      }
    }

    .link-list {
      padding: 11px 0;
      .list-li {
        background: #fff;
        padding: 10px 15px;
        .con {
          margin-left: 10px;
          .name {
            font-size: 14px;
          }
          p {
            font-size: 12px;
            color: #666;
            padding-top: 5px;
          }
        }
      }
      .list-slide {
        padding-top: 11px;
        padding-bottom: 0;
        display: block;
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          top: 7px;
          left: 12px;
          transition: all 0.3s ease;
          transform: rotate(180deg);
          color: #999;
        }
        .down {
          transform: rotate(270deg);
        }
        .type {
          margin-left: 35px;
          padding-bottom: 11px;
        }
        .list-show-li {
          position: relative;
          display: flex;
          padding: 10px 15px;
          .icon {
            width: 30px;
            height: 30px;
            i {
              font-size: 30px;
              color: #666;
              transform: rotate(0);
            }
          }
          .con {
            position: relative;
            margin-left: 10px;
            .name {
              font-size: 14px;
            }
            p {
              font-size: 12px;
              color: #666;
              padding-top: 5px;
            }
          }
        }
        .borderTop {
          border-top: 1px solid #eee;
        }
        .show-list {
          border-top: 1px solid #eee;
        }
      }
      .slideDown {
        padding-bottom: 0;
      }
    }
  }
}
</style>
