<template>
  <div class="header" :class="{addIndex: indexFlag}" id="whole-header">
    <div class="left">
      <div class="icon" v-if="false">
        <i class="iconfont iconliebiao"></i>
      </div>
      <div class="logo">
        <a class="logo-warp" :href="href">
          <i class="iconfont iconlogo_huabanfuben"></i>
        </a>
      </div>
      <div class="item one-line-text" :title="$store.state.siteName">
        <i class="iconfont iconfudai"></i>
        {{$store.state.siteName}}
      </div>
      <div class="item one-line-text" :title="'设计 -'+$store.state.designName">
        <i class="iconfont iconfudai"></i>
        设计 - {{$store.state.designName}}
      </div>
      <div class="item">
        <i class="iconfont iconfudai"></i>
        模板
      </div>
      <div class="item msg" @click="noFunction">
        <i class="iconfont iconxiaoxi"></i>
      </div>
    </div>
    <div class="right">
      <div class="right-child">
        <div class="right-my" @click="noFunction">
          <i class="iconfont iconziyuan"></i>
        </div>
        <div class="right-sign" @click="noFunction">
          <i class="iconfont icontixing"></i>
        </div>
        <ul class="global" v-if="false">
          <li class="right-sign">全局设置</li>
          <li @click="savetoTemplate">存为模板</li>
          <li>
            <div @click.stop="selectSkin">换肤</div>
            <div class="select" :style="{ height: selectHeight }">
              <Skin></Skin>
            </div>
          </li>
        </ul>
        <ul class="list">
          <li
            v-for="(item, i) in list"
            :key="i"
            :class="{ active: item.isActive }"
            @click="itemClick(i)"
          >{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <Preview v-if="this.$store.state.showViewModal" @closeModal="closeModal"></Preview>
  </div>
</template>
<script>
import Skin from "./skin";
import { setTimeout } from "timers";
import common from "@assets/js/common";
import Preview from "@public/modal/preview";
import { log } from "util";
export default {
  components: {
    Skin,
    Preview,
  },
  name: "Header",
  data() {
    return {
      list: [
        { name: "保存并预览", isActive: false },
        { name: "保存", isActive: false },
        // { name: "提交", isActive: true },
        { name: "退出", isActive: false },
      ],
      selectHeight: "0",
      clickTime: 0,
      showViewModal: false,
      href: "",
    };
  },
  computed: {
    indexFlag() {
      return this.$store.state.showViewModal;
    },
  },
  methods: {
    noFunction() {
      common.dealResult(this, 2, "功能即将开放，敬请期待！");
    },
    itemClick(i) {
      const time = new Date().getTime();
      if (time - this.clickTime > 1000) {
        this.list.forEach((item) => {
          item.isActive = false;
        });
        this.list[i].isActive = true;
        switch (i) {
          case 0:
            this.saveData(i);
            break;
          case 1:
            this.saveData(i);
            break;
          default:
            break;
        }
        this.clickTime = time;
      }
    },
    selectSkin() {
      if (new Date().getTime() - this.clickTime > 300) {
        const me = this;
        if (!parseInt(this.selectHeight)) {
          this.selectHeight = "200px";
          document.onclick = function (e) {
            if (e.target.className != "skin") {
              me.selectHeight = 0;
              document.onclick = null;
            }
          };
        } else {
          this.selectHeight = 0;
        }
        this.clickTime = new Date().getTime();
      }
    },
    async saveData(i) {
      this.$store.state.globalloadingFlag = true;
      if (i == 0) {
        this.$store.state.globalloadingMsg = "页面生成中...";
      } else if (i == 1) {
        this.$store.state.globalloadingMsg = "数据保存中...";
      }
      const list = [];
      // this.$store.state.pageList.forEach((item) => {
      //   const templateList = [];
      //   item.templateList.forEach((el) => {
      //     let headerArr = [];
      //     if (el.moduleName == "头部") {
      //       headerArr = this.getHeadArr(el.setData.imgArr);
      //     }
      //     el.setData.isOnclick = false;
      //     let data = {
      //       name: el.name,
      //       setData: {
      //         domNum: el.setData.domNum,
      //         content: el.setData.content,
      //         style: el.setData.style,
      //         imgArr: el.setData.imgArr,
      //         isText: el.setData.isText,
      //         isImage: el.setData.isImage,
      //         isShowGroup: el.setData.isShowGroup,
      //         isUseTitle: el.setData.isUseTitle,
      //         areaTitle: el.setData.areaTitle,
      //         elements: el.setData.elements,
      //         chooseProductIds: el.setData.chooseProductIds,
      //         isGlobalNav: el.setData.isGlobalNav,
      //       },
      //     };
      //     templateList.push(data);
      //   });
      //   const obj = {
      //     pageId: item.pageId,
      //     pageName: item.pageName,
      //     isHome: item.isHome,
      //     setting: {
      //       seo: item.setting.seo,
      //       share: item.setting.share,
      //       style: item.setting.style,
      //       paddingAttr: item.setting.paddingAttr,
      //     },
      //     templateList: templateList,
      //   };
      //   list.push(obj);
      // });

      /* *****删减版数据***** */
      // const params1 = {
      //   design_content: list,
      // };
      // const res1 = await this.axios.post(
      //   "/api/sites/mysites/editing",
      //   params1
      // );

      /* *****完整数据***** */
      // let new_list = this.$store.state.pageList.filter(item => item.isSystem == false)
      this.$store.state.pageList.forEach((item)=>{
        if(item.isGlobalNav){
          item.globalNavData = this.$store.state.globalNavData
        }
      })
      const params = {
        id: this.$store.state.designId,
        design_content: this.$store.state.pageList,
      };
      const res = await this.axios.put(
        "/api/platform/console/mydesign/editing",
        params
      );
      if (res) {
        this.$store.state.globalloadingFlag = false;
        this.$store.state.globalloadingMsg = "";
        if (res.status == 1) {
          common.dealResult(this, 1, res.message);
          if (i == 0) {
            setTimeout(() => {
              this.$store.state.previewPageId = 0;
              this.$store.state.showViewModal = true;
            }, 0);
          }
        } else if (res.status == 0) {
          common.dealResult(this, 3, res.message);
        }
      }
    },
    savetoTemplate() {
      this.$store.state.isAddHtml = true;
      const obj = {
        pageId: this.$store.state.pageList[this.$store.state.pageIndex].pageId,
        templateList: this.$store.state.pageList[this.$store.state.pageIndex]
          .templateList,
      };
      this.$store.state.myTemplateList.push(obj);
      // alert("模板保存成功！");
    },
    preDef(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    stopBubble(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      else window.event.cancelBubble = true;
    },
    closeModal() {
      this.$store.state.showViewModal = false;
    },
    // 获取头部设置imgArr
    getHeadArr(arr) {
      let newArr = [];
      arr.forEach((v) => {
        let obj = {
          isHide: v.isHide,
          isText: v.isText,
          isImage: v.isImage,
          isFunction: v.isFunction,
          textObj: {
            title: v.textObj.title,
            position: v.textObj.position,
            function: v.textObj.function,
            color: {
              attr: v.textObj.color.attr,
            },
          },
          imageObj: {
            src: v.imageObj.src,
            function: v.imageObj.function,
          },
          functionObj: {
            name: v.functionObj.name,
            search: {
              title: v.functionObj.search.title,
              color: {
                attr: v.functionObj.search.color.attr,
              },
              keywords: v.functionObj.search.keywords,
            },
            return: {
              color: {
                attr: v.functionObj.return.color.attr,
              },
            },
          },
        };
        newArr.push(obj);
      });
      return newArr;
    },
  },
  async mounted() {
    this.href =
      process.env.NODE_ENV === "development"
        ? "//localhost:3000/"
        : "//console.tgsaas.com/";
    // let data = await this.axios.post("/api/sites/mysites/designEdit");
    // console.log(data, "+++++++++++++++++++++");
    // console.log(data, "*****");
    // data = JSON.parse(data.message.design_content);
    // const body = document.getElementsByTagName("body")[0];
    // body.onkeydown = e => {
    //   this.preDef(e);
    //   this.stopBubble(e);
    //   if (e.ctrlKey && e.keyCode == 83) {
    //     console.log("保存");
    //   }
    //   if (e.ctrlKey && e.keyCode == 67) {
    //     console.log("复制");
    //   }
    //   if (e.ctrlKey && e.keyCode == 88) {
    //     console.log("剪切");
    //   }
    //   if (e.ctrlKey && e.keyCode == 86) {
    //     console.log("粘贴");
    //   }
    //   if (e.ctrlKey && e.keyCode == 90) {
    //     console.log("上一步");
    //   }
    //   if (e.ctrlKey && e.keyCode == 89) {
    //     console.log("xai 一步");
    //   }
    //   if (e.keyCode == 46) {
    //     console.log("删除");
    //   }
    //   if (e.keyCode == 38) {
    //     console.log("上");
    //   }
    //   if (e.keyCode == 40) {
    //     console.log("下");
    //   }
    //   if (e.keyCode == 37) {
    //     console.log("左");
    //   }
    //   if (e.keyCode == 39) {
    //     console.log("右");
    //   }
    //   if (e.keyCode == 13) {
    //     console.log("enter");
    //   }
    //   if (e.keyCode == 27) {
    //     console.log("esc");
    //   }
    // };
    // body.oncontextmenu = e => {
    //   // e.preventDefault();
    // };
    // body.onmousedown = e => {
    //   if (e.button == 2) {
    //     console.log("右键");
    //   }
    // };
  },
};
</script>
<style lang="scss" scoped>
.header.addIndex {
  z-index: 1001;
}
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0px;
  z-index: $index3;
  line-height: 60px;
  text-align: center;
  min-width: 1200px;
  box-shadow: 0 0 5px 1px #ddd;
  background: #fff;
  div,
  ul {
    box-sizing: border-box;
    user-select: none;
  }
  .left,
  .right {
    width: 50%;
    float: left;
  }
  //========================================left
  .logo {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    float: left;
    .logo-warp {
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 31px;
      height: 31px;
      border: 2px solid;
      margin-top: 14px;
      margin-left: 14px;
      @include borderColor($baseColor1);
      border-radius: 50%;
      overflow: hidden;
      & i {
        display: block;
        position: absolute;
        top: -17px;
        left: -2px;
        font-size: 30px;
        @include fontColor($baseColor1);
        z-index: $index1;
      }
    }
  }
  .icon {
    @extend .logo;
    @include bacColor($baseColor1);
    & i {
      font-size: 24px;
      color: #333;
    }
  }
  .item {
    float: left;
    margin-top: 15px;
    background: #f9f9f9;
    height: 30px;
    line-height: 30px;
    color: $fontColor1;
    padding: 0 20px 0 10px;
    margin-right: 10px;
    font-size: 12px;
    max-width: 140px;
    & i {
      color: $fontColor1;
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .msg {
    background: transparent;
    & i {
      font-size: 22px;
      @include fontColor($baseColor1);
    }
  }

  //======================================right
  .right {
    .right-child {
      cursor: pointer;
      float: right;
      height: 100%;
      .list {
        height: 60px;
        margin-right: 20px;
        float: right;
        li {
          float: left;
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          margin-top: 15px;
          margin-left: 10px;
          font-size: 12px;
          color: $fontColor1;
          background: #fff;
          @include border(#e5e5e5);
        }
        .active {
          @include bacColor($baseColor1);
          @include borderColor($baseColor1);
        }
      }
      .global {
        @extend .list;
        float: left;
        width: 210px;
        li {
          position: relative;
          border: 0;
          .select {
            position: absolute;
            height: 0px;
            width: 200px;
            top: 46px;
            left: -62px;
            transition: 0.4s;
            overflow: hidden;
          }
        }
        li:nth-child(1) {
          margin-left: 0;
        }
        .right-sign::after {
          @include sign(0px, 3px);
        }
      }
      .right-sign,
      .right-my {
        float: left;
        width: 50px;
        height: 60px;
        i {
          font-size: 24px;
          @include fontColor($baseColor1);
        }
      }
    }
  }

  .view-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.34);
    z-index: $index5;
    .modal-wrap {
      position: relative;
      display: flex;
      width: 800px;
      height: 720px;
      border-radius: 5px;
      background: #fff;
      overflow: hidden;
      .close {
        position: absolute;
        right: 15px;
        top: 0;
        font-size: 20px;
        font-weight: 200;
        color: #ccc;
      }
      p.text {
        line-height: 30px;
        color: $fontColor3;
      }
      .view-wrap {
        width: 55%;
        padding: 20px;
        background: #fff;
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 375px;
          height: 667px;
          margin: 0 auto;
        }
      }
      .code-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 45%;
        background: #fafaff;
        img {
          width: 130px;
          height: 130px;
        }
      }
    }
    .copy-link {
      position: relative;
      width: 250px;
      height: 30px;
      .link-input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 50px 0 7px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
      }
      .copy-link-btn {
        position: absolute;
        right: 0;
        top: 15px;
        width: 44px;
        height: 30px;
        line-height: 30px;
        background-color: $baseColor1;
        text-align: center;
        cursor: default;
      }
    }
  }
}
</style>
