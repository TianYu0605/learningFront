//@ts-nocheck
import axios from 'axios';
import { message } from 'antd';
import { baseURL } from '../utils/configUrl';

//创建axios实例
const Request = axios.create({
  baseURL,
  timeout: 20000
})

//request拦截器
Request.interceptors.request.use(
  (config: any) => {
    let url = config.url.replace(config.baseURL, '');
    let code = config.code;
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return config
  },
  error => {
    Promise.reject(error)
  }
)

//response拦截器
Request.interceptors.response.use(
  response => {
    if (response.config.responseType === 'blob') {
      if (response.status === 200) {
        return response
      } else {
        return Promise.reject('error')
      }
    } else {
      if (response.status === 200) {
        return response.data
      } else {
        message.error('请求失败！')
        return Promise.reject('error')
      }
    }
  },
  error => {
    message.error('请求失败！')
    return Promise.reject(error)
  }
)

export default Request;