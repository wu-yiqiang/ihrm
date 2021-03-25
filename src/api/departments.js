import request from '@/utils/request'

/* 获取公司部门 */
export function getDepartments() {
  return request({
    method: 'GET',
    url:'/company/department'
  })
}
/* 删除组织架构 */
export function deleteDepartments(id) {
  return request({
    method: 'DELETE',
    url:`/company/department/${id}`
  })
}
/* 添加组织架构 */
export function addDepartments(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}

/* 编辑组织架构 */
export function getDepartmentsDetail(id) {
  return request({
    method: 'GET',
    url:`/company/department/${id}`
  })
}

/* 保存编辑的数据 */
export function updateDepartments(date) {
  return request({
    method: 'PUT',
    url:`/company/department/${data.id}`
  })
}