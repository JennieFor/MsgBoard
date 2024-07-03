import {baseUrl} from "./env.js";
import axios from "axios";

//创建axios服务
const server = axios.create({
  //process.env.NoDE_ENV===‘deveLopment’来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  //timeout 若超时，则停止访问并反馈
  baseURL: baseUrl,
  timeout: 5000,
})

//添加请求拦截器
// server.interceptors.request.use(
//   config => {
//     //发送请求前要执行那些内容
//     return config;
//   }, error => {
//     //若请求错误，要做什么，获返回什么
//     console.log(error)
//     return Promise.reject();
//   })
//
//添加响应拦截器
// server.interceptors.response.use(
//   response => {
//     //对响应数据做点什么
//     if (response.status === 200) {
//       return response.data;
//     }else {
//       Promise.reject();
//     }
//   },error => {
//     //对响应错误做点什么
//     console.log(error)
//     return Promise.reject();
//   }
// )
export default server;