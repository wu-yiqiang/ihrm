import {getToken,setToken,removeToken} from '@/utils/auth'
import { login } from '@/api/user'
import {getUserInfo} from '@/api/user.js'
const state = {
  token: getToken(),
  userInfo: {}  // 用户基本信息
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // change cache token
    setToken(token)
  },
  removeToken(state) {
    // remove token
    state.token = null
    removeToken()
  },
  /* 设置用户信息 */
  setUserInfo(state,result) {
    state.userInfo = result
  },
  /* 删除用户信息 */
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // use login interface
    const result = await login(data)
    if (result.data.success) {
      context.commit('setToken',result.data.data)
    }
  },
  /* 获取用户信息 */
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  }
}
export default {
  namesapced: true,
  state: {},
  mutations: {},
  actions:{}
}