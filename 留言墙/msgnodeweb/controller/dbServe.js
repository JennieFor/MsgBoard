const dbModel = require('../lib/db');

//新建墙信息
exports.createWall = async (req, res) => {
  await dbModel.createWalllal(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//删除墙信息
//使用Promise.all方法并行删除关联的MsgModel和CommentModel表里的信息。
exports.deleteWall = async (req, res) => {
  await dbModel.deleteWallal(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//新建反馈信息
exports.createMsg = async (req, res) => {
  await dbModel.createMsgal(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//删除反馈信息
exports.deleteMsg = async (req, res) => {
  await dbModel.deleteMsgal(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//新建评论信息
exports.createComment = async (req, res) => {
  await dbModel.createCommental(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//删除评论信息
exports.deleteComment = async (req, res) => {
  await dbModel.deleteCommental(req.body)
    .then(result => {
      res.send({
        code: 200,
        message: result
      })
    })
}
//分页查询wall并获取赞数，举报，撤销数等
exports.findWallPage = async (req, res) => {
  let data = req.body;
  const result = await dbModel.findWallPage(data.page, data.pagesize, data.type, data.label);
  for (let i = 0; i < result.length; i++) {
    // 注意：这里假设 dbModel 中的方法是正确配置的，并且它们也返回 Promise
    result[i].like = await dbModel.MsgModelCount(result[i]._id, 0); // 使用 _id
    result[i].report = await dbModel.MsgModelCount(result[i]._id, 1);
    result[i].revoke = await dbModel.MsgModelCount(result[i]._id, 2);
    result[i].isLike = await dbModel.likeCount(result[i]._id, req.body.userId); // 使用 req.body.userId
    result[i].commentCount = await dbModel.commentCount(result[i]._id);
  }
  res.send({
    code: 200,
    message: result
  });
}














