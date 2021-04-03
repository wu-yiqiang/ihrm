<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </pageTools>
      <!-- 表格 -->
      <el-table :data="list" row-key="id">
        <el-table-column label="菜单名称" align="center" prop="name">
        </el-table-column>

        <el-table-column label="权限标识" align="center" prop="code">
        </el-table-column>

        <el-table-column label="描述" align="center" prop="description">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scoped">
            <el-button type="text" @click="addPermission(2,scoped.row.id)" v-if="scoped.row.type === 1">添加</el-button>
            <el-button type="text" @click="editPerssion(scoped.row.id)">编辑</el-button>
            <el-button type="text" @click="btnDelete(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->

      <!-- 新增编辑弹层 -->
      <el-dialog :title="`${titleText}权限点`" :visible="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- /新增编辑弹层 -->
    </div>
  </div>
</template>

<script>
import {getPermissionList,addPermission,updatePermission,delPermission,getPermissionDetail} from '@/api/permission'
import {tranListToTreeData} from '@/utils/index'
export default {
  data() {
    return {
      list:[],
      showDialog: false, // 弹层控制
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name:[
          {required: true, message:'名字不能为空！', trigger: 'blur'}
        ],
        code:[
          {required: true, message:'标识不能为空！', trigger: 'blur'}
        ],
      },
      perData:[],
      defaultProps: {}
    }
  },
  created(){
    this.getPermissionList()
  },
  computed: {
    titleText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(),0)
    },
    /* 删除权限 */
    btnDelete (id) {
       this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await delPermission(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取数据
          await this.getPermissionList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    /* 添加权限 */
    addPermission (type,id) {
      // 访问权限 type = 1 按钮操作权限 type = 2
      this.formData.pid = id
      this.formData.type = type
      this.showDialog = true
    },
    /* 提交数据 */
    btnOK () {
      this.$refs.perForm.validate(async isOk => {
        if(isOk) {
          // 提交数据
          if(this.formData.id) {
            // 编辑
            console.log('***编辑调试中****this.formData***',this.formData)
            await updatePermission(this.formData)
            this.$message.success('权限修改成功！')
          } else {
            //  添加
            console.log('***添加调试中****this.formData***',this.formData)
            await addPermission(this.formData)
            this.$message.success('权限添加成功！')
          }
          // 重新获取数据
          await this.getPermissionList()
          this.btnCancel()
        }
      })
    },
    /* 编辑权限 */
    async editPerssion (id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    /* 取消弹框 */
    btnCancel () {
      // 表单重置
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // this.$refs.perForm.resetFields()
      // 移除表单校验规则
      this.$refs.perForm.clearValidate()
      this.showDialog = false
    }
  },
  
}
</script>

<style>

</style>