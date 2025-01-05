// utils/request.ts
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',           // 与 vite 代理配置一致
  timeout: 5000,
  withCredentials: true,      // 允许携带认证信息
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // 检查这里的格式是否与后端匹配
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
// request.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     message.error(error.response?.data?.message || '请求失败');
//     if (error.response?.status === 401) {
//       const router = useRouter();
//       localStorage.removeItem('token');
//       router.push('/login');
//     }
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    message.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
);

export default request;