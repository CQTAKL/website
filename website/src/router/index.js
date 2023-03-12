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
import contest from "@/components/contest"
import informationModify from "@/components/informationModify"
import passwordChange from '@/components/passwordChange'
import accountChange from '@/components/accountChange'
import headshotChange from '@/components/headshotChange'
import test from '@/components/test'
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
      path: '/register',
      name: 'register',
      component: register
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
      path: '/headshotChange',
      name: "headshotChange",
      component: headshotChange
    },
    {
      path: '/test',
      name: "test",
      component: test
    }
  ]
});

//挂载路由导航守卫,控制页面访问权限
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next();
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router;