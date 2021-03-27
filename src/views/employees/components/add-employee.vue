<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form :model="formData" label-width="120px" :rules="rules" ref="formDataForm">
      <el-form-item label="姓名" prop="username">
        <el-input style="width:50%" placeholder="请输入姓名" v-model="formData.username"/>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input style="width:50%" placeholder="请输入手机号" v-model="formData.mobile"/>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker style="width:50%" placeholder="请选择入职时间" v-model="formData.timeOfEntry"/>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select style="width:50%" placeholder="请选择" v-model="formData.formOfEmployment">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input style="width:50%" placeholder="请输入工号" v-model="formData.workNumber"/>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input style="width:50%" placeholder="请选择部门" v-model="formData.departmentName" @focus="getDepartments"/>
        <el-tree :data="treeDate" :props="{label:'name'}" default-expand-all v-if="showTree" @node-click="select"></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker style="width:50%" placeholder="请选择转正时间" v-model="formData.correctionTime"/>
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import {addEmployee} from '@/api/employees'
export default {
  name: 'addEmployee',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
        formData: {
          username: '',
          mobile: '',
          formOfEmployment: '',
          workNumber: '',
          departmentName: '',
          timeOfEntry: '',
          correctionTime: ''
      },
      treeDate: [],
      rules: {
        username:[
          {required: true,message: '员工名字不能为空!',trigger: 'blur'}
        ],
        mobile: [
          {required: true,message: '联系号码不能为空!',trigger: 'blur'},
          {pattern: /^1[3-9]\d{9}$/,message:'电话号码格式不正确',trigger:'blur'}
        ],
        formOfEmployment: [
          {required: true,message: '聘用方式不能为空!',trigger: 'blur'}
        ],
        workNumber: [
          {required: true,message: '员工工号不能为空!',trigger: 'blur'}
        ],
        departmentName: [
          {required: true,message: '所属部门不能为空!',trigger: 'change'}
        ],
        timeOfEntry: [
          {required: true,message: '入职时间不能为空!',trigger: 'blur'}
        ],
        correctionTime:[
          {required: true,message: '转正时间不能为空!',trigger: 'blur'}
        ]
      },
      showTree: false
    }
  },
  methods: {
     /* 获取组织架构 */
    async getDepartments () {
      const {depts} = await getDepartments()
      this.treeDate = tranListToTreeData(depts,'')
      this.showTree = true
    },
    select (node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    /* 提交表单 */
    btnOk () {
      this.$refs.formDataForm.validate( async (valid) => {
        if (valid) {
          // 提交数据
          await addEmployee(this.formData)
          this.$parent.getEmployeesLists()
          this.btnCan()
        } 
      })
    },
    /* 取消提交 */
    btnCancel () {
      this.$refs.formDataForm.resetFields()
      this.$refs.formDataForm.clearValidate()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
