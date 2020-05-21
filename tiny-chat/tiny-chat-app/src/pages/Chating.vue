<template>
  <div class="tiny-chating-content">
    <div class="message-content">aaa</div>
    <div class="input-content">
      <input type="text" v-model.trim="currentMsg" @focus="onFoucs" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentMsg: "aaaass",
      webSocket: null
    };
  },
  created() {
    this.initWebSocket();
  },
  mounted() {
    const u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      //安卓手机
      window.addEventListener("resize", function() {
        // Document 对象的activeElement 属性返回文档中当前获得焦点的元素。
        if (
          document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA"
        ) {
          console.log("安卓触发", document.activeElement.tagName);
          alert('aa')
          window.setTimeout(function() {
            document.activeElement.scrollIntoView(true);
          }, 50);
        }
      });
    }
  },
  methods: {
    onFoucs() {},
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://192.168.31.200:8000";
      this.webSocket = new WebSocket(wsuri);
      this.webSocket.onmessage = this.websocketonmessage;
      this.webSocket.onopen = this.websocketonopen;
      this.webSocket.onerror = this.websocketonerror;
      this.webSocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data) {
      //数据发送
      this.webSocket.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  },
  destroyed() {
    this.webSocket.close(); //离开路由之后断开websocket连接
  }
};
</script>
<style lang="scss">
.tiny-chating-content {
  .message-content {
    height: calc(100vh - 4rem);
    width: 100%;
    background: lightcoral;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .input-content {
    width: pxTorem(750px);
    height: pxTorem(100px);
    position: relative;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc;
    input {
      border: none;
      height: pxTorem(100px);
      width: 80%;
    }
  }
}
</style>