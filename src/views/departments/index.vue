<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 头部-->
      <el-card class="tree-card">
        <el-row  type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
          <el-col>
            <span> 云擎科技有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <!-- ***下拉菜单*** -->
              <el-col>
                <el-dropdown>
                  <span >
                    操作<i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <!-- ***下拉菜单*** -->
            </el-row>
          </el-col>
        </el-row>
        <!-- 树形组件 -->
        <el-tree :data="departs" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true">
          <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
          <el-col>
            <span>{{data.name}}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>{{data.manager}}</el-col>
              <!-- ***下拉菜单*** -->
              <el-col>
                <el-dropdown>
                  <span >
                    操作<i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <!-- ***下拉菜单*** -->
            </el-row>
          </el-col>
        </el-row>
        </el-tree>
        <!-- /树形组件 -->
      </el-card>
      <!-- /组织架构 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [
        { name: '总裁办',manager:'刘吉如', children: [{ name: '总经办',manager:'陈忠标' }] },
        { name: '行政部',manager:'邓超凡' }, { name: '开发部',manager:'丰兴旺' }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>

<style >
.tree-card {
  padding: 30px 40px;

}
</style>