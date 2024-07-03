<script setup>
import '../assets/fonts/icon/iconfont.css'
import {lable,cardColor} from '../utils/StaticData.js'
import {useRouter} from'vue-router'
const router  = useRouter()

const props = defineProps({
  width: {
    type: String,
  },
  note:{
    type: [String, Number],
  }
})
const emit = defineEmits(['talkMsg'])
const talkMsg = ()=>{
  emit('talkMsg')
}
</script>

<template>
  <div class="note-card" :style="{width:width,background: cardColor[note.color] }">
    <div class="top">
<!--      <p class="time">{{note.moment.slice(0,10)}}-{{note.moment.slice(11,19)}}</p>-->
      <p class='lable'>{{lable[router.currentRoute.value.query.id][note.label]}}</p>
    </div>
    <p class="msg" @click="talkMsg">{{note.message}}</p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon" @click="clickLike">
<!--          <span class="iconfont icon-xiai" :class="{islike:note.isLike[0].count>0}"></span>-->
          <span class="iconfont icon-xiai" :class="{isLike:note.isLike}"></span>
<!--          <span class="value">{{note.like[0].count?note.like[0].count:0}}</span>-->
          <span class="value">{{note.like?note.like:0}}</span>
        </div>
        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{note.comment}}</span>
        </div>
      </div>
      <div class="name">{{note.name}}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../style/common.less';

.note-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;

    p {
      font-size: 12px;
      color: @gray-3;
    }
  }

  .msg {
    height: 140px;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: @size-14;
    color: @gray-1;
    cursor: pointer;
  }

  .foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;

    .foot-left {
      display: flex;

      .value {
        font-size: 16px;
        color: @gray-2;
        line-height: 16px;
        padding-left: @padding-4;
      }

      .iconfont {
        color: @gray-2;
      }

      .icon {
        padding-right: @padding-8;
        display: flex;
        align-items: center;

        .icon-xiai {
          cursor: pointer;
          transition: @tr;
          &:hover {
            color: @warning-color;
          }
        }
        .isLike{
          color: @warning-color;
        }
      }
    }
  }

  .name {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 15px;
    color: @gray-1;
    font-weight: 500;
  }
}
</style>