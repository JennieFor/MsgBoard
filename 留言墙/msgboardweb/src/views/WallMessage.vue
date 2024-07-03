<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {lable, wallType , none} from "../utils/StaticData.js";
import NoteCard from "../components/NoteCard.vue";
import { photo} from '../../mock/index.js';
import RmModel from "../components/RmModel.vue";
import NewCard from "../components/NewCard.vue";
import CardDetails from "../components/CardDetail.vue";
import {useRouter} from 'vue-router'
import PhotoCard from "../components/PhotoCard.vue";
import Viewer from "../components/Viewer.vue";
import lottie from "lottie-web";
import loadingJson from '../assets/lottie/光照.json'
import { useCounterStore } from '../pinia/index.js'
import {signIpApi,findWallPageApi} from "../api/index.js";

const isLable = ref(-1)
//切换label
const selectCode = (e) => {
  isLable.value = e;
  cards.value=[];
  page.value = 1;
  getWallCard(router.currentRoute.value.query.id)
}
const cards = ref([])
const page = ref(1)
const pagesize = ref(8)
const isOk = ref(-1) //是否加载中  -1加载中  0就是没拿到数据
const addBottom = ref(30)

//监听页面滚动
const scrollBottom = () => {
  //距离顶部高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //屏幕高度
  let clientHeight = document.documentElement.clientHeight;
  //内容高度
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight + 230 >= scrollHeight) {
    addBottom.value = scrollTop + clientHeight + 230 - scrollHeight
  } else {
    addBottom.value = 30
  }
  if(scrollTop + clientHeight == scrollHeight){
    getWallCard(router.currentRoute.value.query.id)
  }
}
//监听页面滚动
onMounted(() => {
  window.addEventListener('scroll', scrollBottom)
})
const title = ref('')

//显示新增页
const isModel = ref(false)
//弹窗关闭/开启
const closeModel = () => {
  isModel.value = false
  if (router.currentRoute.value.query.id==1) {
    view.value=false
  }
}
//当前选择卡片
const cardSelected = ref(-1)
//切换卡片
const selectedCard = (index) => {
  title.value=''
  if (index !== cardSelected.value) {
    cardSelected.value = index
    isModel.value = true
    if (router.currentRoute.value.query.id==1) {
      view.value=true
    }
  } else {
    cardSelected.value = -1
    isModel.value = false
    if (router.currentRoute.value.query.id==1) {
      view.value=false
    }
  }
}
const addCard = () => {
  title.value = '写留言'
  isModel.value = true
  cardSelected.value = -1
}

// 获取路由id
const router = useRouter()
const view = ref(false)
const photoArr = ref([])


//切换图片
const viewSwitch = (e)=>{
  if(e===0){
    cardSelected.value--
  }else {
    cardSelected.value++
  }
}
const newCardCreate =(e)=>{
  cards.value.unshift(e)
  closeModel()
}

//加载动画
const loading=()=>{
  if(isOk.value==-1){
    nextTick(async ()=>{
      let params1 = {
        container:document.getElementById('lottie'),
        renderer:'svg',
        loop:true,
        autoplay:true,
        animationData:loadingJson,
      }
      lottie.loadAnimation(params1);
    })
  }
}

//获取仓库值
const counterStore = useCounterStore();
let allStoreData = ref('');

const fetchStoreData = () => {
  allStoreData.value = { ...counterStore.$state.user }
}

//获取所有墙信息
const getWallCard=(id)=>{
  if(page.value>0){
    isOk.value=-1
    let data = {
      type:id,
      page:page.value,
      pagesize:pagesize.value,
      userId:allStoreData.value.id,
      label:isLable.value,
    }
    // console.log(data)
    findWallPageApi(data).then(res=>{
      cards.value=cards.value.concat(res.data.message)
      // console.log(res.data.message)
      if(res.data.message.length){
        page.value++
      }else{
        page.value=0
      }
      if(cards.value.length>0){
        isOk.value=1
        if(page.value==0){
          isOk.value=2
        }
      }else{
        isOk.value=0
      }
      //如果为图片则将图片单独拿出来
      if(router.currentRoute.value.query.id==1){
        for (let i = 0 ; i < cards.value.length; i++) {
          photoArr.value.push(cards.value[i].imgurl)
        }
      }
    })
  }
}
onMounted(() => {
  async function init() {
    try {
      await signIpApi(counterStore); // 等待 signIpApi 执行完毕
      fetchStoreData();
      loading();
      getWallCard(0);
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }
  init() // 调用异步初始化函数
})

//监听页面id变化，切换页面时清除页面所有内容
watch(() => router.currentRoute.value.query.id, (newValue, oldValue) => {
  isLable.value = -1;
  isModel.value = false;
  view.value = false;
  cardSelected.value = -1;
})
</script>

<template>
  <div class="wall-message">
    <p class="title">{{ wallType[router.currentRoute.value.query.id].name }}</p>
    <p class="slogan">{{ wallType[router.currentRoute.value.query.id].slogan }}</p>
    <div class='lable'>
      <p class="lable-list" :class="{lbselected:isLable==-1}" @click="selectCode(-1)">全部</p>
      <p class="lable-list" v-for="(item,index) in lable[router.currentRoute.value.query.id]" :key="index" :class="{lbselected:isLable==index}"
         @click="selectCode(index)">{{ item }}</p>
    </div>
    <div class="card" v-show="router.currentRoute.value.query.id==0">
      <note-card v-for="(item,index) in cards" :key="index" :note=item class="card-inner" :width="'288px'"
                 :class="{cardselected:cardSelected===index}" @talkMsg="selectedCard(index)"></note-card>
    </div>
    <div class="photo" v-show="router.currentRoute.value.query.id==1">
      <photo-card v-for="(item,index) in photo.data" :key="index" :photo="item" class="photo-card" @click="selectedCard(index)"></photo-card>
    </div>
<!--    卡片状态-->
    <div class="none-msg" v-if="isOk==0">
      <img :src="none[router.currentRoute.value.query.id].url">
      <p>{{none[router.currentRoute.value.query.id].msg}}</p>
    </div>
<!--    加载状态-->
    <div class="loading" v-show="isOk==-1">
      <div id="lottie"></div>
      <p>加载中...</p>
    </div>

    <p class="bottom-tip" v-show="isOk==2 ">没有更多了...</p>

    <div class="addMsg" :style="{bottom:addBottom+'px'}" @click="addCard" v-show="!isModel">
      <span class="iconfont icon-jia"></span>
    </div>
    <rm-model :title='title' @isModelShow="closeModel" :isModel="isModel">
      <new-card :id="router.currentRoute.value.query.id" @closeMadel="closeModel" v-if="cardSelected===-1" @clickbt="newCardCreate"></new-card>
      <card-details v-if="cardSelected!==-1" :card="cards[cardSelected]"></card-details>
    </rm-model>
    <viewer :isView="view" :photos="photoArr" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></viewer>
  </div>
</template>

<style scoped lang="less">
@import '../style/common.less';

.wall-message {
  min-height: 715px;
  margin-top: 52px;;

  .title {
    padding-top: 48px;
    padding-bottom: @padding-8;
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
  }

  .slogan {
    color: @gray-2;
    text-align: center;
  }

  .lable {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .lable-list {
      padding: 0 14px;
      display: flex;
      align-items: center;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }

    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid @gray-9;
    padding-top: 28px;
    justify-content: center;

    .card-inner {
      margin: 6px;
    }

    .cardselected {
      border: 1px solid @primary-color;
    }
  }

  .photo{
    width: 88%;
    margin: 30px auto;
    columns: 5;
    column-gap: 4px;
  }

  .photo-card{
    margin-bottom: 4px;
    break-inside: avoid;
  }

  .addMsg {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;

    .icon-jia {
      color: @gray-10;
      font-size: 52px;
    }
  }

  .none-msg{
    width: 100%;
    text-align: center;
    padding-top: 80px;
    position: absolute;
    top: 280px;

    img{
      display: inline;
      width:160px;
    }

    p{
      font-family: Serif;
      font-weight: 700;
      font-size: 24px;
      color: @gray-3;
    }
  }
  .loading{
    text-align: center;
    width: 100%;

    p{
      margin-top: -2px;
      font-family: Serif;
      font-size: 24px;
      color: @gray-3;
    }
  }
  #lottie{
    margin-top: 20px;
    height: 80px;
  }
  .bottom-tip{
    text-align: center;
    color: @gray-3;
    padding-top: 100px;
  }
}

</style>