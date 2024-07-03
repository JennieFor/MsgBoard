const controller = require('../controller/dbServe');
module.exports = (app) => {
  //新建墙数据
  app.post('/insertwall', (req, res) => {
    controller.createWall(req, res)
  })
  //删除墙数据
  app.post('/deletewall', (req, res) => {
    controller.deleteWall(req, res)
  })
  //新建反馈
  app.post('/insertmsg', (req, res) => {
    controller.createMsg(req, res)
  })
  //删除反馈
  app.post('/deletemsg', (req, res) => {
    controller.deleteMsg(req, res)
  })
  //新建评论
  app.post('/insertcomment', (req, res) => {
    controller.createComment(req, res)
  })
  //删除评论
  app.post('/deletecomment', (req, res) => {
    controller.deleteComment(req, res)
  })
  //分页查询，获取赞，评论，撤销等数据
  app.post('/findwallpage', (req, res) => {
    controller.findWallPage(req, res)
  })
  //前端访问服务，获取IP地址
  app.post('/signip',(req,res)=>{
    let ip = req.ip
    res.send({
      code: 200,
      ip:ip
    })
  })
}