<template>
  <div class="base">
    <component
      v-for="item in setData.setHighList"
      :key="item.id"
      :is="item.name"
      :setData="setData"
      :item="item"
    ></component>
  </div>
</template>
<script>
export default {
  name: "component_name",
  components: {
    SetText: () => import("@public/setstyle/textinput"),
    SetFontSize: () => import("@public/setstyle/fontsize"),
    SetColor: () => import("@public/setstyle/setcolor"),
    SetTextAlign: () => import("@public/setstyle/fontsize"),
    SetPadding: () => import("@public/setstyle/inputpx")
  },
  data() {
    return {};
  },
  computed: {
    setData: {
      get() {
        return this.$store.state.pageList[this.$store.state.pageIndex]
          .nowCommponent
          ? this.$store.state.pageList[this.$store.state.pageIndex]
              .nowCommponent
          : { setHighList: [] };
      }
    }
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped></style>
