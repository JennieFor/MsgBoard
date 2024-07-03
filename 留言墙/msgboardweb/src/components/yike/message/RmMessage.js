import {createVNode, render} from "vue";
import RmMessage from "./RmMessage.vue";

const divVNode = createVNode("div",{class:'xtx-message-container'})
render(divVNode,document.body)

const div = divVNode.el
const RMMessage = ({message,type})=>{
  //1.动态创建虚拟DOM-createVNode（h）函数
  const comvVNode = createVNode(RmMessage,{message,type})
  //2.渲染到body页面中-render函数
  // render(comVNode,document.body)
  render(comvVNode,div)
  //3.提示在3s后自动卸载
  setTimeout(()=>{
    render(null,div)
  },6000)
}

export default RMMessage