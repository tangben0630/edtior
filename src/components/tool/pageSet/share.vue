<template>
  <div class="base">
    <component
      v-for="item in setData.setStyleList"
      :key="item.id"
      :is="item.name"
      :setData="setData"
      :item="item"
    ></component>
  </div>
</template>
<script>
export default {
  name: "share",
  components: {
    Itemtitle: () => import("@public/global/itemtitle"),
  },
  data() {
    return {};
  },
  computed: {
    setData(){
      let i = this.$store.state.pageList[this.$store.state.pageIndex].setting.currentIndex;
      return this.$store.state.pageList[this.$store.state.pageIndex]
        .isPageSet
        ? this.$store.state.pageList[this.$store.state.pageIndex].setting.list[i].setData
        : { setStyleList: [] };
    },
  },
  methods: {},
  mounted() {
  },
};
</script>
<style lang="scss" scoped></style>
