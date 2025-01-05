<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header-content">
        <div class="logo">
          <router-link to="/">My Music</router-link>
        </div>
        <div class="right">
          <template v-if="userStore.token">
            <a-dropdown>
              <a class="ant-dropdown-link">
                <a-avatar :size="32" class="avatar">
                  {{ userStore.user?.username?.charAt(0)?.toUpperCase() }}
                </a-avatar>
                <span class="username">{{ userStore.user?.username }}</span>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <router-link to="/user/profile">
                      <UserOutlined /> 个人中心
                    </router-link>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout" @click="handleLogout">
                    <LogoutOutlined /> 退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <template v-else>
            <router-link to="/login">
              <a-button type="primary">登录</a-button>
            </router-link>
          </template>
        </div>
      </div>
    </a-layout-header>

    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      My Music ©2025
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  message.success('退出成功')
  router.push('/login')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.logo a {
  color: white;
  text-decoration: none;
}

.right {
  display: flex;
  align-items: center;
}

.ant-dropdown-link {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}

.avatar {
  background: #1890ff;
  margin-right: 8px;
}

.username {
  margin-left: 8px;
  color: white;
}
</style>