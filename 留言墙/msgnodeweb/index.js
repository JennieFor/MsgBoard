const express = require('express');
const path = require('path');
//解析html
const ejs = require('ejs');
const config = require('./config/defaults');

const app = express();

//使用cors中间件
const cors = require("cors");
app.use(cors()); //使用cors中间件

// 设置视图文件的路径为项目根目录下的views文件夹
app.set('views', path.join(__dirname, 'views'));

//获取静态路由路径
//使用 path.join() 方法来创建正确的静态资源路径
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'data')));

//加入Html视图,设置模板引擎为ejs
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 设置允许跨域访问服务，以至于浏览器也可访问后端服务
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  // 对于 OPTIONS 请求，直接返回 200 状态码
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return; // 终止中间件链和后续路由处理
  }
  // 对于其他请求，继续执行后续中间件或路由处理函数
  next();
});

// 解析前端数据
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//引入路由
require('./routes/index')(app);
// require('./routes/files')(app);

// app.post('/insertwall', (req, res) => {
//   let data = req.body;
//   console.log(data);
//   res.send({
//     code: 200,
//     message: '666',
//   })
// })
//监听端口
app.listen(config.port, () => {
  console.log(`我启动了${config.port}端口`)
})

