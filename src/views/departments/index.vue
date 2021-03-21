<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 头部-->
      <el-card class="tree-card">
        <tree-tools :treeNode="company" :is-root="true"></tree-tools>
        <!-- 树形组件 -->
        <el-tree :data="departs" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true">
         <TreeTools slot-scope="{data}"  :treeNode="data"></TreeTools>
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
export default {
  data() {
    return {
      company:{name:'云擎科技有限公司', manager:'负责人'},
      departs: [
        { name: '总裁办',manager:'刘吉如', children: [{ name: '总经办',manager:'陈忠标' }] },
        { name: '行政部',manager:'邓超凡' }, { name: '开发部',manager:'丰兴旺' }
      ],
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
      this.departs = result.depts
      this.company = {name: result.companyName,manager: '负责人'}
    }
  }
}
</script>

<style >
.tree-card {
  padding: 30px 40px;

}
</style>