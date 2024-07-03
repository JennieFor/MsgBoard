//专门存储链接数据的端口
//配置编译环境和线上环境之间的切换
//baseUrl：域名地址
//routerMode：路由模式
//baseImgPath：图片存放地址

import {ref} from "vue";

let baseUrl = ref('')
let routerMode = ref('hash')
let baseImgPath
//判断当前环境，如果是测试环境，则走上方端口，打包时会按照下方端口打包
if(process.env.NODE_ENV==='development'){
  baseUrl='http://localhost:3000'
  baseImgPath='http://localhost:3000'
}else{
  baseUrl=''
  baseImgPath=''
}
export {
  baseUrl,
  routerMode,
  baseImgPath
}
