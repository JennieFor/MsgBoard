const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
//解析config
const config = require('../config/defaults');
const e = require("express");
const {query} = require("express");
const {DBHOST, DBPORT, DBNAME} = config.mgdv3msg;
//链接数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

mongoose.connection.once('open', () => {
  console.log('链接成功')

})
//设置留言墙mongoose数据型
let WallSchema = new mongoose.Schema({
  type: {type: Number, required: true, comment: '类型 0 信息 1 图片'},
  message: {type: String, maxlength: 1000, comment: '留言'},
  name: {type: String, required: true, maxlength: 100, comment: '用户名'},
  userId: {type: String, required: true, maxlength: 100, comment: '创建者ID'},
  moment: {type: String, required: true, maxlength: 100, comment: '时间'},
  label: {type: Number, required: true, comment: '标签'},
  color: {type: Number, comment: '颜色'},
  imgUrl: {type: String, maxlength: 100, comment: '图片路径'}
})
//设置留言反馈mongoose数据型
let MsgSchema = new mongoose.Schema({
  wallId: {type: String, required: true, comment: '墙留言ID'},
  userId: {type: String, required: true, maxlength: 100, comment: '反馈者ID'},
  type: {type: Number, required: true, comment: '反馈类型 0喜欢 1举报 2撤销'},
  moment: {type: String, required: true, maxlength: 100, comment: '时间'},
  content: String,
  // Mongoose默认会添加createdAt和updatedAt字段
  createdAt: {type: Date, default: Date.now},
}, {timestamps: true}); // 如果设置了timestamps: true，则不需要手动添加createdAt和updatedAt字段)
//设置评论mongoose数据型
let CommentSchema = new mongoose.Schema({
  wallId: {type: String, required: true, comment: '墙留言ID'},
  userId: {type: String, required: true, maxlength: 100, comment: '评论者ID'},
  imgUrl: {type: String, maxlength: 100, comment: '头像路径'},
  comment: {type: String, maxlength: 1000, comment: '评论内容'},
  name: {type: String, required: true, maxlength: 100, comment: '用户名'},
  moment: {type: String, required: true, maxlength: 100, comment: '时间'},
  content: String,
  // Mongoose默认会添加createdAt和updatedAt字段
  createdAt: {type: Date, default: Date.now},
}, {timestamps: true}); // 如果设置了timestamps: true，则不需要手动添加createdAt和updatedAt字段)
//留言/照片墙模型
let WallModel = mongoose.model('Walls', WallSchema);
//留言反馈集合
let MsgModel = mongoose.model('Msgs', MsgSchema);
//评论集合
let CommentModel = mongoose.model('Comments', CommentSchema)

//新建墙信息
const createWalllal = (data) => {
  return WallModel.create({
    type: data.type,
    message: data.message,
    name: data.name,
    userId: data.userId,
    moment: data.moment,
    label: data.label,
    color: data.color,
    imgUrl: data.imgUrl,
  })
}
//删除墙信息
const deleteWallal = (data) => {
  return WallModel.deleteOne({_id: data.id})
    .then(() => {
      return Promise.all([
        MsgModel.deleteMany({wallId: data.id}),
        CommentModel.deleteMany({wallId: data.id})
      ])
    })
}
//新建反馈信息
const createMsgal = (data) => {
  return MsgModel.create({
    wallId: data.wallId,
    userId: data.userId,
    type: data.type,
    moment: data.moment
  })
}
//删除反馈信息
const deleteMsgal = (data) => {
  return MsgModel.deleteOne({_id: data.id})
}
//新建评论信息
const createCommental = (data) => {
  return CommentModel.create({
    wallId: data.wallId,
    userId: data.userId,
    imgUrl: data.imgUrl,
    comment: data.comment,
    name: data.name,
    moment: data.moment,
  })
}
//删除评论信息
const deleteCommental = (data) => {
  return CommentModel.deleteOne({_id: data.id})
}
//countDocuments() 方法来查询符合条件的数据总数
// 查询各反馈总数据
const MsgModelCount = (wid, type) => {
  return MsgModel.countDocuments({wallId: wid, type: type});
}
// 查询评论总数
const commentCount = (wid) => {
  return MsgModel.countDocuments({wallId: wid});
}
// 当前ip是否点赞
const likeCount = (wid, uid) => {
  return MsgModel.countDocuments({wallId: wid, userId: uid, type: 0});
}
// //分页查询墙(标签过滤)
const findWallPage = (page, pagesize, type, label) => {
  //如果label的值为-1，则查询选定类型type的所有数据
  //如果label的值不为-1，则查询指定类型type和标签label的数据。
  const queryOptions = label === -1
    ? {type: type}
    : {label: label, type: type};

  return WallModel.find(queryOptions)
    //倒序
    .sort({id: -1})
    .skip((page - 1) * pagesize)
    .limit(pagesize)
    //查询返回结果
    .exec();
}

module.exports = {
  createWalllal,//新建墙信息
  deleteWallal,//删除墙信息
  createMsgal,//新建反馈信息
  deleteMsgal,//删除反馈信息
  createCommental,//新建评论信息
  deleteCommental,//删除评论信息
  MsgModelCount,// 查询各反馈总数据
  commentCount,// 查询评论总数
  likeCount,// 当前ip是否点赞
  findWallPage,//标签分页
}


