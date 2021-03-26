<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :show-before="true">
        <template v-slot:before>
          <span slot='before'>总共{{page.total}}条记录</span>
        </template>

        <template v-slot:after>
          <el-button size="middle" type="success">导入</el-button>
          <el-button size="middle" type="danger">导出</el-button>
          <el-button size="middle" type="primary">新增员工</el-button>
        </template>
      </pageTools>
      <!-- 放置表格组件 -->
      <el-card>
        <el-table border v-loading="loding" :data=list>
          <el-table-column type="index" label="序号" sortable="" align="center"/>
          <el-table-column label="姓名" sortable="" align="center" prop="username"/>
          <el-table-column label="工号" sortable="" align="center" prop="id"/>
          <el-table-column label="聘用形式" sortable="" align="center" prop="formOfEmployment"/>
          <el-table-column label="部门" sortable="" align="center" prop="departmentName"/>
          <el-table-column label="入职时间" sortable="" align="center" prop="timeOfEntry"/>
          <el-table-column label="账户状态" sortable="" align="center" prop="enableState"/>
          <el-table-column label="操作" sortable="" fixed="right" width="280" align="center">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.size" :current-page="page.page" @current-change="changePage"/>
        </el-row>
        <!-- /分页组件 -->
      </el-card>
      <!-- 放置表格组件 -->
    </div>
  </div>
</template>

<script>
import {getEmployeesLists} from '@/api/employees'
export default {
  data() {
    return {
      page:{
        page:1,
        size:10,
        total:0,
      },
      loding: false,
      list :[]
    }
  },
  created() {
    this.getEmployeesLists()
  },
  methods: {
    async getEmployeesLists() {
      this.loding = true
      const {total,rows} = await getEmployeesLists(this.page)
      this.list = rows
      this.page.total = total
      this.loding = false
    },
    /* 分页操作 */
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeesLists()
    }
  }
}
</script>

<style>

</style>