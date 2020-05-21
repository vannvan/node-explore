<template>
  <div class="tiny-chat-self-info">
    <div class="head-img">
      <img src="@/assets/images/headImg.jpg" alt />
    </div>
    <div class="user-name">vannvan</div>
    <p class="other-info">啊啊啊啊</p>
    <div
      class="sign-info"
    >It’s better to be alone than to be with someone you’re not happy to be with.</div>
  </div>
</template>

<style lang="scss">
.tiny-chat-self-info {
  //   background: #f00;
  text-align: center;
  width: pxTorem(750px);
  .head-img {
    @include wh(280px, 280px);
    margin: pxTorem(100px) auto pxTorem(50px) auto;
    img {
      width: 100%;
      border-radius: pxTorem(140px);
    }
  }
  .user-name {
    font-size: pxTorem(45px);
    font-weight: bold;
  }
  .other-info {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sign-info {
    width: pxTorem(350px);
    margin: pxTorem(30px) auto;
    line-height: pxTorem(50px);
    text-align: center;
  }
}
</style>