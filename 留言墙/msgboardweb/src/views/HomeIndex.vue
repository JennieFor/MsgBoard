<script setup>
import topBar from '../components/TopBar.vue'
import footBar from '../components/FootBar.vue'
// import { useCounterStore } from '../pinia/index.js'
// import {signIpApi} from '../api/index.js'
// signIpApi(useCounterStore())
</script>

<template>
  <div class="wall-index">
    <!--页头-->
    <topBar></topBar>
    <!--背景图-->
    <video src="../assets/images/bgcVideo.mp4" autoplay="autoplay" muted="muted" loop="loop" class='bgc-video'></video>
    <!--路由页，动态-->
    <router-view></router-view>
    <!--页脚-->
    <foot-bar></foot-bar>
  </div>
</template>

<style lang="less" scoped>
.wall-index{
  .bgc-video{
    height: 880px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>