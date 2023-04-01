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
  timeout: 60000, // 请求超时时间
  responseType: 'json',
  transformRequest: [data => qs.stringify(data)], // 允许在向服务器发送前，修改请求数据
  headers: {
        "conten-type": "application/x-www-form-urlencoded;charset=utf-8" 
  }
})
 
// 2.创建请求拦截器
service.interceptors.request.use(
  config => {
    // 请求携带token
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken && accessToken !== "") {
        config.headers['Authorization'] = accessToken;
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
    // 如果能正确接收到来自服务器的响应说明不是网络问题而是来自后端的设定反馈
    if(err && err.response){
      // 清除token
      localStorage.removeItem('accessToken');
      router.replace({
          path: '/login',
          //登录成功后跳入浏览的当前页面
          query: {redirect: router.currentRoute.fullPath}
      })
      switch(err.response.status){
          case 400:
              err.message = "错误请求";
              break;
          case 401:
              err.message = "未授权，请重新登录";
              break;
          case 403:
              err.message = "拒绝访问";
              break;
          case 404:
              err.message = "请求错误，未找到该资源";
              break;
          case 405:
              err.message = "请求方法未允许";
              break;
          case 408:
              err.message = "请求超时";
              break;
          case 500:
              err.message = "服务器出错";
              break;
          default:
              err.message = `未知错误${err.response.status}`;
      }
  }else{
      err.message = "连接到服务器失败";
  }
  return Promise.reject(err);
  }
)
 
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
      service({
          url: url,
          methods: "get",
          params: params
      }).then(response => {
          resolve(response);
      }).catch(err => {
          reject(err);
      });
  });
};

export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
      service({
          url: url,
          methods: "post",
          data: params
      }).then(response => {
          resolve(response);
      }).catch(err => {
          reject(err);
      });
  });
};

export function fileUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
      service({
          url: url,
          method: "post",
          data: params,
          headers: {"content-type": "multipart/form-data"}
      }).then(response => {
          resolve(response);
      }).catch(err => {
          reject(err);
      });
  });
}

export default {
  get,
  post,
  fileUpload
}

