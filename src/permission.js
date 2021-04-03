import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // import The progress bar
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach( async (from, to, next) => {
  nprogress.start() // start The progress bar
  if (store.getters.token) {
    if (to.path == 'login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('getUserInfo')
        //筛选用户可用路由
        const routes = await store.dispatch('permission/filterRouter', roles.menus)
        router.addRoutes(routes)
        console.log('***调试中*******', routes)
        next(to.path)
      }
      next()
    }
  } else {
    // turn to login page or 404 page
    if (whiteList.indexOf(to.path)  -1) {
      next()
    } else {    
      next()
    }
  }
  nprogress.done()
})
router.afterEach((from, to, next) => {
  nprogress.done() // the progress is done 
})