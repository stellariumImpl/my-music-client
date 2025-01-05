// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getUserInfo } from '@/api/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/user/profile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/auth/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const userStore = useUserStore()

  if (token) {
    // 有 token 但没有用户信息时，获取用户信息
    if (!userStore.user) {
      try {
        const response = await getUserInfo()
        userStore.setUser(response.data)
      } catch (error) {
        // 获取用户信息失败，可能是 token 过期
        userStore.logout()
        next('/login')
        return
      }
    }
  }

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router