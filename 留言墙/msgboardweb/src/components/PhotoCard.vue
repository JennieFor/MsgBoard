<script setup>
import '../assets/fonts/icon/iconfont.css'
// import {lable,cardColor} from '../utils/StaticData.js'

const props = defineProps({
  photo:{
    type:JSON,
    default:{}
  }
})
</script>

<template>
<div class="rmm-photo-card">
  <img class="photo-img" src="../../static/0.jpg" />
  <div class="photo-bg"></div>
  <div class="photo-like">
    <span class="iconfont icon-xiai"></span>
    <span class="like-data">{{photo.like}}</span>
  </div>
</div>
</template>

<style scoped lang="less">
.rmm-photo-card {
  position: relative;

  .photo-img{
    width: 100%;
  }

  .photo-bg{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
    width: 100%;
    height: 100%;
    opacity:0;
    transition: all 0.3s;
  }
  .photo-like{
    position: absolute;
    left: 8px;
    top: 8px;
    background:rgba(255,255,255,0.8);
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    opacity:0;
    transition: all 0.3s;
    cursor: pointer;

    .icon-xiai{
      color:#949494;
    }
    .like-data{
      color: #202020;
    }
  }
  &:hover {
    .photo-bg{
      opacity: 1;
    }
    .photo-like{
      opacity: 1;
    }
  }

}
</style>