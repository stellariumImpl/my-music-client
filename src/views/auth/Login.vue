<template>
  <div class="login-container">
    <a-card title="登录" :bordered="false" class="login-card">
      <a-form
        :model="formState"
        name="login"
        @finish="onFinish"
        autocomplete="off"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>

        <div class="form-footer">
          <router-link to="/register">还没有账号？立即注册</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import {getUserInfo, login} from '@/api/user';

const router = useRouter();
const userStore = useUserStore();

const formState = reactive({
  username: '',
  password: ''
});

const onFinish = async (values: any) => {
  try {
    const res = await login(values)
    userStore.setToken(res.data)

    // 获取用户信息
    const userInfo = await getUserInfo() // 需要实现这个API
    userStore.setUser(userInfo.data)

    message.success('登录成功')
    router.push('/') // 登录成功后跳转到首页
  } catch (error: any) {
    message.error(error.message || '登录失败')
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;

  .login-card {
    width: 400px;
  }

  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>