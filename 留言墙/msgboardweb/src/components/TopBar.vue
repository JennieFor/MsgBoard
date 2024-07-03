<script setup>
import boardButton from './BoardButton.vue'
import {useRouter} from 'vue-router'
import {ref} from "vue";
// 获取路由id
const router = useRouter();
//切换路由id
const changeWall=(e)=>{
  router.push({
    query:{id:e},
  })
}
</script>

<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../assets/images/尔康.png" class="logo-img">
      <p class="logo-name">尔康请留言</p>
    </div>
    <div class="menu">
      <board-button class="menu-msg" :is-main="Number($router.currentRoute.value.query.id)===0?'cprimary':'csecondary'" @click="changeWall(0)">留言板</board-button>
      <board-button class="menu-img" :is-main="Number($router.currentRoute.value.query.id)===1?'cprimary':'csecondary'" @click="changeWall(1)">照片墙</board-button>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../style/common.less";

.logo-img {
  width: 80px;
  height: 40px;
}

.top-bar {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px); //背景模糊程度
  //绝对定位且表头永远处于最上层
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;

  .menu {
    .menu-msg {
      display: inline-block;
      margin-right: 24px;
    }

    .menu-img {
      display: inline-block;
    }
  }

  .logo {
    width: 200px;
    display: flex;
    align-items: center;

    .logo-name {
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }
  }

  .user {
    width: 200px;

    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #7BE7FF 2%, #1E85E2 100%);
    }
  }
}
</style>