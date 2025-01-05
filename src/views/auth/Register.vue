<template>
  <div class="register-container">
    <a-card title="注册" :bordered="false" class="register-card">
      <a-form
        :model="formState"
        name="register"
        @finish="onFinish"
        :rules="rules"
        autocomplete="off"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password v-model:value="formState.confirmPassword">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formState.phone">
            <template #prefix>
              <PhoneOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email">
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>

        <div class="form-footer">
          <router-link to="/login">已有账号？立即登录</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/user';

const router = useRouter();

const formState = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名至少4个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: async (rule: any, value: string) => {
        if (value !== formState.password) {
          throw new Error('两次输入的密码不一致');
        }
      }
    }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
};

const onFinish = async (values: any) => {
  try {
    if (!values.phone && !values.email) {
      message.error('手机号和邮箱至少填写一个');
      return;
    }
    await register(values);
    message.success('注册成功');
    router.push('/login');
  } catch (error: any) {
    message.error(error.message || '注册失败');
  }
};
</script>

<style scoped lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;

  .register-card {
    width: 400px;
  }

  .form-footer {
    text-align: center;
    margin-top: 16px;
  }
}
</style>