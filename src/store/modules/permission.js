import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  router: constantRoutes
}

const mutations = {
  setRouter(state, newRouter) {
   state.routes = [...constantRoutes,...newRouter]
  }
}
const actions = {
  /* 筛选权限路由 */
  filterRouter(context, menus) {
    const routers = []
    menus.forEach(ele => {
      routers.push(...asyncRoutes.filter(item => item.name === ele))
    })
    context.commit('setRouter', routers)
    return routers
  }
}
export default{
  namespaced: true,
  state,
  mutations,
  actions
}