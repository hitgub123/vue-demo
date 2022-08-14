//1.先安装express 和 express-session（自行安装），不要带@types/
//2在app.js(你需要运行的node文件)中导入
const express = require('express')
const session = require('express-session')
const app = express()
//3服务端设置允许跨域cors的中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("ACCESS-Control-Allow-Headers", "Content-Type");
  //  允许客户端发送跨域请求时携带cookie信息 这个很重要
  res.header('Access-Control-Allow-Credentials', 'true');
  next()
}),
app.use(express.json()) //识别客户端提交的json数据
//4.设置session
app.use(session({
  name: 'logintext',  //传入客户端存储sessionid的cookie的名字
  secret: 'yigemimi', //用于对sessionID的cookie进行签名
  resave: true, //强制session保存到session store中
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 //过期时间设置
  }
}))
//登陆并保存session 这里只是简单的进行了验证，并没有从数据库中查找匹配user 用post方法把用户名和密码添加到请求体中
app.get('/a1', (req, res) => {
    console.log(req.session)
    const name=req.session.name||'张三'
    req.session.name=name+'a'
    res.send({ error: 0, status: 200})
})

//设置监听端口
app.listen(8082, () => {
  console.log('succeed');
})
