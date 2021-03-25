<template>
  <el-dialog :title="showTitle" :visible="showDialog" width="30%" @close="btnCancel">  
    <el-form  label-width="100px" :model="formDate" :rules="rules" ref="deptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formDate.name" placeholder="1-50字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码"  prop="code">
        <el-input v-model="formDate.code" placeholder="1-50字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人"  prop="manager">
        <el-select v-model="formDate.manager" placeholder="请选择" style="width: 100%;" @focus="getEmployeesList">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍"  prop="introduce">
         <el-input type="textarea" v-model="formDate.introduce" placeholder="1-300字符" rows="3"></el-input>
      </el-form-item>
    </el-form>
    <!-- 确定提交 -->
    <el-row type="flex" justify="center" slot='footer'>
      <el-col :span="6">
        <el-button  size="small" @click="btnCancel">取消</el-button>
        <el-button  size="small" type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
    <!-- /确定提交 -->
  </el-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {addDepartments, getDepartments,getDepartmentsDetail} from '@/api/departments.js'
import {getEmployeesList} from '@/api/employees'
export default {
  name: 'addDept',
  components: {},
  model: {}, // 定义属性
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data () {
    const checkNameRepeat =  async(rule,value,callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.filter( element => {
        return element.pid ==this.treeNode.pid
      }).some(item => {
        return item.name == value 
      })
      // console.log('***代码调试中******', isRepeat)
      isRepeat ? callback(new Error(`同级部门下已存在${value}部门`)) : callback()
    }
    const checkCodeRepeat = async (rule,value,callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some( element => {
        return element.code == value && value
      })
      isRepeat ? callback(new Error(`${value}部门编码重复`)) : callback()
    }
    return {
      formDate: {
        name:'',
        code:'',
        manager: '',
        introduce:""
      },
      rules: {
        name: [
          {required:true, message:'部门名称不能为空！',trigger:'blur'},
          {min:1,max:50,message:'长度必须在1-100个字符之间',trigger:'blur'},
          {trigger:'blur',validate:checkNameRepeat}
        ],
        code: [
          {required:true, message:'部门编码不能为空！',trigger:'blur'},
          {min:1,max:50,message:'长度必须在1-100个字符之间',trigger:'blur'},
          {trigger:'blur',validate:checkCodeRepeat}
        ],
        manager: [
          {required:true, message:'部门管理员不能为空！',trigger:'blur'},
        ],
        introduce: [
          {required:true, message:'部门介绍不能为空！',trigger:'blur'},
          {min:1,max:100,message:'长度必须在1-300个字符之间',trigger:'blur'}
        ]
      },
      peoples:[]
    }
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  created () {}, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeMount () {}, // 生命周期 - 挂载之前
  mounted () {}, // 生命周期 - 挂载完成（可以访问DOM元素）
  computed: {
    showTitle() {
      this.formDate.id ? '新增部门' : '编辑部门'
    }
  }, // 计算属性，会监听依赖属性值随之变化
  watch: {}, // 监控data中的数据变化
  methods: {
    /* 获取负责人数据列表 */
    async getEmployeesList() {
      this.peoples = await getEmployeesList()
    },
    /* 全局校验输入框 */
    btnOk() {
      this.$refs.deptForm.validate(async validate => {
        if(validate) {
          await addDepartments({...this.formDate,pid:this.treeNode.id})
          // 清除输入框内容
          this.$emit('update:showDialog',false)
          this.$emit('addDepts')
        }
      })
    },
    btnCancel () {
      this.$refs.deptForm.validateField()
      this.formDate = {
        name:'',
        code:'',
        manager: '',
        introduce:""
      }
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog',false)
    },
    /* 获取当前部门详情 */
    async getDepartmentsDetail(id) {
      this.formDate = await getDepartmentsDetail(id)
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
