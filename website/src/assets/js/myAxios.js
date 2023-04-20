import axios from 'axios';
import router from '@/router/index';
import cookies from 'vue-cookies';
import {clearPending, removePending, addPending} from "./pending.js";
// const qs = require('qs');


// 1.创建axios服务
const service = axios.create({
  baseURL: '/api',
  timeout: 6000, // 请求超时时间
  responseType: 'json',
  transformRequest: [data => JSON.stringify(data)], // 允许在向服务器发送前，修改请求数据
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
})
 
// 2.创建请求拦截器
service.interceptors.request.use(
  config => {
    // 请求携带token
    let accessToken = cookies.get("Authorization");
    let captchaOwner = cookies.get("captchaOwner");
    if(accessToken) {
        config.headers['Authorization'] = accessToken;
    }else{
      config.headers['Authorization'] = -1;
    }
    if(captchaOwner){
      config.headers['captchaOwner'] = accessToken;
    }else{
      config.headers['captchaOwner'] = -1;
    }
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    return config
  },
  err => {
    //请求是出错是抛出的错误
    return Promise.reject(err)
  }
)
 
// 2.创建响应拦截器
service.interceptors.response.use(
  response => {
    removePending(response); // 在请求结束后，移除本次请求
    console.log(response);
    const res = response.data;
    return res;
    // switch(res.code){
    //     // 正常返回
    //     case "200":
    //       return res;
    //     // 未登录 跳转
    //     case "401":
    //       router.replace({
    //         path: '/login',
    //         //登录成功后跳入浏览的当前页面
    //         query: {redirect: router.currentRoute.fullPath}
    //       });
    //       break;
    //     default:
    //       console.log("其他状态码");
    //       return res;
    //       break;
    // }
  },
  err => {
    console.log(err);
    if(axios.isCancel(err)){
      console.log('repeated request: ' + err.message);
    }
  return Promise.reject(err);
  }
)
 
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
      service({
          url: url,
          method: "get",
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
          method: "post",
          data: params,
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

