<template>
  <div class="profile-container">
    <a-card title="个人中心" :bordered="false" class="profile-card">
      <a-form
        :model="formState"
        name="profile"
        @finish="onFinish"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="头像">
          <a-upload
            name="avatar"
            list-type="picture-card"
            :show-upload-list="false"
            :beforeUpload="beforeUpload"
            :customRequest="customUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <plus-outlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item label="用户名">
          <a-input v-model:value="formState.username" disabled />
        </a-form-item>

        <a-form-item label="昵称" name="nickname">
          <a-input v-model:value="formState.nickname" />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" html-type="submit">保存修改</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { getUserInfo, updateUserInfo } from '@/api/user'
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { Upload } from 'ant-design-vue'
import type { RcFile } from 'ant-design-vue/es/vc-upload/interface'
import request from '@/utils/request'

const userStore = useUserStore()

const imageUrl = ref<string>('')
const formState = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
})

// 监听 userStore.user 的变化
watch(
  () => userStore.user,
  (newUser) => {
    if (newUser) {
      formState.username = newUser.username || ''
      formState.nickname = newUser.nickname || ''
      formState.email = newUser.email || ''
      formState.phone = newUser.phone || ''
      imageUrl.value = newUser.avatar || ''
    }
  },
  { immediate: true }
)

// 上传前检查
const beforeUpload = (file: RcFile) => {
  console.log('beforeUpload triggered', file)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的图片!')
    return Upload.LIST_IGNORE
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
    return Upload.LIST_IGNORE
  }
  return true
}

// 自定义上传方法
const customUpload = async (options: UploadRequestOption) => {
  console.log('customUpload triggered', options)
  const { file, onSuccess, onError } = options

  try {
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)

    reader.onload = async () => {
      try {
        console.log('File read complete')
        const base64Data = reader.result as string
        const formData = new FormData()
        formData.append('file', base64Data)

        const response = await request({
          url: '/user/avatar',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })

        console.log('Upload response:', response)
        if (response.code === 200) {
          imageUrl.value = response.data
          message.success('头像上传成功')
          onSuccess?.(response)
        } else {
          throw new Error(response.message || '上传失败')
        }
      } catch (error) {
        console.error('Upload error:', error)
        message.error('上传失败')
        onError?.(error as Error)
      }
    }

    reader.onerror = (error) => {
      console.error('File reading error:', error)
      message.error('文件读取失败')
      onError?.(error as Error)
    }
  } catch (error) {
    console.error('Upload preparation error:', error)
    message.error('上传准备失败')
    onError?.(error as Error)
  }
}

// 提交表单
const onFinish = async (values: any) => {
  try {
    console.log('提交表单数据:', values)
    // 更新用户信息
    const updatedInfo = { ...formState, avatar: imageUrl.value }
    console.log('准备发送的更新数据:', updatedInfo)

    const response = await updateUserInfo(updatedInfo)
    console.log('更新响应:', response)
    message.success('保存成功')
  } catch (error) {
    console.error('保存失败:', error)
    message.error('保存失败')
  }
}

// 页面加载时获取用户信息
onMounted(async () => {
  try {
    console.log('开始获取用户信息')
    const response = await getUserInfo()
    console.log('获取到的用户信息:', response)
    userStore.setUser(response.data)
  } catch (error) {
    console.error('获取用户信息失败:', error)
    message.error('获取用户信息失败')
  }
})
</script>

<style scoped>
.profile-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
}

.profile-card {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.ant-upload-select-picture-card) {
  width: 128px;
  height: 128px;
  margin-bottom: 0;
}

:deep(.ant-upload-select-picture-card img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>