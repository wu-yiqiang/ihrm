import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

/* 获取用户信息接口 */
export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

export function logout() {

}
