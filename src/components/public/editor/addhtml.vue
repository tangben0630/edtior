<template>
  <div class="add-html" @click.prevent="close">
    <div class="content" @click.stop="no">
      <div class="close" @click.prevent="close">
        <i class="iconfont iconguanbi-copy"></i>
      </div>
      <div class="top">
        <div class="solo" :class="{ active: isActive }" @click="change(1)">单页模板</div>
        <div class="my" :class="{ active: !isActive }" @click="change(2)">我的模板</div>
      </div>
      <div class="bot">
        <div class="left">
          <Inputcom />
          <ul class="left-con" ref="left">
            <li v-for="(item, i) in templateList" :key="i" @click="select(i)">第{{ i + 1 }}个模板</li>
            <li class="blank" @click="use">
              <i class="iconfont iconjiahao"></i>
            </li>
            <!-- <li class="no" v-if="templateList.length < 1">
              系统目前没有单页模板
            </li>-->
          </ul>
        </div>
        <div class="right">
          <h2>当前模板</h2>
          <img src alt />
          <div class="btn" @click="use">立即使用</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Inputcom from "./input";
import common from "@assets/js/common";
import mixins from "@mixin/edtior";
export default {
  mixins: [mixins],
  name: "component_name",
  components: {
    Inputcom,
  },
  data() {
    return {
      isActive: true,
      clickTime: 0,
      templateList: [],
      copyTemplate: [],
    };
  },
  methods: {
    close() {
      this.$store.state.isAddHtml = false;
    },
    no() {},
    change(n) {
      this.isActive = !this.isActive;
      if (n > 1) {
        this.templateList = this.$store.state.myTemplateList;
      } else {
        this.templateList = [];
      }
    },
    select(i) {
      this.copyTemplate = common.deepClone(
        this.$store.state.myTemplateList[i].templateList
      );
    },
    use() {
      if (this.$store.state.pageList.length < 10) {
        let len = 0;
        this.$store.state.pageList.forEach((el) => {
          if (el.pageName.substring(0, 3) == "新页面") {
            len = el.pageName.substring(3, el.pageName.length);
          }
        });
        if (len === 0) {
          len = 1;
        } else {
          len = parseInt(len) + 1;
        }
        const obj = common.deepClone(this.$store.state.pageData);
        this.$store.state.pageList.forEach((el) => {
          el.isActive = false;
          el.showSet = false;
          el.isPageSet = false;
        });
        obj.pageName = "新页面" + len;
        obj.pageId = this.$store.state.pageList.length + 1;
        obj.isHome = false;
        obj.isActive = true;
        obj.readonly = true;
        obj.showSet = false;
        obj.isSystem = false; //isSystem
        obj.isPageSet = true;
        obj.copyTime = 0;
        obj.comId = 0;
        obj.nowCommponent = null;
        obj.addCommponent = null;
        obj.templateList = this.copyTemplate;
        this.$store.state.pageList.push(obj);
        this.$store.state.pageIndex = this.$store.state.pageList.length - 1;
        this.$store.state.pageList[
          this.$store.state.pageIndex
        ].comId = this.$store.state.pageList.length;
        this.$store.state.curTemplateList.forEach((item) => {
          item.isDisabled = false;
        });
      } else {
        alert("最多10个");
      }
      this.close();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.add-html {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: $index5;
  background: rgba($color: #000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .close {
    text-align: center;
    position: absolute;
    top: 0;
    line-height: 60px;
    width: 30px;
    right: 10px;
    cursor: pointer;
    i {
      color: #d8d8d8;
      font-size: 20px;
    }
  }
  .content {
    position: relative;
    background: #ffffff;
    padding: 47px 37px 20px 37px;
    box-shadow: 0 2px 19px 0 #b3b3b3;
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    .top {
      border-bottom: 1px solid #eee;
      line-height: 55px;
      font-size: 18px;
      font-weight: 600;
      width: 646px;
      text-align: left;
      display: flex;
      flex-direction: row;
      div {
        margin-right: 30px;
        color: $fontColor3;
        font-weight: normal;
        cursor: pointer;
      }
      .active {
        color: $fontColor1;
        font-weight: 600;
      }
    }
    .bot {
      padding-top: 20px;
      display: flex;
      .left,
      .right {
        flex: 1;
        height: 500px;
      }
      .left {
        border-right: 1px solid #eee;
      }
      .right {
        h2 {
          padding-top: 15px;
          font-weight: 600;
        }
        img {
          height: 320px;
          width: 210px;
          display: block;
          background: #f2f3f4;
          transform: translateX(30%);
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .btn {
          font-weight: 600;
          height: 40px;
          line-height: 40px;
          width: 180px;
          background: $baseColor1;
          transform: translateX(43%);
          cursor: pointer;
        }
      }
    }
  }
  .left-con {
    height: 445px;
    width: 290px;
    padding-top: 20px;
    overflow: hidden;
    position: relative;
    li {
      float: left;
      width: 88px;
      height: 120px;
      text-align: center;
      line-height: 120px;
      background: #f2f3f4;
      margin-right: 6px;
      margin-bottom: 10px;
      i.iconfont {
        color: #d8d8d8;
        font-size: 25px;
      }
    }
    .no {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 300px;
      background: #fff;
      color: $fontColor3;
    }
  }
}
</style>
