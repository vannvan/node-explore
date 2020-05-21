<template>
  <div class="tiny-chat-common-header">
    <div class="action-item back" @click="$router.go(-1)">
      <i class="iconfont arrow-left"></i>
    </div>
    <div class="action-item info">啊啊哈</div>
    <div class="action-item action">
      <i class="iconfont elipsis-h"></i>
    </div>
  </div>
</template>
<style lang="scss">
.tiny-chat-common-header {
  height: pxTorem(80px);
  width: 100%;
  //   border-bottom: 1px solid #f00;
  background: #76dbd1;
  position: fixed;
  display: flex;
  top: 0;
  align-items: center;
  padding: 0 pxTorem(45px);
  box-sizing: border-box;
  color: #fff;
  .action-item {
    display: block;
    &.back {
      flex: 0 0 pxTorem(80px);
      text-align: left;
      font-size: pxTorem(30px);
    }
    &.info {
      flex: 1;
      text-align: center;
      white-space: nowrap;
      
    }
    &.action {
      flex: 0 0 pxTorem(80px);
      font-size: pxTorem(30px);
      text-align: right;
    }
  }
}
</style>