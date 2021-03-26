import request from '@/utils/request'

/* 获取公司角色信息 */
export function  getRoleList(params){
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

/* 获取公司详情 */
export function  getCompanyInfo(companyId){
  return request({
    method: 'GET',
    url: `/company/${companyId}`,
  })
}
/* 删除角色 */
export function  deleteRole(id){
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`,
  })
}
/* 读取角色详情 */
export function  getRoleDetail(id){
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

/* 更新角色 */
export function updateRole(date){
  return request({  
    method: 'PUT',
    url: `/sys/role/${date.id}`,
    date
  })
}

/* 新增角色 */
export function addRole(date){
  return request({  
    method: 'POST',
    url: '/sys/role',
    date
  })
}