import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layoutC from '../views/layout/layout.vue'
import loginC from '../views/login/login.vue'

import homeC from '../components/level2/home.vue'
import adsC from '../components/level2/ads.vue'
import goodsC from '../components/level2/goods.vue'
import ordersC from '../components/level2/orders.vue'
import paramsC from '../components/level2/params.vue'
import diyC from '../components/level2/diy.vue'

import orderlistC from '../components/level2/orders/orderlist.vue'
import ordercancelC from '../components/level2/orders/ordercancel.vue'

import diymangaC from '../components/level2/diy/diymanga.vue'
import diymusicC from '../components/level2/diy/diymusic.vue'

import goodsAddOrUpdateC from '../components/level2/goods/goodsAddOrUpdate.vue'

//verifyToken(token)在这用不了，在express服务器里可以使用
import { verifyToken } from "../../server/security/token";
import jwt_decode from "jwt-decode";
import cookie from '../utils/cookie'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo',
    meta: {
      needlogin: true,
    },
    component: layoutC,
    children: [
      {
        path: '',
        name: 'home',
        component: homeC,
      },
      {
        path: 'goods',
        name: 'goods',

        component: goodsC,
      },
      {
        path: 'goods/addOrUpdate',
        name: 'goodsAddOrUpdate',
        component: goodsAddOrUpdateC,
      },
      {
        path: 'ads',
        name: 'ads',
        component: adsC,
      },
      {
        path: 'orders',
        name: 'orders',
        component: ordersC,
        redirect: '/demo/orders/orderlist',
        children: [
          {
            path: 'orderlist',
            name: 'orderlist',
            component: orderlistC,
          },
          {
            path: 'ordercancel',
            name: 'ordercancel',
            component: ordercancelC,
          },
        ]
      },
      {
        path: 'params',
        name: 'params',
        component: paramsC,
      },
      {
        path: 'diy',
        name: 'diy',
        component: diyC,
        children: [
          {
            // path: '/demo/diy/diymanga',
            path: 'diymanga',
            name: 'diymanga',
            component: diymangaC,
          },
          {
            path: 'diymusic',
            name: 'diymusic',
            component: diymusicC,
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loginC,
    meta: {
      needlogin: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const count=sessionStorage.getItem('count')||'0'
  sessionStorage.setItem('count',1+parseInt(count)+'')
  const count2=localStorage.getItem('count')||'0'
  localStorage.setItem('count',2+parseInt(count2)+'')

  console.log('to', to.matched)
  console.log('sessionStorage',sessionStorage.getItem('count'))
  console.log('localStorage',localStorage.getItem('count'))

  if (to.matched.length == 0) {
    console.log(1)
    next()
    return
  }
  if (to.matched.some(ele => ele.meta.needlogin)) {
    const token: string = cookie.get("token") || '';
    const tokenobj: any =token?jwt_decode(token): {}
    console.log('>>cookie token>>',token, tokenobj)
    if (tokenobj['user']) {
      console.log(2)
      next()
    } else {
      console.log(3)
      next('/login')
    }
  } else {
    console.log(4)
    cookie.set({'a':'1','b':'3'},1)
    cookie.clear('aaa')
    next()
  }

})
export default router
