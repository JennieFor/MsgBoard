import { createRouter,createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:'/wall?id=0',
      name:'index',
      component:()=>import('../views/HomeIndex.vue'),
      children:[
        {
          path:'wall',
          component:()=>import('../views/WallMessage.vue'),
        }
      ]
    }
  ]
})
export default router
