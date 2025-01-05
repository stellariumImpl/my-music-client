export interface UserInfo {
  id: number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string
  email?: string
  phone?: string
}