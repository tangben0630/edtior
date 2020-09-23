<template>
  <div class="loading-wrap"
    v-if="$store.state.globalloadingFlag"
    v-loading="$store.state.globalloadingFlag"
    :element-loading-text="$store.state.globalloadingMsg"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  ></div>
</template>
<style scoped lang="scss">
  .loading-wrap{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 999999
  }
</style>

