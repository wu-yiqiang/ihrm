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
          <el-table-column label="聘用形式" sortable="" align="center" prop="formOfEmployment" :formatter="fomatEmployment"/>
          <el-table-column label="部门" sortable="" align="center" prop="departmentName"/>
          <el-table-column label="入职时间" sortable="" align="center" >
            <template slot-scope="scoped">
              {{scoped.row.timeOfEntry | formatDate}}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" align="center" prop="enableState">
            <template slot-scope="scoped">
              <el-switch :value="scoped.row.enableState === 1" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280" align="center">
            <template slot-scope="scoped">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(scoped.row.id)">删除</el-button>
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
import {getEmployeesLists,deleteEmployee} from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
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
    },
    /* 格式化聘用字段 */
    fomatEmployment(row,column,cellValue,index) {
      const obj = EmployeeEnum.hireType.find(item => item.id == cellValue)
      return obj ? obj.value : '未知'
    },
    /* 删除员工 */
    deleteEmployee(id) {
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await deleteEmployee(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getEmployeesLists()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    }
  }
}
</script>

<style>

</style>