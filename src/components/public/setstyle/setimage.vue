<template>
  <div class="set-image">
    <Imagebox :setData="setData" :item="item"></Imagebox>
    <p class="remark">建议尺寸750x1334px <br>100k内</p>
  </div>
</template>
<script>
import mixins from "@mixin/setMixin";
import Imagebox from "@public/global/imagebox";
export default {
  mixins: [mixins],
  name: 'ImageUpload',
  components: {
    Imagebox
  },
  data() {
    return {
      isDeleteShow: false
    };
  },
  mounted() {
  },
  methods:{
  }
};
</script>
<style lang="scss" scoped>
  .set-image{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
</style>


