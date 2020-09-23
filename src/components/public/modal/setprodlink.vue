<template>
  <!-- 商品列表 -->
  <div class="product-list-modal-part" v-if="isModalShow" @click.stop="closeModal">
    <div class="modal-wrap" :setData="setData">
      <div class="modal-content-wrap" @click.stop>
        <span class="iconfont iconguanbi-copy close-btn" @click.stop="closeModal"></span>
        <ul class="content-title-list">
          <li
            class="item my-product"
            v-if="i == 0"
            :class="{current: item.isActive}"
            v-for="(item, i) in navList"
            @click="showContent(i)"
          >{{item.name}}</li>
        </ul>
        <div class="change-product">
          <div class="detail-content-wrap my-product-wrap" v-if="content[0].isShow">
            <div class="top-content-wrap">
              <!-- 内容切换 -->
              <div class="type-title">
                <p class="product" :class="{current: isProdShow}" @click="changeType(0)">
                  按产品选择
                  <span></span>
                </p>
                <p
                  class="group"
                  v-if="false"
                  :class="{current: !isProdShow}"
                  @click="changeType(1)"
                >
                  按分组选择
                  <span></span>
                </p>
              </div>
              <!-- 操作 -->
              <div class="top-operate-wrap">
                <!-- 搜索 -->
                <div class="search-box">
                  <i class="iconfont iconsousuo1" @click="searchGoods"></i>
                  <input type="text" placeholder="请输入搜索内容" />
                </div>
                <!-- 状态选择 -->
                <div class="status-box">
                  <p class="name">状态</p>
                  <div class="select-part" @mouseleave.stop.prevent="hideOptions">
                    <div class="wrap" @click="showOptions">
                      <input type="text" placeholder="请选择" readonly :value="selectOption1" />
                      <i class="iconfont iconjiantou_liebiaozhankai-copy2"></i>
                    </div>
                    <ul class="list" v-show="isShowOptions">
                      <li
                        class
                        v-for="(item, i) in optionList1"
                        :key="i"
                        @click="chooseOption(0, item)"
                      >{{item}}</li>
                    </ul>
                  </div>
                </div>
                <!-- 添加产品 -->
                <div class="add-product-icon">
                  <a :href="siteURL" target="_blank" class="href">添加产品+</a>
                </div>
              </div>
            </div>
            <div class="change-type">
              <div class="display-product-wrap" v-if="isProdShow">
                <div class="product-content-wrap">
                  <!-- 左边分类选择 -->
                  <div class="left-content-wrap">
                    <!-- 按产品选择 -->
                    <div class="prod-type-content">
                      <!-- 有内容 -->
                      <el-tree
                        :data="typeList"
                        :props="defaultProps"
                        :default-expand-all="true"
                        @node-click="handleNodeClick"
                      ></el-tree>
                      <div class="no-content-wrap">
                        <div class="no-create-group">
                          <div class="wrap"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 右侧 对应内容 -->
                  <div
                    class="right-detail-wrap"
                    v-loading="loadingFlag"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                  >
                    <!-- 内容 -->
                    <div class="related-content-wrap">
                      <div class="product-list-wrap">
                        <div
                          v-if="isContent"
                          class="has-content-wrap infinite-list-wrapper"
                          ref="scrollTopList"
                        >
                          <ul class="list">
                            <li class="p-item list-item" v-for="(item, i) in goodsList" :key="i">
                              <div
                                class="select-icon iconfont"
                                :class="{iconduihao: item.checked}"
                                @click="checkSingel(item, i)"
                              ></div>
                              <div
                                class="image image-contain"
                                :style="{backgroundImage: `url(`+item.goods_imgs[0]+`)`}"
                              ></div>
                              <div class="desc-part">
                                <p class="prod-name">{{item.goods_title}}</p>
                                <div class="status status1" v-if="item.goods_status == 1">已上架</div>
                                <div class="status status2" v-if="item.goods_status == 2">未上架</div>
                                <div class="status status3" v-if="item.goods_status == 3">已下架</div>
                              </div>
                            </li>
                          </ul>
                          <p v-if="pullLoading" class="loading-text">正在更新...</p>
                          <p v-if="noMore" class="nomore-text">没有更多了</p>
                        </div>
                        <div v-else class="no-content-wrap">
                          <div class="no-product-wrap">
                            <div class="image">
                              <img
                                src="//fkzzz.oss-cn-qingdao.aliyuncs.com/tiangong/img/no-content.png"
                                alt
                              />
                            </div>
                            <div class="text">
                              您还没有产品可以选择
                              <br />请选择上面的
                              <span class="prod">公共产品</span> 或 点击下面按钮，立即添加吧～
                            </div>
                            <a class="add-product-btn" :href="siteURL">添加产品+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 分页 -->
                    <!-- 底部 -->
                    <div class="bottom-result-wrap">
                      <div class="select-result">
                        共选中&nbsp;
                        <span class="cnum">{{currentNumber}}</span>&nbsp;个产品
                      </div>
                      <div class="button-wrap">
                        <p class="cancel-btn" @click="cancel">取消</p>
                        <p class="sure-btn" @click="sure">确认</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="display-group-wrap" v-if="!isProdShow">
                <div class="group-content-wrap">
                  <!-- 全选 -->
                  <div class="all-select-part">
                    <input
                      class="select-icon"
                      @click="check($event, 1)"
                      type="checkbox"
                      name="check"
                      id
                    />
                    <div class="name">全选</div>
                    <div class="group-name">分组名称</div>
                    <div class="product-num">商品数量</div>
                  </div>
                  <div class="group-detail-content">
                    <ul class="list">
                      <li class="g-item">
                        <input
                          class="select-icon"
                          @click="check($event)"
                          type="checkbox"
                          name="check"
                          id
                        />
                        <div class="group-name">
                          <div class="name">商品</div>
                        </div>
                        <p class="number">13</p>
                      </li>
                    </ul>
                  </div>
                  <!-- 底部 -->
                  <div class="bottom-result-wrap">
                    <div class="select-result">
                      共选中&nbsp;
                      <span class="cnum">0</span>&nbsp;个产品
                    </div>
                    <div class="button-wrap">
                      <p class="cancel-btn">取消</p>
                      <p class="sure-btn">确认</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-content-wrap public-product-wrap" v-if="content[1].isShow"></div>
          <div class="detail-content-wrap select-product-wrap" v-if="content[2].isShow">
            <div class="top-content-wrap">
              <!-- 内容切换 -->
              <div class="type-title">
                <p class="prod" :class="{current: isProdShow}" @click="changeType(0)">
                  我的产品
                  <span></span>
                </p>
                <p class="group" :class="{current: !isProdShow}" @click="changeType(1)">
                  公共产品
                  <span></span>
                </p>
              </div>
              <!-- 操作 -->
              <div class="top-operate-wrap">
                <!-- 状态选择 -->
                <div class="status-box">
                  <p class="name">模式</p>
                  <div class="select-part" @mouseleave.stop.prevent="hideOptions">
                    <div class="wrap" @click="showOptions">
                      <input type="text" placeholder="请选择" readonly :value="selectOption2" />
                      <i class="iconfont iconjiantou_liebiaozhankai-copy2"></i>
                    </div>
                    <ul class="list" v-show="isShowOptions">
                      <li
                        class
                        v-for="(item, i) in optionList2"
                        @click="chooseOption(1, item)"
                      >{{item}}</li>
                    </ul>
                  </div>
                </div>
                <!-- 搜索 -->
                <div class="search-box">
                  <i class="iconfont iconsousuo1"></i>
                  <input type="text" placeholder="请输入搜索内容" />
                </div>
              </div>
            </div>
            <div class="change-type">
              <div class="display-product-wrap" data-type="product-type" style="display: block">
                <div class="product-content-wrap">
                  <!-- 左边分类选择 -->
                  <div class="left-content-wrap">
                    <!-- 按产品选择 -->
                    <div class="prod-type-content">
                      <!-- 有内容 -->
                      <el-tree :data="data1" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                      <div class="no-content-wrap">
                        <div class="no-create-group">
                          <div class="wrap"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 右侧 对应内容 -->
                  <div class="right-detail-wrap">
                    <!-- 内容 -->
                    <div class="related-content-wrap">
                      <!-- 全选 -->
                      <div class="all-select-part">
                        <input
                          class="select-icon"
                          @click="check($event, 1)"
                          type="checkbox"
                          name="check"
                          id
                        />
                        <div class="name">全选</div>
                        <div class="group-name">
                          筛选出产品(
                          <span class="tnum">61</span>)
                        </div>
                        <span class="iconfont iconjiantou_liebiaozhankai-copy2"></span>
                      </div>
                      <div class="product-list-wrap">
                        <div class="has-content-wrap">
                          <ul class="list">
                            <li class="p-item">
                              <input
                                class="select-icon"
                                @click="check($event)"
                                type="checkbox"
                                name="check"
                                id
                              />
                              <div class="image image-contain"></div>
                              <div class="desc-part">
                                <p class="prod-name">三只松鼠坚果夏威夷果360g/1袋</p>
                                <div class="status status1">已上架</div>
                              </div>
                              <span class="delete-icon iconfont iconguanbi-copy"></span>
                            </li>
                            <p v-if="pullLoading">加载中...</p>
                            <p v-if="noMore">没有更多了</p>
                          </ul>
                        </div>
                        <div class="no-content-wrap">
                          <div class="no-product-wrap">
                            <div class="image">
                              <img src alt />
                            </div>
                            <div class="text">
                              您还没有产品可以选择
                              <br />请选择上面的
                              <span class="prod">公共产品</span> 或 点击下面按钮，立即添加吧～
                            </div>
                            <a class="add-product-btn" href="/console/product/add">添加产品+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 底部 -->
                    <div class="bottom-result-wrap">
                      <div class="select-result">
                        共选中&nbsp;
                        <span class="cnum">0</span>&nbsp;个产品
                      </div>
                      <div class="button-wrap">
                        <p class="cancel-btn">取消</p>
                        <p class="sure-btn">确认</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="display-group-wrap" data-type="group-type" style="display: none">
                <div class="group-content-wrap">
                  <!-- 全选 -->
                  <div class="all-select-part">
                    <input
                      class="select-icon"
                      @click="check($event, 1)"
                      type="checkbox"
                      name="check"
                      id
                    />
                    <div class="name">全选</div>
                    <div class="group-name">分组名称</div>
                    <div class="product-num">商品数量</div>
                  </div>
                  <div class="group-detail-content">
                    <ul class="list">
                      <li class="g-item">
                        <input
                          class="select-icon"
                          @click="check($event)"
                          type="checkbox"
                          name="check"
                          id
                        />
                        <label for></label>
                        <div class="group-name">
                          <div class="name">商品</div>
                        </div>
                        <p class="number">13</p>
                        <span class="delete-icon iconfont iconguanbi-copy"></span>
                      </li>
                    </ul>
                  </div>
                  <!-- 底部 -->
                  <div class="bottom-result-wrap">
                    <div class="select-result">
                      共选中&nbsp;
                      <span class="cnum">0</span>&nbsp;个产品
                    </div>
                    <div class="button-wrap">
                      <p class="cancel-btn">取消</p>
                      <p class="sure-btn">删除</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from "@assets/js/common";
import { setTimeout } from "timers";
export default {
  props: {
    setData: {
      type: Object,
    },
    item: {
      type: Object,
    },
    isModalShow: {
      type: Boolean,
    },
  },
  data() {
    return {
      defaultImage:
        "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp",
      content: [{ isShow: true }, { isShow: false }, { isShow: false }],
      isAllCheck: false,
      isProdShow: true,
      data1: [],
      defaultProps: {
        children: "children",
        label: "category_name",
      },
      isShowOptions: false,
      selectOption1: "全部",
      selectOption2: "",
      navList: [
        { name: "我的产品", isActive: true },
        { name: "公共产品", isActive: false },
        { name: "已选择产品", isActive: false, num: 0 },
      ],
      pageSize: 20,
      pageSize: 20,
      optionList1: ["全部", "已上架", "未上架"],
      optionList2: ["按产品选择", "按分组选择"],
      checkList1: [],
      checkGroup1: [],
      checkList2: [],
      checkGroup2: [],
      typeList: [], // 分类列表
      goodsList: [], // 商品列表
      pullLoading: false, // 上拉加载
      currentPage: 1, // 当前页数
      perLength: 20, // 每次请求的条数
      noMore: false, // 没有更多
      searchValue: "",
      siteURL: "",
      loadingFlag: false,
      currentProdId: "", // 当前选中的产品id
      checkFlag: false, // 点击
    };
  },
  computed: {
    currentNumber() {
      let n = 0;
      let id = this.checkFlag
        ? this.currentProdId
        : this.item.function.productId
        ? this.item.function.productId
        : this.currentProdId;
      this.goodsList.forEach((ele) => {
        if (ele.id == id) {
          ele.checked = true;
          n++;
        }
      });
      return n;
    },
    isContent() {
      return this.goodsList.length > 0;
    },
  },
  mounted() {
    this.getList1();
    this.siteURL = common.siteURL + "/console/product/add";
  },
  updated() {
    if (this.isModalShow) {
      this.$refs.scrollTopList.addEventListener(
        "scroll",
        common.throttle(this.handleScroll, 500),
        true
      );
    }
  },
  methods: {
    // 关闭弹窗
    closeModal() {
      this.$emit("closeModal");
    },
    // 点击导航 切换内容
    showContent(i) {
      this.navList.forEach((element) => {
        element.isActive = false;
      });
      this.navList[i].isActive = true;
      this.content.forEach((element) => {
        element.isShow = false;
      });
      this.content[i].isShow = true;
      this.isProdShow = true;
    },
    // 切换展示类型
    changeType(i) {
      if (i == 0) {
        this.isProdShow = true;
      } else {
        this.isProdShow = false;
      }
    },
    checkSingel(item, i) {
      this.checkFlag = true;
      let arr = [];
      this.goodsList.forEach((ele, j) => {
        if (i != j) {
          ele.checked = false;
        }
        arr.push(ele);
      });
      arr[i].checked = !arr[i].checked;
      this.goodsList = arr;
      if (arr[i].checked) {
        this.currentProdId = arr[i].id;
      }
      this.currentProdId = arr[i].checked ? arr[i].id : "";
    },
    // 鼠标移入显示选择项目
    showOptions() {
      this.isShowOptions = true;
    },
    // 鼠标移出 隐藏
    hideOptions() {
      this.isShowOptions = false;
    },
    // 点击选择
    async chooseOption(n, val) {
      switch (n) {
        case 0:
          this.selectOption1 = val;
          this.goodsList = await this.getGoods();
          break;
        case 1:
          this.selectOption2 = val;
          break;
        default:
          break;
      }
      this.isShowOptions = false;
    },
    // 树形菜单操作
    async handleNodeClick(data) {
      this.currentPage = 1;
      this.goodsList = await this.getGoods(data);
    },
    async handleScroll() {
      let scrollTop = this.$refs.scrollTopList.scrollTop,
        clientHeight = this.$refs.scrollTopList.clientHeight,
        scrollHeight = this.$refs.scrollTopList.scrollHeight,
        height = 0;
      if (scrollTop + clientHeight >= scrollHeight - height) {
        if (this.noMore) {
          return false;
        } else {
          if (!this.pullLoading) {
            await this.pullLoad();
          }
        }
      } else {
        return false;
      }
    },
    async pullLoad() {
      this.pullLoading = true;
      if (this.noMore) return;
      this.currentPage++;
      let arr = await this.getGoods();
      setTimeout(() => {
        if (arr.length < 20) {
          this.noMore = true;
        }
        arr.forEach((item) => {
          this.goodsList.push(item);
        });
        this.pullLoading = false;
      }, 1500);
    },
    async getGoods(data) {
      this.loadingFlag = true;
      let param = data ? "&id=" + data.id : "";
      if (data) {
        param = data.id == 1 ? "" : "&id=" + data.id;
      }
      let status = "";
      switch (this.selectOption1) {
        case "可上架":
          status = 1;
          break;
        case "未上架":
          status = 2;
          break;

        default:
          break;
      }
      let str = window.location.href;
      let pid;
      let parr = str.split("?")[1].split("&");
      parr.forEach((el) => {
        const name = el.split("=")[0];
        if (name == "site_id") {
          pid = el.split("=")[1];
        }
      });
      const res = await this.axios.get(
        "/api/platform/goods/goods/goodsCategory?goods_title=" +
          this.searchValue +
          "&goods_status=" +
          status +
          "&page=" +
          this.currentPage +
          "&length=" +
          this.perLength +
          param +
          "&sites_id=" +
          pid
      );
      let arr = [];
      if (res.status == 1) {
        arr = res.body;
        arr.forEach((ele) => {
          ele.checked = false;
          if (!ele.goods_imgs[0]) {
            ele.goods_imgs[0] = this.defaultImage;
          }
          if (this.item.productId == ele.id) {
            ele.checked = true;
          }
        });
        this.loadingFlag = false;
      } else {
        setTimeout(() => {
          this.loadingFlag = false;
        }, 1000);
      }
      return arr;
    },
    // 获取分类值
    async getList1() {
      const res = await this.axios.get("/api/platform/goods/goods/myGoods");
      if (res.status == 1) {
        let arr = res.message;
        arr.forEach((ele) => {
          ele.category_name = ele.business_name;
          ele.children = ele.child;
        });
        this.typeList = arr;
        this.goodsList = await this.getGoods();
      }
    },
    // 取消
    cancel() {
      this.closeModal();
      this.$store.state.isSetProductLink = false;
    },
    // 点击确定 添加
    sure() {
      var myDate = new Date();
      if (!this.currentNumber) {
        if (!this.item.function.productId) {
          common.dealResult(this, 2, "请选择商品");
        } else {
          this.item.function.productId = "";
          this.item.function.productName = "";
          this.closeModal();
          this.$store.state.currentSelectedProduct = myDate.getTime();
        }
        return;
      }
      this.goodsList.forEach((ele) => {
        if (this.currentProdId == ele.id) {
          ele.checked = true;
          this.item.function.productId = ele.id;
          this.item.function.productName = ele.goods_title;
          this.item.function.production = true;
          this.$store.state.currentSelectedProduct = myDate.getTime();
        }
      });
      this.closeModal();
    },

    // 搜索
    async searchGoods() {
      this.currentPage = "";
      this.perLength = "";
      this.goodsList = await this.getGoods();
    },
  },
};
</script>
<style lang="scss" scoped>
/* 展区 添加产品弹窗
===================================================================================*/
.product-list-modal-part {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.34);
  z-index: $index5;
  a {
    text-decoration: none;
  }
  input.select-icon {
    background: #ccc;
  }
  .select-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding-top: 2px;
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 12px;
    color: #07d638;
  }
  p.loading-text,
  p.nomore-text {
    color: #666;
    font-size: 13px;
    width: 100%;
    text-align: center;
  }
  .modal-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: scroll;
    ul {
      margin: 0;
      padding: 0;
    }
  }
  .modal-content-wrap {
    position: relative;
    width: 840px;
    height: 680px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 19px 0 #b3b3b3;
    overflow: scroll;
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 22px;
      color: #d8d8d8;
    }
    .collect-icon {
      margin-left: auto;
      margin-right: 10px;
      font-size: 20px;
      color: #999;
    }
    .all-select-part {
      display: flex;
      align-items: center;
      height: 35px;
      padding-left: 10px;
      font-size: 12px;
      background: #fafafa;
      .select-icon {
        margin-right: 5px;
      }
      .name {
        margin-right: 10px;
        color: #435862;
      }
      .group-name {
        font-weight: 500;
        color: #0d171b;
      }
    }
    .no-content-wrap {
      height: auto;
    }
    .bottom-result-wrap {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 35px;
      .select-result {
        font-size: 12px;
        color: #435862;
        .cnum {
          color: #f90220;
        }
      }
      .button-wrap {
        display: flex;
        padding-right: 20px;
        p {
          width: 100px;
          height: 35px;
          line-height: 35px;
          margin-left: 10px;
          text-align: center;
          font-size: 12px;
          border-radius: 2px;
          cursor: pointer;
        }
        .cancel-btn {
          color: #666;
          background: #fff;
          border: 1px solid #e5e5e5;
        }
        .sure-btn {
          color: #0d171b;
          background: #fdd713;
          border: 1px solid #fdd713;
        }
      }
    }
    .content-title-list {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      .item {
        height: 45px;
        line-height: 50px;
        margin-right: 30px;
        font-size: 18px;
        font-weight: 400;
        color: #7d8694;
        cursor: pointer;
        &.current {
          color: #0d171b;
          font-weight: 600;
        }
      }
    }
    .change-product {
      height: calc(100% - 60px);
    }
    .change-type {
      height: calc(100% - 35px);
    }
    .display-product-wrap {
      height: 100%;
    }
    .detail-content-wrap {
      width: 100%;
      height: 100%;
      padding-top: 15px;
      .delete-icon {
        position: absolute;
        top: 0;
        right: 30px;
        font-size: 17px;
        color: #d8d8d8;
      }
      .top-content-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-right: 20px;
        margin-bottom: 5px;
        .type-title {
          display: flex;
          width: 200px;
          p {
            line-height: 20px;
            margin-right: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #7d8694;
            cursor: pointer;
            span {
              display: block;
              width: 40px;
              height: 2px;
              margin-top: 3px;
              background: #fff;
            }
            &.current {
              font-weight: 600;
              color: #0d171b;
              span {
                background: #fdd713;
              }
            }
          }
        }
        .top-operate-wrap {
          display: flex;
          justify-content: space-between;
          margin-left: auto;
          margin-right: 0;
          .search-box {
            display: flex;
            align-items: center;
            width: 210px;
            height: 28px;
            margin-right: 10px;
            padding: 0;
            border: 1px solid #ededed;
            i {
              margin: 0 5px;
              font-size: 16px;
              color: #ccc;
              cursor: pointer;
            }
            input {
              width: 120px;
              border: none;
              padding: 0;
            }
          }
          .status-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 120px;
            height: 28px;
            margin-right: 10px;
            border: 1px solid #e5e5e5;
            .name {
              margin-left: 5px;
              font-size: 12px;
              color: #435862;
            }
            .select-part {
              position: relative;
              width: 80px;
              height: 100%;
              font-size: 12px;
              input {
                width: 80px;
                height: 28px;
                color: #0d171b;
                border: none;
                cursor: pointer;
              }
              i {
                position: absolute;
                top: 3px;
                right: 0;
                color: #999;
                cursor: pointer;
              }
              .list {
                position: absolute;
                top: 29px;
                z-index: 1;
                width: 100%;
                font-size: 12px;
                color: #0d171b;
                background: #fff;
                border-radius: 2px;
                box-shadow: 0px 2px 10px 0px #e0d7d7;
                box-sizing: border-box;
                li {
                  line-height: 25px;
                  padding-left: 3px;
                  cursor: pointer;
                }
                li:hover {
                  background-color: $hoverColor;
                }
              }
            }
          }
          .add-product-icon {
            width: 100px;
            height: 28px;
            line-height: 30px;
            font-size: 12px;
            text-align: center;
            background: #fdd713;
            cursor: pointer;
            a {
              display: block;
              width: 100%;
              height: 100%;
              color: #0d171b;
            }
          }
        }
      }
      .product-content-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        .wrap {
          width: 100%;
        }
        .left-content-wrap {
          width: 240px;
          height: calc(100% - 10px);
          padding-top: 10px;
          overflow-y: scroll;
        }
        .prod-type-content {
          width: 100%;
        }
        .no-content-wrap {
          margin-top: 0;
        }
        .right-detail-wrap {
          position: relative;
          width: calc(100% - 180px);
          padding-left: 20px;
          border-left: 1px solid #e5e5e5;
          .related-content-wrap {
            width: 100%;
            padding: 10px 0 20px;
            .product-list-wrap {
              position: relative;
              width: 100%;
              height: 450px;
              padding: 10px 0 0 10px;
              .has-content-wrap {
                height: 100%;
                overflow: auto;
              }
              .list {
                .p-item {
                  position: relative;
                  display: flex;
                  margin-bottom: 10px;
                  .select-icon {
                    margin-right: 20px;
                  }
                  .image {
                    width: 64px;
                    height: 64px;
                    margin-right: 20px;
                  }
                  .delete-icon {
                    top: 30%;
                  }
                  .desc-part {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .prod-name {
                      font-weight: 500;
                      font-size: 14px;
                      color: #0d171b;
                    }
                    .status {
                      width: 59px;
                      height: 20px;
                      line-height: 20px;
                      font-size: 12px;
                      text-align: center;
                      border-radius: 10px;
                    }
                    .status1 {
                      color: #57c063;
                      background: rgba(68, 215, 182, 0.25);
                    }
                    .status2 {
                      color: #7d8694;
                      background: rgba(200, 205, 208, 0.25);
                    }
                    .status3 {
                      color: #f90220;
                      background: rgba(249, 2, 32, 0.25);
                    }
                  }
                }
              }
            }
            .no-content-wrap {
              width: 100%;
              .no-product-wrap {
                width: 300px;
                margin: 80px auto 0;
                text-align: center;
                .image {
                  width: 255px;
                  height: 155px;
                  margin: 0 auto;
                  margin-bottom: 10px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .text {
                  margin-bottom: 10px;
                  font-size: 12px;
                  color: #7d8694;
                  .prod {
                    text-decoration: underline;
                    color: #0091ff;
                  }
                }
                .add-product-btn {
                  display: block;
                  width: 100px;
                  height: 28px;
                  line-height: 28px;
                  margin: 0 auto;
                  font-size: 12px;
                  color: #fdd713;
                  border-radius: 14px;
                  border: 1px solid #fdd713;
                }
              }
            }
          }
        }
      }
      .group-content-wrap {
        position: relative;
        width: 100%;
        padding-top: 10px;
        .all-select-part {
          padding-left: 20px;
          .group-name {
            margin-left: 20px;
          }
          .product-num {
            margin-left: auto;
            margin-right: 80px;
            font-weight: 500;
            color: #0d171b;
          }
        }
        .group-detail-content {
          padding: 15px 0 15px 20px;
          min-height: 450px;
          .list {
            width: 100%;
            .g-item {
              position: relative;
              display: flex;
              align-items: center;
              width: 100%;
              margin-bottom: 15px;
              font-size: 12px;
              .group-name {
                color: #0d171b;
              }
              .number {
                width: 50px;
                margin-left: auto;
                margin-right: 80px;
                font-size: 12px;
                text-align: center;
              }
              .delete-icon {
                top: -8px;
              }
            }
          }
        }
      }
    }
    .select-product-wrap {
      .top-content-wrap {
        .top-operate-wrap {
          .status-box {
            width: 140px;
            .select-part {
              width: 100px;
              input {
                width: 100px;
              }
            }
          }
          .search-box {
            margin-right: 0;
          }
        }
      }
    }
  }
  .loading-wrap {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    .loading-icon {
      width: 14px;
      height: 14px;
    }
  }
  .page-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $baseColor1;
    }
  }
}
</style>