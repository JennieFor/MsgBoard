<script setup>
import {cardColor, cardColor1, lable} from '/src/utils/StaticData.js'
import BoardButton from "./BoardButton.vue";
import {getCurrentInstance, ref} from "vue";
import { useCounterStore } from '../pinia/index.js'
import {getObjectURL} from "../utils/times.js";
import {insertWallApi} from "../api/index.js";

const colorSelected = ref(0) //当前选择颜色
const labelSelected = ref(0) //当前选择标签
//点击切换颜色
const changeColor=(item)=>{
  colorSelected.value = item
}
//点击切换标签
const changelabelColor=(item)=>{
  labelSelected.value = item
}
const props = defineProps({
  id:{
    type: Number,
    default:0
  }
})
const message = ref('') //留言信息
const name = ref('') //留言签名
//关闭窗口
const emit = defineEmits(['closeMadel','clickbt'])
const closeMadel =(data)=>{
  emit('closeMadel',data)
}
const instance = getCurrentInstance()
const app = instance.appContext.app
const url = ref('')
let nameNew = ref('匿名')
const submit = ()=>{
  if(name.value){
    nameNew.value = name.value
  }
  let data = {
    type:props.id,
    message:message.value,
    name:nameNew.value,
    userId:useCounterStore().user.id,
    moment:new Date(),
    label:labelSelected.value,
    color:colorSelected.value,
    imgurl:''
  }
  // console.log(data)
  if(data.message && data.type == 0){
    data.color = colorSelected.value
    insertWallApi(data).then(res=>{
      // console.log(res)
      let cardD={
        type:props.id,
        message:message.value,
        name:nameNew.value,
        userId:useCounterStore().user.id,
        moment:new Date(),
        label:labelSelected.value,
        color:colorSelected.value,
        imgurl:'',
        id:res.data.message.label,
        isLike:[{count:0}],
        like:[{count:0}],
        comcount:[{count:0}],
        report:[{count:0}],
        revoke:[{count:0}],
      }
      emit('clickbt',cardD)
      message.value=''
      app.config.globalProperties.$message({ type: 'success', message: '感谢您的记录！' });
    })

  }
}

//图片显示
const showPhoto = () =>{
  let aa = getObjectURL(document.getElementById('file').files[0]);
  url.value = aa
}

</script>

<template>
  <div class="new-card">
    <div class="colors" v-show="id==0">
      <p class="color-li" v-for="(item,index) in cardColor1" :key="index" :style="{backgroundColor:item}" :class="{colorselected:index===colorSelected}" @click="changeColor(index)"></p>
    </div>
    <!-- 照片 -->
    <div class="add-photo" v-if="id==1">
      <input type="file" name="file" id="file" multiple="multiple" @change="showPhoto" />
      <div class="add-bt" v-if="url=='' ">
        <span class="iconfont icon-jia"></span>
      </div>
      <div class="change-bt" v-if=" url != '' ">
        <span class="iconfont icon-baocuo1"></span>
      </div>
      <div class="photo-div"><img :src="url"/></div>
    </div>
    <!-- 卡片 -->
    <div class="card-main" :style="{backgroundColor: id==0?cardColor[colorSelected]:cardColor[5]}">
      <textarea placeholder="留言..." class="message" maxlength="96" v-model='message'></textarea>
      <input type="text" placeholder="签名" class="name" v-model="name" />
    </div>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p v-for="(item,index) in lable[id]" class="label-li" :class="{labelselected:index===labelSelected}" @click="changelabelColor(index)">{{item}}</p>
      </div>
    </div>
    <div>
      <p class="title">免责声明</p>
      <p class="mzsm">
        嬷嬷留言是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的;<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权破坏国家统一的;<br />
        3、损害国家荣誉和利益的;<br />
        4、煽动民族仇恨、民族歧视，破坏民族团结的;<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的;<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的;<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的;<br />
        9、含有法律、行政法规禁止的其他内容的信息。
      </p>
    </div>
    <div class="footbtn">
      <board-button size="max" isMain="secondary" @click="closeMadel(0)">丢弃</board-button>
      <board-button size="max" class="submit" @click="submit()">确定</board-button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../style/common.less";
.new-card {
  padding: 0 @padding-20 120px;
  position: relative;
  .colors {
    padding-bottom: @padding-12;
    display: flex;
    align-items: center;
    .color-li {
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      cursor: pointer;
    }

    .colorselected {
      border: 1px solid @primary-color;
    }
  }

  .card-main {
    height: 240px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    .message{
      background: none;
      border: none;
      resize: none;//大小固定
      height: 172px;
      width: 100%;
      padding: @padding-8;
      box-sizing: border-box;
    }
    .name{
      width: 100%;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      border: 1px solid @gray-10;
      line-height: 20px;
    }
  }
  .title{
    color: @gray-1;
    font-weight: 600;
    padding-top: 30px;
  }
  .label{
    display: flex;
    flex-wrap: wrap;
    width: 320px;
    .label-li{
      padding: 2px 8px;
      border-radius: 20px;
      margin:16px @padding-4 0 0;
      cursor: pointer;
      color: @gray-2 ;
      transition: @tr;
    }
    .labelselected{
      background-color: #EBEBEB;
      font-weight: 600;
      color: @gray-1;
    }
  }
  .mzsm{
    padding-top: 10px;
    font-size: 14px;
    color: @gray-3;
  }
  .footbtn{
    display: flex;
    padding: 30px;
    box-sizing: border-box;
    position: fixed;
    bottom: 56px;
    left: 0px;
    background: rgba(255,255,255,0.5);
    width: 100%;
    backdrop-filter: blur(20px);

    .submit{
      margin-left: 30px;
    }
  }

  .add-photo{
    padding-bottom: 20px;
    position: relative;

    #file{
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }

    .add-bt{
      width: 64px;
      height: 64px;
      border:1px solid #ccc6c6;
      border-radius: 32px;
      display: flex;
      align-content: center;
      justify-content: center;
      cursor: pointer;

      .icon-jia{
        font-size: 34px;
        align-content: center;
      }
    }
    .photo-div{
      max-height: 200px;
      width: 100%;
      background: #f0f0f0;
      overflow: hidden;
      display: flex;
      align-items: center;

      img{
        width: 100%;
      }
    }

    .change-bt{
      position: absolute;
      top: 12px;
      left: 12px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-baocuo1{
        font-size: 34px;
        align-content: center;
      }
    }
  }
}
</style>