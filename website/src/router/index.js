import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import fans from '@/components/fans'
import register from '@/components/register'
import fileList from '@/components/fileList'
import fileUpload from '@/components/fileUpload'
import discussionList from '@/components/discussionList'
import upDownHistory from '@/components/upDownHistory'
import login from "@/components/login"
import login2 from "@/components/login2"
import authentication from "@/components/authentication"
import contest from "@/components/contest"
import informationModify from "@/components/informationModify"
import passwordChange from '@/components/passwordChange'
import accountChange from '@/components/accountChange'
import headshotChange from '@/components/headshotChange'
import postDetail from '@/components/postDetail'
import forgetPassword from '@/components/forgetPassword'
import test from '@/components/test'
import cookies from 'vue-cookies';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/discussionList',
      name: 'discussionList',
      component: discussionList
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login2',
      name: 'login2',
      component: login2
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/fileList',
      name: 'fileList',
      component: fileList
    },
    {
      path: '/informationModify',
      name: 'informationModify',
      component: informationModify
    },
    {
      path: "/passwordChange",
      name: "passwordChange",
      component: passwordChange
    },
    {
      path: "/accountChange",
      name: "accountChange",
      component: accountChange
    },
    {
      path: "/headshotChange",
      name: "headshotChange",
      component: headshotChange
    },
    {
      path: "/postDetail",
      name: "postDetail",
      component: postDetail
    },
    {
      path: '/test',
      name: "test",
      component: test
    },{
      path: "/forgetPassword",
      name: "forgetPassword",
      component: forgetPassword,
      meta: {
        requireAuth: true 
     }
    }
  ]
});

//挂载路由导航守卫,控制页面访问权限
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
      let accessToken = cookies.get("Authorization");
      if (accessToken && accessToken !== -1) { // vuex.state判断token是否存在
          next() // 已登录
      } else {
          next({
              path: '/login',
              query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  } else {
     next()
  }

  
})

export default router;