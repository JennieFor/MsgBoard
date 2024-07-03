<script setup>
import NoteCard from '../components/NoteCard.vue'
import BoardButton from "../components/BoardButton.vue";
import {portrait} from "../utils/StaticData.js";
import {computed, ref} from "vue";
import {createComment} from "../api/index.js";

const props = defineProps({
  card: JSON
})
let discuss = ref('')
let name = ref('匿名')
const comments = ref([])
const nowpage = ref(1)
const pagesize = ref(8)

const isDis = computed(()=>{
  if(discuss.value && name.value){
    return true
  }else {
    return false
  }
})
const cards = computed(()=>{
  return props.card
})
//提交评论
const submit = () =>{
  if(isDis.value){
    let img = Math.floor(Math.random()*14)
    let data = {
      wallId:props.card._id,
      userId:props.card.userId,
      imgUrl:img,
      moment:new Date(),
      name:name.value,
      comment:discuss.value
    }
    console.log(data)
    createComment(data).then(()=>{
      comments.value.unshift(data)
      // cards.comcount[0].count++
      discuss.value=''
    })
  }
}

</script>

<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">联系楼主撕掉该标签</p>
      <p class="report">举报</p>
    </div>
    <note-card :note="card" class="note-ca-rd"></note-card>
    <div class="form">
      <textarea class="message" placeholder="请输入..." v-model="discuss"></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name"/>
        <BoardButton :class="{notallowed:!isDis}" @click="submit">评论</BoardButton>
      </div>
    </div>
    <p class="title">评论{{ cards.comcount }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(item,index) in comment" :key="index">
        <div class="user-head" :style="{backgroundImage:portrait[item.imgurl]}"></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ item.moment.getFullYear() }}.{{ item.moment.getMonth() }}.{{ item.moment.getDate() }}</p>
            <p></p>
          </div>
          <div class="mm">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../style/common.less';

.card-detail {
  position: relative;
  padding: 0 20px;

  .top-bt {
    position: fixed;
    top: 0;
    left: 0;
    padding: @padding-20;
    display: flex;

    .revoke {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: 16px;
    }

    .report {
      font-size: 16px;
      color: @warning-color;
      cursor: pointer;
    }
  }

  .note-ca-rd {
    width: 330px;
  }

  .form {
    .message {
      background: none;
      height: 56px;
      border: 1px solid rgba(148, 148, 149, 1);
      resize: none; //大小固定
      padding: @padding-8;
      box-sizing: border-box;
      width: 100%;
      margin-top: @padding-12;
    }

    .bt {
      display: flex;
      padding-top: @padding-8;
      justify-content: space-between;
    }

    .name {
      width: 200px;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      border: 1px solid rgba(148, 148, 149, 1);
      line-height: 20px;
    }
  }

  .title {
    font-weight: 600;
    padding-top: 25px;
    padding-bottom: 20px;
  }

  .comment-li {
    display: flex;
    padding-bottom: 30px;

    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      overflow: hidden;
    }

    .comm-m {
      padding-left: @padding-8;
    }

    .m-top {
      display: flex;
      align-items: center;

      .name {
        font-weight: 600;
      }

      .time {
        font-size: @size-12;
        padding-left: @padding-4;
        color: @gray-3;
      }
    }

    .mm {
      padding-top: @padding-4;
    }
  }
}
</style>