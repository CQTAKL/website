import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import fans from '@/components/fans'
import register from '@/components/register'
import fileList from '@/components/fileList'
import discussionList from '@/components/discussionList'
import upDownHistory from '@/components/upDownHistory'
import login from "@/components/login"
import contest from "@/components/contest"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'contest',
      component: contest
    }
  ]
})
