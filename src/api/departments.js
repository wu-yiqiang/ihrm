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