//@ts-nocheck
import { extend } from 'umi-request';
import { message } from 'antd';
import { baseURL } from '../utils/configUrl';

const errorHandler = function(error:any) {
  if (error.response) {
    if (error.response.status) {
      message.error(`请求出错(状态码：error.response.status)！`)
    } else if (error.response.message) {
      message.error(`${error.response.message}`)
    } else {
      message.error('请求出错！')
    }
  } else {
    message.error('网络连接失败！')
  }
  throw error; 
};
const extendRequest = extend({ errorHandler });

function queryChange(query: any){
  let queryStr = '';
  let count = 0;
  if (query) {
    for(const key in query) {
      if (query.hasOwnProperty(key)) {
        count += 1;
        if (count===1){
          queryStr = `?${key}=${query[key]}`
        } else {
          queryStr = `&${key}=${query[key]}`
        }
      }
    }
  }
  return queryStr;
}

function get(url:string,query: any=null){
  return extendRequest(`${baseURL}${url}${queryChange(query)}`,{
    method: 'GET'
  })
}

function post(url:string,params:any,query:any = null){
  const param = JSON.parse(JSON.stringify(params));
  return extendRequest(`${baseURL}${url}${queryChange(query)}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: param
  })
}

export default {
  get,
  post
};