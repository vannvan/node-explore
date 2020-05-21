<template>
  <div class="chating-list">
    <div class="friend-item" v-for="i in 6">
      <div class="info left">
        <img src="@/assets/images/headImg.jpg" alt />
      </div>
      <div class="info center">
        <p class="user-name">二狗</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="scss">
.chating-list {
  width: pxTorem(750px);
  .friend-item {
    height: pxTorem(100px);
    @include thinBorder(bottom, #ccc);
    display: flex;
    padding: pxTorem(10px);
    box-sizing: border-box;
    align-items: center;
    .info {
      &.left {
        @include wh(90px, 90px);
        padding: pxTorem(10px);
        box-sizing: border-box;
        img {
          @include wh(70px, 70px);
          border-radius: pxTorem(10px);
        }
      }
      &.center {
        flex: 1;
        max-width: pxTorem(500px);
        .message {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &.right {
        @include wh(90px, 90px);
        padding: pxTorem(10px) 0;
        text-align: right;
        box-sizing: border-box;
      }
    }
  }
}
</style>