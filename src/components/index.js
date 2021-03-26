/* 全局导出pageTools */
import pageTools from './pageTools'
export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
  }
}