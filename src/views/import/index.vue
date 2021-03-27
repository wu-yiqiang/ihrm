<template>
 <uploadExcel :on-success="success"></uploadExcel>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {importEmployee} from '@/api/employees'
export default {
  name: '',
  components: {},
  model: {}, // 定义属性
  props: {},
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
    async success({header,results}) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号':'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      var newArr = results.map(element => {
        var userInfo = {}
        Object.keys(element).forEach( key => {
          if ( userRelations[key] == 'timeOfEntry' || userRelations[key] == 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.format(element[key],'/'))
          } else {
            userInfo[userRelations[key]] = element[key] 
          }
        })
        return userInfo
      });
      await importEmployee(newArr)
      this.$message.success('员工名单导入成功!')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
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
