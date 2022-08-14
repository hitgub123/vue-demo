import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const session=require('express-session')
const app=createApp(App)

app.use(session)
app.use(store).use(router).mount('#app')
