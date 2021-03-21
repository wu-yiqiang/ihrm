import request from '@/utils/request'

/* 获取公司部门 */
export function getDepartments() {
  return request({
    method: 'GET',
    url:'/company/department'
  })
}