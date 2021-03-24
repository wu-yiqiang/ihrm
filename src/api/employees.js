import request from '@/utils/request'

/* 获取员工简单列表 */
export const getEmployeesList = () => {
  return request({
    method: 'GET',
    url:'/sys/user/simple'
  })
}