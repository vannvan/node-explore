import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: '/Chating'
    },
    {
      path: '/Layout',
      component: resolve => require(['@/components/common/Layout'], resolve),
      children: [{
          path: '/ChatRecent',
          component: resolve => require(['@/pages/ChatRecent.vue'], resolve),
        },
        {
          path: '/Chating',
          component: resolve => require(['@/pages/Chating.vue'], resolve),
        },
        {
          path: '/Friend',
          component: resolve => require(['@/pages/Friend.vue'], resolve),
        },
        {
          path: '/SelfInfo',
          component: resolve => require(['@/pages/SelfInfo.vue'], resolve),
        },
      ]
    },
    {
      path: '/Login',
      component: resolve => require(['@/pages/Login.vue'], resolve),
    },
    {
      path: '/Register',
      component: resolve => require(['@/pages/Register.vue'], resolve),
    },


  ]
})
