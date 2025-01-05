import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

import {
  Form,
  Input,
  Card,
  Button,
  Upload,
  message
} from 'ant-design-vue'

// 使用新的样式导入路径
import 'ant-design-vue/dist/reset.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(Form)
app.use(Input)
app.use(Card)
app.use(Button)
app.use(Upload)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')