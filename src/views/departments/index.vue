<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 头部-->
      <el-card class="tree-card">
        <TreeTools :treeNode="company" :is-root="true" @addDept='addDept'></TreeTools>
        <!-- 树形组件 -->
        <el-tree :data="departs" :props="defaultProps"  :default-expand-all="true">
         <TreeTools slot-scope="{data}"  :treeNode="data" @delDepts="getDepartments" @addDept='addDept' @editDept='editDepts'></TreeTools>
        </el-tree>
        <!-- /树形组件 -->
      </el-card>
      <!-- /组织架构 -->
    </div>
     <addDept ref='addDept' :showDialog.sync="showDialog"  :treeNode="node" @addDepts="getDepartments"></addDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils/index.js'
import addDept from './components/add-dept.vue'
export default {
  data() {
    return {
      company:{},
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      node: null
    }
  },
  components: {
    TreeTools,
    addDept
  },
  created() {
    this.getDepartments()
  },
  methods: {
    /* 获取公司部门名称 */
    async getDepartments() {
      const result = await getDepartments()
      this.company = {name: result.companyName,manager: '负责人',id: ''}
      this.departs = tranListToTreeData(result.depts, "")
      // 关闭弹出层
      this.showDialog = false
    },
   /* 添加子部门 */
   addDept (value) {
     this.showDialog = true
     this.node = value
   },
   /* 编辑部门 */
   editDepts (value) {
     this.showDialog = true
     this.node = value
     this.$refs.addDept.getDepartmentsDetail(value.id)
   }
  }
}
</script>

<style >
.tree-card {
  padding: 30px 40px;

}
</style>