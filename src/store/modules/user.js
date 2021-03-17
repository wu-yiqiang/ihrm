import {getToken,setToken,removeToken} from '@/utils/auth'
import {login} from '@/api/user'
const state = {
  token: getToken()
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
  }
}
const actions = {
  async login(context, data) {
    // use login interface
    const result = await login(data)
    if (result.data.success) {
      context.commit('setToken',result.data.data)
    }
  }
}
export default {
  namesapced: true,
  state: {},
  mutations: {},
  actions:{}
}