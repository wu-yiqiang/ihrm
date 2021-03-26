<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 标签页 -->
        <el-tabs v-model='activeName' >
          <!-- 角色设置 -->
          <el-tab-pane label="角色设置" name="first" >
            <el-row>
              <el-button type="primary" icon="el-icon-plus" size='small' @click="showDialog = true">
                新增角色
              </el-button>
            </el-row>
            <el-table  :data="list">
              <el-table-column  width="120"  type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="name" label="角色名称" width="240" align="center"></el-table-column>    
              <el-table-column prop="description" label="描述" align="center"></el-table-column>    
              <el-table-column label="操作" align="center">
                <template slot-scope="scoped">
                  <el-button type="success" size="mini">分配权限</el-button>
                  <el-button type="primary" size="mini" @click="editRole(scoped.row.id)">编辑</el-button>
                  <el-button type="danger" size="mini" @click="deleteRole(scoped.row.id)">删除</el-button>
                </template>
              </el-table-column>    

            </el-table>
            <!-- 分页组件 -->
            <el-row type='flex' justify="center" style="height:60px">
              <el-pagination layout="prev, pager, next" :total="page.total"  :page-size="page.pagesize" :current-page="page.page" @current-change="handleCurrentChange"></el-pagination>
            </el-row>
            <!-- /分页组件 -->
          </el-tab-pane>
          <!-- 角色设置 -->
          <!-- 公司信息 -->
          <el-tab-pane label="公司信息" name="second">
            <el-alert title="消息提示的文案" type="info"  :closable="false"></el-alert>
            <el-form label-width="120px"  >
              <el-form-item  label="企业名称" style="width:400px" >
                <el-input disabled v-model="formDate.name"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" style="width:400px">
                <el-input disabled v-model="formDate.companyAddress"></el-input>
              </el-form-item>
              <el-form-item label="电话" style="width:400px">
                <el-input disabled v-model="formDate.companyPhone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" style="width:400px">
                <el-input disabled v-model="formDate.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="备注" style="width:400px">
                <el-input disabled v-model="formDate.remarks"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- /公司信息 -->
        </el-tabs>
        <!-- /标签页 -->
      </el-card>
    </div>
    <!-- 放置弹层组件 -->
    <el-dialog :visible='showDialog' title="编辑部门" @close="cancelEdit">
      <el-form label-width="120px" :model="roleForm" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" prop="name" >
          <el-input v-model="roleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
        <el-row type='flex' justify="center">
          <el-col :span="8">
            <el-button size="small" type="info" @click="cancelEdit">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- /放置弹层组件 -->
  </div>
</template>

<script>
import {getRoleList,getCompanyInfo,deleteRole,getRoleDetail,updateRole,addRole} from '@/api/setting'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      list: [],
      page:{
        page:1,
        pagesize:2,
        total:0 // 总数
      },
      activeName: 'first',
      formDate: {
        // 公司信息
      },
      showDialog: false,
      roleForm:{
        name:'',
        description:''
      },
      rules: {
        name:[
          {required:true,message:'角色名称不能为空!',trigger:'blur'},
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },
  methods: {
    async getRolesList() {
      const {total,rows}= await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    /* 分页 */
    handleCurrentChange (newPage) {
      this.page.page = newPage
      this.getRolesList()
    },
    async getCompanyInfo () {
      this.formDate = await getCompanyInfo(this.companyId)
    },
    /* 删除角色 */
    async deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          await deleteRole(id)
          // 重新加载数据
          this.getRolesList()
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })      
        })
    },
    /* 编辑角色 */
    async editRole(id) {

      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    /* 提交表单 */
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        if(this.roleForm.id) {
          /* 编辑 */
          await updateRole(this.roleForm)
        } else {
          // 新增角色
          await addRole(this.roleForm)
        }
        this.getRolesList()
        this.$message.success('角色数据更新成功!')
        this.cancelEdit()
      } catch (error) {
      }
    },
    /* 取消编辑 */
    cancelEdit() {
      this.roleForm ={
        name:'',
        description:''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>
.el-alert{
  margin:20px 0;
}
</style>