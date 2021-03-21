<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
    <el-col>
      <span>{{treeNode.name}}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{treeNode.manager}}</el-col>
        <!-- ***下拉菜单*** -->
        <el-col>
          <el-dropdown @command="operateDepts">
            <span >
              操作<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <!-- ***下拉菜单*** -->
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {deleteDepartments} from '@/api/departments'
export default {
  name: '',
  components: {},
  model: {}, // 定义属性
  props: {
    treeNode: {
      require: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {}
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  created () {}, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeMount () {}, // 生命周期 - 挂载之前
  mounted () {}, // 生命周期 - 挂载完成（可以访问DOM元素）
  computed: {}, // 计算属性，会监听依赖属性值随之变化
  watch: {}, // 监控data中的数据变化
  methods: {
    operateDepts(type) {
      if(type == 'add') {
        // 添加操作

      } else if(type == 'edit'){
        // 编辑操作
      } else {
        //删除操作
        this.$confirm('此操作将永久删除该组织部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          await deleteDepartments(this.treeNode.id)
          this.$emit('delDepts')
          this.$message({
            type: 'success',
            message: '删除组织部门成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除组织部门失败!'
          });          
        });
      }
    }
  }, // 方法集合
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
</style>
