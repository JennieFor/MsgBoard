import fetch from '../utils/axios'

// 获取访问者IP并存储到Pinia store
export const signIpApi = async (counterStore) => {
  try {
    const response = await fetch.post('/signip');
    const data = await response.data;
    counterStore.setUserIP(data.ip); // 假设你的 store 有一个 setUserIP action
    console.log(data.ip);
  } catch (error) {
    console.error('Error fetching IP:', error);
  }
};

//新建墙数据
export const insertWallApi = (data)=>{
  return  fetch.post('/insertwall',data).then(res=>{
    return res;
  })
}

//查询墙
export const findWallPageApi = (data)=>{
  // fetch.post('/findwallpage',data)
  return fetch.post('/findwallpage', data)
    .then(response => {
      console.log(response.data);
      return  response
    })
}

//新建评论
export const createComment = (data)=>{
  return  fetch.post('/insertcomment',data).then(res=>{
    return res;
  })
}