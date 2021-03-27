/* 全局导出pageTools */
import pageTools from './pageTools'
import uploadExcel from './UploadExcel'
export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('uploadExcel', uploadExcel)
  }
}
