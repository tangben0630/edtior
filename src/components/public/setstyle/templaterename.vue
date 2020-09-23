<template>
  <div class="box">
    <span class="name">模块名称</span>
    <input type="text" ref="input" :value="setReName" maxlength="12" @keyup="keyup($event)" />
    <span class="limit">{{curLen > 12 ? 12 : curLen}}/12</span>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
export default {
  name: "templateReName",
  mixins: [mixins],
  data() {
    return {
      name: "",
      curName: "",
      id: 0,
      curLen: 0
    };
  },
  methods: {
    keyup(e) {
      let str = e.target.value;
      let len = str.length;
      e.target.value = this.setData[this.item.attr] =
        len > 12 ? str.substring(0, this.item.max) : str;
      this.curName = e.target.value;
      this.$store.state.pageList[
        this.$store.state.pageIndex
      ].templateList.forEach(el => {
        if (el.id == this.id) {
          el.reName = e.target.value;
        }
      });
    }
  },
  computed: {
    setReName() {
      const id = this.$store.state.pageList[this.$store.state.pageIndex]
        .nowCommponent.id;
      this.id = id;
      let m = this.$store.state.pageList[this.$store.state.pageIndex].nowCommponent.setTitle;
      let reName = "";
      if(m == "全局导航" || m == "头部设置"){
        reName = m == "全局导航" ? "全局导航": "头部";
        this.curLen = reName.length;
      }else{
        [{ reName }] = this.$store.state.pageList[
          this.$store.state.pageIndex
        ].templateList.filter(item => item.id == id);
        this.curLen = reName.length;
      }
      return reName;
    }
  },
  mounted() {
    let m = this.$store.state.pageList[this.$store.state.pageIndex].nowCommponent.setTitle;
    if(m == "全局导航" || m == "头部设置"){
      this.$refs.input.setAttribute('readonly', true)
    }else{
      this.$refs.input.removeAttribute('readonly')
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $fontColor2;
  height: 30px;
  padding: 0 5px;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
}
.limit {
  color: $fontColor4;
}
input {
  height: 30px;
  text-indent: 10px;
  width: 150px;
  line-height: 30px;
}
</style>