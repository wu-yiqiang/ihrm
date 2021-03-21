import {getToken,setToken,removeToken,setTimeStamp} from '@/utils/auth'
import { login } from '@/api/user'
import {getUserInfo, getUserDetailById} from '@/api/user.js'
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
  async login(context,data) {
    // use login interface
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp() // 设置当前时间戳
  },
  /* 获取用户信息 */
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseinfo = await getUserDetailById(result.userId)
    const baseResult = {...result,...baseinfo}
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  /* 退出登录 */
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}
export default {
  namesapced: true,
  state,
  mutations,
  actions
}