<template>
  <div>
    <Header></Header>
    <div class="tiny-chat-common-content">
      <router-view></router-view>
    </div>
    <FooterBar v-show="!isChating"></FooterBar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChating: false
    };
  },
  watch: {
    "$route.path": {
      handler(newV) {
        this.isChating = newV == "/Chating";
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tiny-chat-common-content {
  width: pxTorem(750px);
  height: calc(100vh - 2rem);
  position: fixed;
  top: pxTorem(80px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
