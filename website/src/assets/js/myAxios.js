import axios from 'axios'
import router from '@/router/index'

// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const pending = [] 
const CancelToken = axios.CancelToken
const removePending = (config) => {
  for (const p in pending) {
    // 当前请求在数组中存在时执行函数体
    if (pending[p].u === config.url + '&' + config.method) { 
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}
 
// 1.创建axios服务
const service = axios.create({
  baseURL: '',
  timeout: 60000 // 请求超时时间
})
 
// 2.创建请求拦截器
service.interceptors.request.use(
  config => {
    // 请求头携带token
    if (this.$cookies.get('token')) {
      config.headers['X-Token'] = getToken()
    }
    // 处理同一请求被重复执行取消前一次请求
    if (!config.data || !config.data.allowedRepeat) {
      removePending(config) // 在一个ajax发送前执行一下取消操作
      config.cancelToken = new CancelToken((c) => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push(
                { 
                  u: config.url + '&' + config.method, 
                  f: c 
                }
              )
      })
    } else {
      delete config.data.allowedRepeat
    }
    return config
  },
  error => {
    //请求是出错是抛出的错误
    return Promise.reject(error)
  }
)
 
// 2.创建响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      // 请求成功但返回的数据出错
      return res
    } else {
    // 请求成功，返回数据成功
      removePending(response.config)
      return res
    }
  },
  error => {
    // 请求失败，响应的status不是200，对各种非200状态码的处理
    const response = error.response
    if (response !== undefined) {
      if (response.status === 401) {
        store.dispatch('user/resetToken').then(() => {
          router.push({
            path: '/limits',
            query: {
              redirect: location.hostname
            }
          })
        })
        return
      } else if (response.status === 404) {
        Message({
          message: '页面未找到',
          type: 'error',
          duration: 2000
        })
      } else if (response.status === 403) {
        store.dispatch('user/resetToken').then(() => {
          router.push({
            path: '/limits',
            query: {
              redirect: location.hostname
            }
          })
        })
        return
      } else if (response.status === 400) {
        Message({
          message: '错误的请求',
          type: 'error',
          duration: 2000
        })
      } else if (response.status === 500) {
        Message({
          message: '服务器错误',
          type: 'error',
          duration: 2000
        })
      } else {
        Message({
          message: '网络错误，请稍后再试……',
          type: 'error',
          duration: 2000
        })
      }
    }else{
      return {}
    }
    return Promise.reject(error)
  }
)
 
export default service