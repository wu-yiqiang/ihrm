<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo" :rules="rules" ref='userInfo'>
              <el-form-item label="姓名:" prop="username">
                <el-input style="width:300px" v-model="userInfo.username"/>
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input style="width:300px" type="password" v-model="userInfo.password2"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 个人详情 -->
          <el-tab-pane label="个人详情" >
            <component :is='userInfoCom' />
          </el-tab-pane>
          <!-- /个人详情 -->
          <!-- 岗位信息 -->
          <el-tab-pane label="岗位信息" >
            <component :is='jobInfoCom' />
          </el-tab-pane>
          <!-- /岗位信息 -->
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {getUserDetailById} from '@/api/user'
import {saveUserDatailById} from '@/api/employees.js'
import userInfoCom from './components/user-info'
import jobInfoCom from './components/job-info'
export default {
  name: '',
  components: {
    userInfoCom,
    jobInfoCom
  },
  // 定义属性
  model: {},
  props: {},
  data () {
    return {
      userInfoCom: 'userInfoCom',
      jobInfoCom: 'jobInfoCom',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          {required: true,message: '用户名不能为空！',trigger:'blur'}
        ],
        password2: [
          {required: true,message: '密码不能为空！',trigger:'blur'},
          {min:6,max:12,message:'密码长度必须在6-12个字符之间!',trigger:'blur'}
        ]
      }
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getUserDetailById () {
      this.userInfo = await getUserDetailById(this.userId)
    },
    /* 更新用户数据 */
    saveUser () {
      this.$refs.userInfo.validate( async isOk => {
        if(isOk) {
          await saveUserDatailById({...this.userInfo,password: this.userInfo.password2})
          this.$message.success('修改信息成功!')
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getUserDetailById()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='less' scoped>
</style>
