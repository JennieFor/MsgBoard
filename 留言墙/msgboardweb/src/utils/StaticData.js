//底板性质
const wallType = [
  {
    name:'留言墙',
    slogan:'很多事情值得记录，值得回味。'
  },
  {
    name:'照片墙',
    slogan: '很多图片值得记录，值得回味。'
  }
]

//分类标签
const lable=[
  ['留言','目标','理想','过去','将来','爱情','亲情', '友情','秘密','信条','无题'],
  ['我','ta','喜欢的','有意义的','值得纪念的','母校','生活','天空','我在的城市','大海','无题']
]

//卡片背景色
const cardColor = [
  "rgba(252,175,162,0.30)",
  "rgba(255,227,148,0.30)",
  "rgba(146,230,245,0.30)",
  "rgba(168,237,138,0.30)",
  "rgba(202,167,247,0.30)",
  "rgba(212,212,212,0.30)",
]

const cardColor1 = [
  "rgba(252,175,162,1)",
  "rgba(255,227,148,1)",
  "rgba(146,230,245,1)",
  "rgba(168,237,138,1)",
  "rgba(202,167,247,1)",
]

//头像背景
const portrait=[
  'Linear-gradient(180deg,#FFA9D9 0%,#E83D3D 100%)',
  'Linear-gradient(180deg,#FFA7EB 0%,#F026A8 100%)',
  'Linear-gradient(180deg,#F5A8FF 0%,#BF23E5 100%)',
  'linear-gradient(180deg,#DFA1FF 0%,#9A36F0 100%)',
  'linear-gradient(180deg,#C9AAFF 0%,#6D3CF5 100%)',
  'Linear-gradient(180deg,#9EAAFF 0%,#3846F4 100%)',
  'linear-gradient(180deg,#8CD8FF 0%,#2A6AF0 100%)',
  'linear-gradient(180deg,#7BE7FF 2%,#1E85E2 100%)',
  'linear-gradient(180deg,#92FDFF 0%,#14B2DD 100%)',
  'Linear-gradient(180deg,#89FED8 0%,#18c997 100%)',
  'linear-gradient(180deg,#D7FFA7 0%,#5ED52A 100%)',
  'linear-gradient(180deg,#FFED48 0%,#FD9E16 100%)',
  'Linear-gradient(180deg,#FFDc83 0%,#F88816 100%)',
  'Linear-gradient(180deg,#FFBA8D 1%,#EB6423 100%)',
]
import ltImg from '../assets/images/不留言让你飞起来.png'
import lyImg from '../assets/images/rmm留言.png'
//空状态时显示图片及文字
const none = [
  {
    url: lyImg,
    msg: '不留言要挨扎的喔'
  },
  {
    url: ltImg,
    msg: '不留图，我让你飞起来'
  }
];

export { wallType, lable, cardColor, cardColor1, portrait, none };