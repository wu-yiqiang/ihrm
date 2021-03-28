import request from "@/utils/request";

/* 获取员工简单列表 */
export const getEmployeesList = () => {
  return request({
    method: "GET",
    url: "/sys/user/simple"
  });
};
/* 获取员工复杂列表 */
export const getEmployeesLists = params => {
  return request({
    method: "GET",
    url: "/sys/user",
    params
  });
};

/* 删除员工 */
export const deleteEmployee = id => {
  return request({
    method: "DELETE",
    url: `/sys/user/${id}`
  });
};

/* 新增员工 */
export const addEmployee = data => {
  return request({
    method: "POST",
    url: "/sys/user/",
    data
  });
};

/* 导入员工 */
export const importEmployee = data => {
  return request({
    method: "POST",
    url: "/sys/user/batch",
    data
  });
};

/* 保存员工详情 */
export const saveUserDatailById = data => {
  return request({
    method: "PUT",
    url: `/sys/user/${data.id}`,
    data
  });
};

/** *
 * 读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  });
}
/** *
 * 更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: "PUT",
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  });
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: "put",
    data
  });
}
