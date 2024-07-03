import RMMessage from "./message/RmMessage.js";

//Vue3注册全局组件库的写法
//app.component(组件名,组件文件)

//导出一个配置，用于app.use()安装组件库使用
export default {
  install(app) {
    //全局挂载，过组件实例调用的属性
    app.config.globalProperties.$message = RMMessage;
  }
}