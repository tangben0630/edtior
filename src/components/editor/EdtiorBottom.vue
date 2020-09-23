<template>
  <div
    class="edtior-bot filtered"
    :style="{
      paddingBottom: this.$store.state.pageList[this.$store.state.pageIndex]
        .isGlobalNav
        ? paddingBottom
        : 0,
    }"
  >
    <nav>
      <ul>
        <li>
          网站首页
          <span>|</span>
        </li>
        <li>
          全部宝贝
          <span>|</span>
        </li>
        <li>
          个人中心
        </li>
      </ul>
    </nav>
    <div class="bot-title">
      炙火天工
    </div>
    <div class="bot-bot">
      炙火科技提供技术支持
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      paddingBottom: "55px",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.edtior-bot {
  width: 100%;
  height: 100px;
  text-align: center;
  user-select: none;
  nav {
    ul {
      padding: 10px 55px;
      display: flex;
      li {
        flex: 1;
        line-height: 20px;
        color: #666;
        position: relative;
        span {
          position: absolute;
          width: 1px;
          right: 0;
          top: 0;
          color: #eee;
        }
      }
    }
  }
  .bot-title {
    color: #999;
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 16px;
    text-align: center;
  }
  .bot-bot {
    color: #999;
    font-size: 12px;
    padding-bottom: 5px;
  }
}
</style>
