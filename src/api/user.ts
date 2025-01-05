// src/api/user.ts
import request from '@/utils/request'

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData extends LoginData {
  confirmPassword: string
  phone?: string
  email?: string
}

export function login(data: LoginData) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    headers: {
      Authorization: ''  // 登录请求不需要带 token
    }
  })
}

export function register(data: RegisterData) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户信息
export interface UserUpdateDTO {
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
}

export function updateUserInfo(data: UserUpdateDTO) {
  return request({
    url: '/user/info',  // 修改为正确的后端路径
    method: 'put',
    data
  })
}

// 上传头像
export function uploadAvatar(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const base64String = e.target?.result as string
        // 移除 base64 前缀（如："data:image/jpeg;base64,"）
        const base64Content = base64String.split(',')[1]

        const response = await request({
          url: '/user/avatar',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {
            file: base64Content
          }
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}