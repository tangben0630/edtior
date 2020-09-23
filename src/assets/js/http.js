import axios from 'axios'
import qs from 'qs'
import store from '../../store/index'
import common from '@assets/js/common'

const href = window.location.href;
const agreement = location.protocol;
let siteURL
if (href.includes('test')) {
  siteURL = agreement + '//test.api.zhihuokeji.com'
} else {
  if (href.includes('localhost')) {
    siteURL = agreement + '//test.api.zhihuokeji.com'
  } else {
    siteURL = agreement + '//api.tgsaas.com'
  }
}

// const token = common.getCookie('admin_token');

// 创建axios请求实例
const request = axios.create({
  baseURL: siteURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.adminToken = common.getCookie('admin_token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 只返回数据
  // if (response.data.status == -1) {  // 登陆过期
  //   store.state.globalLoading = 2;
  //   store.state.globalMessage = response.data.message
  //   setTimeout(() => {
  //     common.goToLogin();
  //     store.state.globalLoading = false;
  //   }, store.state.globalTime)
  // } else if (response.data.status == 0) {  // 正常

  // }
  return response.data
}, function (error) {
  const status = error.response.status;
  store.state.globalLoading = 2;
  if (status >= 500) {
    store.state.globalMessage = '服务繁忙请稍后再试';
  } else if (status >= 400) {
    store.state.globalMessage = 'error.response.data.message';
  } else {}
  setTimeout(() => {
    store.state.globalLoading = false;
  }, store.state.globalTime)
  // 对响应错误做点什么
  return Promise.reject(error)
})

const get = (url, data) => request.get(url, {
  params: data
})

const post = (url, data, config) => request.post(url, JSON.stringify(data), config)

const put = (url, data, config) => request.put(url, JSON.stringify(data), config)

export default {
  get,
  post,
  put
}