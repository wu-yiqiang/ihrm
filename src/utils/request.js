import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import {getTimeStamp} from '@/utils/auth'
const TimeOut = 3600 // 设置超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})
/* 请求拦截器 */
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    if (checkTimeOut()) {
      store.dispatch('logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
/* 响应拦截器 */
service.interceptors.response.use((response)  => {
  const { success, data, message } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
 } 
}, (error) => {
  if ( error.response && error.response.date && error.response.date.code == 10002) {
    // 服务器返回错误码，token超时
    // 删除token
    store.dispatch('logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

/* 检查token是否超时 */
function checkTimeOut(params) {
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut 
}
export default service 