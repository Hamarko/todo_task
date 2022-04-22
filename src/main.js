import { createApp } from 'vue'
import { store } from './store/store'
import { router } from './router/router'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
