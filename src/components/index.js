/* 全局导出pageTools */
import pageTools from './pageTools'
import uploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('uploadExcel', uploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
  }
}
