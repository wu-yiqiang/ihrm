import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  name:'employees',
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon:'people',
      }
    }
  ],
}