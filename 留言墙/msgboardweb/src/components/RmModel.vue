<script setup>
import '../assets/fonts/icon/iconfont.css'

const props = defineProps({
  title: String,
  isModel: Boolean,
})
const emit = defineEmits(['isModelShow'])
const isModelS = () => {
  emit('isModelShow')
}
</script>

<template>
  <transition name="model">
    <div class="rm-model" v-if="isModel">
      <div class="rm-model-head">
        <p class="model-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="isModelS"></span>
      </div>
      <div class="rm-model-main">
        <slot></slot>
        <!--        <div class="slor"></div>-->
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import '../style/common.less';

.model {
  //入场
  &-enter {
    &-from {
      transform: translateX(360px);
    }

    &-active {
      transition: @tr;
    }

    &-to {
      transform: translateX(0);
    }
  }

  //出场
  &-leave {
    &-from {
      transform: translateX(0px);
    }

    &-active {
      transition: @tr;
    }

    &-to {
      transform: translateX(360px);
    }
  }
}

.rm-model {
  width: 370px;
  height: 100%;
  background: rgba(255, 248, 248, 0.8);
  boxshadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  position: fixed;
  right: 0;
  top: 52px;
  z-index: 1000;

  .rm-model-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @padding-20;
    box-sizing: border-box;

    .model-name {
      font-size: 18px;
      color: @gray-1;
      font-weight: 600;
    }

    .icon-guanbi {
      color: @gray-2;
      cursor: pointer;
      padding: 5px;
    }
  }

  .rm-model-main {
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    padding-bottom: 116px;
    box-sizing: border-box;
    margin: 2px;

    .slor {
      height: 1200px;
      background: #eee;
    }
  }

  .rm-model-main::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .rm-model-main::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }

  .rm-model-main::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }
}
</style>