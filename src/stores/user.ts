import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user',
  () => {
    // 从 localStorage 初始化用户信息
    const storedUser = localStorage.getItem('userInfo')
    const user = ref<UserInfo | null>(storedUser ? JSON.parse(storedUser) : null)
    const token = ref<string | null>(localStorage.getItem('token'))

    const setToken = (newToken: string) => {
      token.value = newToken
      localStorage.setItem('token', newToken)
    }

    const setUser = (userInfo: UserInfo) => {
      user.value = userInfo
      // 同时保存到 localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    const logout = () => {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }

    return {
      user,
      token,
      setToken,
      setUser,
      logout,
    }
  },
  {
    persist: true
  }
)