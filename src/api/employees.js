import request from '@/utils/request'

/* 获取员工简单列表 */
export const getEmployeesList = () => {
  return request({
    method: 'GET',
    url:'/sys/user/simple'
  })
}
/* 获取员工复杂列表 */
export const getEmployeesLists = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}

/* 删除员工 */
export const deleteEmployee = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}

/* 新增员工 */
export const addEmployee = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user/',
    data
  })
}