import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import type { Breadcrumb } from '@/tools/types'
import { useBreadcrumbStore } from '@/stores/breadcrumb'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首页',
      },
      component: HomeView,
      redirect: '/flow',
      children: [
        {
          path: '/flow',
          name: 'flow',
          meta: {
            title: '流程管理',
          },
          redirect: '/flow/list',
          children: [
            {
              path: '/flow/list',
              name: 'flow-list',
              meta: {
                title: '流程列表',
              },
              component: () => import('../views/FlowView.vue')
            },
            {
              path: '/flow/edit/:id?',
              name: 'flow-edit',
              meta: {
                title: '流程编辑',
              },
              component: () => import('../views/FlowEdit.vue')
            }
          ],
        },
        
      ]
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 清空面包屑路径
  let breadcrumbList: Breadcrumb[] = []
  // 构建面包屑路径
  const buildBreadcrumbPath = (route: any) => {
    if (route.matched && route.matched.length > 0) {
      route.matched.forEach((element: any) => {
        if (route.meta && route.meta.title) {
          breadcrumbList.push({title: element.meta.title, path: element.path})
        }
      })
    }
  }

  buildBreadcrumbPath(to)

  // use store
  const breadcrumbStore = useBreadcrumbStore()
  breadcrumbStore.setBreadcrumbList(breadcrumbList)

  next()
})

export default router
