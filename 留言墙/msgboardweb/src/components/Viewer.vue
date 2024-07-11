<script setup>
import {computed} from "vue";

const props = defineProps({
  photos: {
    type: Array,
  },
  nowNumber: {
    type: Number,
  },
  isView: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['viewSwitch'])
const changeNumber=(e)=>{
  // emit('viewSwitch',e)
  //我修改了一个内容
  emit("viewSwitch",e)
}
</script>

<template>
  <transition name="view">
    <div class="rmm-viewer" v-if="isView">
      <div class="bg"></div>
      <div>phots</div>
      <div class="viewer-photo">
        <img src="../../static/0.jpg"/>
      </div>
      <div class="switch sw-left">
        <span class="iconfont icon-xiangzuo1" @click="changeNumber(0)" v-show="nowNumber>0"></span>
      </div>
      <div class="switch sw-right">
        <span class="iconfont icon-xiangyou1" @click="changeNumber(1)"  v-show="nowNumber<photos.length-1"></span>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
.view{
  //入场
  &-enter{
    &-from{
      opacity: 0;
    }
    &-active{
      transition: all 0.2s ease-out;
    }
    &-to{
      opacity: 1;
    }
  }
  //出场
  &-leave {
    &-from{
      opacity: 1;
    }
    &-active{
      transition: all 0.2s ease-out;
    }
    &-to{
      opacity: 0;
    }
  }
}
.rmm-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    height: 100%;
    width: 100%;
  }

  .viewer-photo {
    position: absolute;
    padding: 82px 454px 0px 96px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }

  .switch {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #949494;
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: all 0.3s;
    cursor: pointer;

    .iconfont {
      font-size: 24px;
    }

    &:hover {
      opacity: 1;
    }
  }

  .sw-left {
    left: 20px;
  }

  .sw-right {
    right: 390px;
  }
}
</style>