<template>
  <div class="wrapper">
    <div class="list">
      <li class="item" v-for="(val, i) in currentArr" :key="i">
        <div class="title">
          <span class="text">{{val.positionName}}</span>
          <div class="position" v-if="val.isText">
            <span
              :class="{active: p.position == val.textObj.position}"
              :key="j"
              v-for="(p, j) in positionList"
              @click="changeTextPositon(p, i)"
            >{{p.name}}</span>
          </div>
          <span
            class="hide-text"
            :class="{red: val.isHide}"
            @click="showHide(i)"
          >{{val.displayText}}</span>
        </div>
        <div class="container" v-if="!val.isHide">
          <div class="choose-list">
            <div class="option" :key="j" v-for="(x, j) in val.chooseList" @click="choose(i, j)">
              <p class="choose-icon" :class="{active: x.isActive}"></p>
              <div class="text-box">{{x.name}}</div>
            </div>
          </div>
          <div class="text-content" v-if="val.isText">
            <Titleinput :setData="setData" :item="val.textObj"></Titleinput>
            <div class="space"></div>
            <Doubleselect :setData="setData" :item="val.textObj" setType="headerText"></Doubleselect>
            <div class="space"></div>
            <SetColor :setData="setData" :item="val.textObj.color"></SetColor>
          </div>
          <div class="image-content" v-if="val.isImage">
            <Imagebox :setData="setData" :item="val.imageObj" :setAttr="srcAttr"></Imagebox>
            <Doubleselect :setData="setData" setType="headerImage" :item="val.imageObj"></Doubleselect>
          </div>
          <div class="function-content" v-if="val.isFunction">
            <div class="space"></div>
            <SingleSelect :setData="setData" :item="item.setSelect" :currentIndex="i"></SingleSelect>
            <div class="search-part">
              <Titleinput
                v-if="val.functionObj.name == '搜索框'"
                :setData="setData"
                :item="val.functionObj.search"
                :currentIndex="i"
              ></Titleinput>
              <SetColor
                v-if="val.functionObj.name == '搜索框'"
                :setData="setData"
                :item="val.functionObj.search.color"
              ></SetColor>
              <SetColor
                v-if="val.functionObj.name == '返回'"
                :setData="setData"
                :item="val.functionObj.return.color"
              ></SetColor>
              <div class="space"></div>
              <SingleChoice
                :setData="setData"
                :item="item.setSearchStyle"
                :sets="item.setSearchStyle.sets"
              ></SingleChoice>
              <div class="keywords-set" v-if="val.functionObj.name == '搜索框'">
                <div class="wrap">
                  <span class="name">关键词</span>
                  <input
                    type="text"
                    placeholder="输入关键词回车确认"
                    @keyup.enter="addKeywords($event, i)"
                    class="set-input"
                  />
                </div>
                <ul class="words-list">
                  <li class="words-item" :key="j" v-for="(v, j) in val.functionObj.search.keywords">
                    <p class="text">{{v}}</p>
                    <span class="iconfont iconguanbi delete-icon" @click="deleteKeywords(i, j)"></span>
                  </li>
                </ul>
                <p v-if="showMsg" class="wrong-text">该关键词已存在</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>
<script>
import Titleinput from "@public/setstyle/titleinput";
import SetColor from "@public/setstyle/setcolor";
import Doubleselect from "@public/setstyle/doubleselect";
import Imagebox from "@public/global/imagebox";
import SingleSelect from "@public/global/singleselect";
import SingleChoice from "@public/setstyle/singlechoice";
export default {
  name: "set",
  data() {
    return {
      chooseList: [
        { name: "文本", isActive: true },
        { name: "图片", isActive: false },
        { name: "功能", isActive: false },
      ],
      textList: ["左边位置", "中间位置", "右边位置"],
      positionList: [
        { name: "左", position: "left", isActive: true },
        { name: "中", position: "center", isActive: false },
        { name: "右", position: "right", isActive: false },
      ],
      srcAttr: "src",
      showMsg: false,
    };
  },
  props: {
    setData: {
      type: Object,
    },
    item: {
      type: Object,
    },
  },
  components: {
    Titleinput,
    SetColor,
    Doubleselect,
    Imagebox,
    SingleSelect,
    SingleChoice,
  },
  computed: {
    currentArr() {
      let arr = [];
      if (this.setData.number == 2) {
        arr = this.setData.twoArr;
      } else if (this.setData.number == 3) {
        arr = this.setData.threeArr;
      }
      this.setData.imgArr = arr;
      return this.setData.imgArr;
    },
  },
  mounted() {},
  methods: {
    choose(i, j) {
      this.setData.imgArr[i].chooseList.forEach((item) => {
        item.isActive = false;
      });
      this.setData.imgArr[i].isText = this.setData.imgArr[
        i
      ].isImage = this.setData.imgArr[i].isFunction = false;
      this.setData.imgArr[i].chooseList[j].isActive = true;
      let attr = this.setData.imgArr[i].chooseList[j].attr;
      this.setData.imgArr[i][attr] = true;
    },
    showHide(i) {
      this.setData.imgArr[i].isHide = !this.setData.imgArr[i].isHide;
      this.setData.imgArr[i].displayText = this.setData.imgArr[i].isHide
        ? "显示"
        : "隐藏";
    },
    // 改变文字显示位置
    changeTextPositon(p, i) {
      this.setData.imgArr[i].textObj.position = p.position;
    },
    // 添加关键词
    addKeywords(ev, i) {
      let str = ev.target.value;
      if (str) {
        if (
          this.setData.imgArr[i].functionObj.search.keywords.indexOf(str) == -1
        ) {
          this.setData.imgArr[i].functionObj.search.keywords.push(str);
        } else {
          this.showMsg = true;
          setTimeout(() => {
            this.showMsg = false;
          }, 1000);
        }
        ev.target.value = "";
      }
    },
    // 删除关键词
    deleteKeywords(i, j) {
      this.setData.imgArr[i].functionObj.search.keywords.splice(j, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin-top: 10px;
  .setcolor {
    margin-bottom: 0;
    padding-top: 0;
  }
  .item:hover {
    border: 1px dashed $baseColor1;
  }
  .wrong-text {
    color: #f90220;
  }
  .item {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px dashed $fontColor4;
    .hide-text {
      cursor: default;
    }
    .hide-text.red {
      color: #f90220;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 22px;
      color: $fontColor3;
    }
  }
  .image-content {
    display: flex;
    .link-box {
      align-self: center;
      width: calc(100% - 60px);
    }
  }
  .function-content {
    .name {
      width: 50px;
    }
  }
}
.space {
  margin-bottom: 10px;
}
.position {
  display: flex;
  align-items: center;
  width: 113px;
  height: 20px;
  border: 1px solid #e5e5e5;
  span {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    padding: 0 10px;
    margin: 0 3px;
    color: #333;
    border-radius: 2px;
    cursor: default;
  }
  span.active {
    background: $baseColor1;
  }
}
.choose-list {
  display: flex;
  margin: 10px 0;
  .option {
    display: flex;
    align-items: center;
    cursor: default;
    .text-box {
      width: 47px;
      height: 22px;
      line-height: 22px;
      margin-right: 10px;
      border-radius: 2px;
      border: 1px solid #eaeaea;
      text-align: center;
    }
  }
}
.keywords-set {
  .wrap {
    display: flex;
    align-items: center;
    height: 25px;
    border: 1px solid #e5e5e5;
    .name {
      padding-left: 3px;
      color: $fontColor2;
    }
    input {
      padding-left: 8px;
    }
  }
  .words-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: -10px;
    .words-item {
      position: relative;
      height: 25px;
      margin: 0 0 8px 10px;
      text-align: center;
      color: #7d8694;
      background: #f2f3f4;
      border-radius: 2px;
      cursor: pointer;
    }
    .words-item:hover {
      background: #fdd713;
      color: #0d171b;
      .delete-icon {
        display: block;
      }
    }
    .text {
      padding: 0 5px;
      line-height: 25px;
    }
    .delete-icon {
      display: none;
      top: -6px;
      right: -5px;
      font-size: 13px;
    }
  }
}
</style>