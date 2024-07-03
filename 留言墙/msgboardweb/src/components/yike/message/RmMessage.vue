<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  message:{
    type: String,
    default:''
  },
  type:{
    type: String,
    //warn警告。error错误，success成功
    default: 'warn'
  }
})

const style = ref({
  warning:{
    icon:'icon-baocuo1'
  },
  error:{
    icon:'icon-baocuo'
  },
  success:{
    icon:'icon-dui'
  }
})
//定义一个数据控制是否显示弹窗，默认隐藏，组件挂载完毕后显示
const isShow = ref(false)
onMounted(()=>{
  isShow.value = true
  setTimeout(()=>{
    isShow.value = false
  },3000)
})
</script>

<template>
  <transition name="down">
    <div class="rm-message" v-if="isShow">
      <div class="rm-m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
.down{
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }

    &-active {
      transition: all 0.3s;
    }

    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  &-leave{
    &-from{
      transform: translateY(0px);
      opacity: 1;
    }
    &-active{
      transition: all 0.3s;
    }
    &-to{
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}
.rm-message{
  width: 100%;
  height:40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;

  .rm-m-i{
    color:#202020;
    padding: 0 20px;
    background: #ffffff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  }
  i{
    margin-right: 6px;
    vertical-align: middle;
  }
  .text{
    vertical-align: middle;
  }
}
.icon-success{
  color: #3B73F0;
}
.icon-warning{
  color: #f67770;
}
.icon-error{
  color: #F35248;
}
</style>