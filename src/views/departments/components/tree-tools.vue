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
          <el-dropdown>
            <span >
              操作<i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
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
  methods: {}, // 方法集合
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
</style>
