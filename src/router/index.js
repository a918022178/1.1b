import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import '../../node_modules/mint-ui/lib/style.min.css'
import wx from 'weixin-js-sdk'
// 相当于 import HelloWorld from '@/components/HelloWorld' 引入 可以分批次打包 优化浏览体验
const Manage = (resolve) => {
import ('../components/manage/manage.vue').then((module) => {
    resolve(module)
  })
}

const Identity = (resolve) => {
  import('../components/identity/identity.vue').then((module) => {
    resolve(module)
  })
}

const IdentifyNum = (resolve) => {
  import('../components/identity/identifyNum.vue').then((module) => {
    resolve(module)
  })
}

const VerifyFail = (resolve) => {
  import('../components/verify/verifyFail.vue').then((module) => {
    resolve(module)
  })
}

const VerifySucc = (resolve) => {
  import('../components/verify/verifySucc.vue').then((module) => {
    resolve(module)
  })
}

const NotFound = (resolve) => {
  import('../components/notfound.vue').then((module) => {
    resolve(module)
  })
}



Vue.use(Router)
Vue.use(VueResource)
Vue.use(Mint)

import {pscroll,apiUrl,GetRequest,linkUrl,getCookie,setCookie,setCookie1} from "../common/js/common.js";
export default new Router({
  //消除链接后面的 http://localhost:8080/#/
  // mode:'history',
  // base:'/merchant/',
  routes: [
    {
      path: '/',
      name: 'Identity',
      component: Identity
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/identifyNum',
      name: 'IdentifyNum',
      component: IdentifyNum,
    },
    {
      path: '/verifySucc',
      name: 'VerifySucc',
      component: VerifySucc
    },
    {
      path: '/verifyFail',
      name: 'VerifyFail',
      component: VerifyFail
    },
    // {
    //   path: '*',
    //   component: NotFound
    // }

  ]
})
