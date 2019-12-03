const getters = {
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  userInfo: state => state.user.info,
  token: state => state.user.token,
  userBtn: state => state.user.userBtn,
  has: state => state.permission.has,
  addRouters: state => state.permission.addRouters
}

export default getters
