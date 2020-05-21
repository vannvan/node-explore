<template>
  <div class="tiny-chat-common-footer">
    <div class="bar-item" v-for="item in barItem" :key="item.link" @click="loadPage(item.link)">
      <p class="icon">
        <i :class="item.icon"></i>
      </p>
      <!-- <p>{{item.name}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barItem: [
        { icon: "iconfont chat", name: "聊天", link: "ChatRecent" },
        { icon: "iconfont friend", name: "通讯录", link: "Friend" },
        { icon: "iconfont self", name: "我的", link: "SelfInfo" }
      ]
    };
  }
};
</script>

<style lang="scss">
.tiny-chat-common-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ededed;
  // background: #57A99A;
  background: #ECF4F3;
  align-items: center;
  .bar-item {
    // height: pxTorem(200px);
    @include hl(50px);
    text-align: center;
    width: 30%;
    padding: pxTorem(20px) 0;
    .icon {
      .iconfont {
        font-size: pxTorem(40px);
      }
    }
  }
}
</style>