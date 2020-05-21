//用户信息
export default {
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, newData) {
      state.userInfo = newData;
    },
  }
}
