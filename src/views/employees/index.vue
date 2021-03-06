<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :show-before="true">
        <template v-slot:before>
          <span slot='before'>总共{{page.total}}条记录</span>
        </template>

        <template v-slot:after>
          <el-button size="middle" type="success" @click="$router.push('/import')">导入</el-button>
          <el-button size="middle" type="danger" @click="exportDate">导出</el-button>
          <el-button size="middle" type="primary" @click="showDialog = true">新增员工</el-button>
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
              <el-button type="text" size="small" @click="to(scoped.row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(scoped.row.id)">角色</el-button>
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
    <!-- 放置弹层 -->
    <addEmployee :showDialog.sync="showDialog"></addEmployee>
    <!-- /放置弹层 -->
    <!-- 角色分配 -->
    <AssignRole :showRoleDialog.sync="showRoleDialog" :user-id="UserId" ref="assignRef"></AssignRole>
    <!-- /角色分配 -->
  </div>
</template>

<script>
import {getEmployeesLists,deleteEmployee} from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from "./components/add-employee"
import { formatDate, formatTime } from '@/filters'
import AssignRole from './components/assign-role'
export default {
  data() {
    return {
      page:{
        page:1,
        size:10,
        total:0,
      },
      loding: false,
      list :[],
      showDialog: false,
      showRoleDialog : false,
      UserId: null
    }
  },
  components: {
    addEmployee,
    AssignRole
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
    },
    /* 导出员工数据 */
    exportDate () {
      import("@/vendor/Export2Excel").then(async excel => {
        const {rows} = await getEmployeesLists({page:1,size: this.page.total})

        var headers = {
          '手机号': 'mobile',
          '姓名': 'username',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        const data = this.formatJson(headers,rows)
        excel.export_json_to_excel({  
          header: Object.keys(headers),
          data: data,
          filename:'员工工资表'
        })
      })
    },
    /* 格式化数据 */
    formatJson(headers,rows) {
      return rows.map(item => {
        return Object.keys(headers).map( key => {
          if (headers[key] && (headers[key] == 'timeOfEntry' || headers[key] == 'correctionTime')) {
            return formatDate(item[headers[key]])
          } else if (headers[key] == 'formOfEmployment') {
            const flag = EmployeeEnum.hireType.find(obj => {
              return obj.id == item[headers[key]]
            })
            return flag? flag.value : '未知'
          } 
          return item[headers[key]]
        })
      })
    },
    /* 路由跳转 */
    to (id) {
      this.$router.push(`/employees/detail/${id}`)
    },
    /* 角色分配 */
    async editRole (id) {
      this.UserId = id
      await this.$refs.assignRef.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style>

</style>