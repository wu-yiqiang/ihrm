const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,  // 用户id
  staffPhoto: state => state.user.userInfo.staffPhoto, // 员工头像快捷访问方式
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username, // 建立对用户名的快捷访问
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
