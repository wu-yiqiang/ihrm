<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :show-before="true">
        <template v-slot:before>
          <span slot="before">linux</span>
        </template>
        <el-button type="primary" slot="after">导入excel</el-button>
      </pageTools>
    <!-- <component :is="currentRole" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
