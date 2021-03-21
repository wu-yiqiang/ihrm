<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 头部-->
      <el-card class="tree-card">
        <tree-tools :treeNode="company" :is-root="true"></tree-tools>
        <!-- 树形组件 -->
        <el-tree :data="departs" :props="defaultProps"  :default-expand-all="true">
         <TreeTools slot-scope="{data}"  :treeNode="data" @delDepts="getDepartments"></TreeTools>
        </el-tree>
        <!-- /树形组件 -->
      </el-card>
      <!-- /组织架构 -->
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils/index.js'
export default {
  data() {
    return {
      company:{},
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  components: {
    TreeTools
  },
  created() {
    this.getDepartments()
  },
  methods: {
    /* 获取公司部门名称 */
    async getDepartments() {
      const result = await getDepartments()
      this.company = {name: result.companyName,manager: '负责人'}
      this.departs = tranListToTreeData(result.depts, "")
    },
  
  }
}
</script>

<style >
.tree-card {
  padding: 30px 40px;

}
</style>