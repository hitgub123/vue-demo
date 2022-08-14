import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'

import api from './api/index'
import { createI18n } from 'vue-i18n'
import {messages} from '../lang/vue-lang'
import ElementPlus from 'element-plus'

import installElementPlus from './plugins/element'
import VueCookies from 'vue-cookies'


// const session = require('express-session'); 
// const session_opt = {
//   secret: 'secret',
//   cookie: {maxAge: 60 * 60 * 1000}
// };


const i18n = createI18n({
    locale: 'ja', // set locale/
    messages, // set locale messages)
})

const app = createApp(App)
app.config.globalProperties.$api=api;
app.config.globalProperties.$cookies = VueCookies;
installElementPlus(app)
// app.use(session(session_opt));

app.use(i18n)
app.use(ElementPlus)
app.use(store).use(router).mount('#app')
