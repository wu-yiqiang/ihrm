import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // import The progress bar
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach((from, to, next) => {
  nprogress.start() // start The progress bar
  if (store.getters.token) {
    if (from.path == 'login') {
      next('/')
    } else {
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