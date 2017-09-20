var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//日志打印中间件
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var multer = require("multer");//文件上传中间件
var mongoose = require('mongoose');
var session = require('express-session')
var router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//输出类型
// app.use(multer()); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use (session({  
  secret:'secret',  
    cookie:{  
        maxAge:1000*60*30  
    }  
}));  
app.use(function(req,res,next) {  
    res.locals.user = req.session.user;//从session获取user对象  
    var err = req.session.error;//获取错误信息  
    delete req.session.error;  
    res.locals.message = "";//展示信息的message  
    if(err){  
      res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red">'+err+'</div>';  
    }  
    next();//中间件传递  
}); 


app.use('/', index);
app.use('/users', users);

app.get('/login',function (req, res) {    // 到达此路径则渲染login文件，并传出title值供 login.html使用  
  res.render("login", { title: 'User Login' });
})
app.post('/login',function (req, res) {                        // 从此路径检测到post方式则进行post数据的处理操作  
  //get User info  
  //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)  
  var User = global.dbHandel.getModel('user');
  var uname = req.body.uname;                //获取post上来的 data数据中 uname的值  
  User.findOne({ name: uname }, function (err, doc) {   //通过此model以用户名的条件 查询数据库中的匹配信息  
      if (err) {                                         //错误就返回给原post处（login.html) 状态码为500的错误  
          res.send(500);
          console.log(err);
      } else if (!doc) {                                 //查询不到用户名匹配信息，则用户名不存在  
          req.session.error = '用户名不存在';
          res.send(404);                            //    状态码返回404  
          //    res.redirect("/login");  
      } else {
          if (req.body.upwd != doc.password) {     //查询到匹配用户名的信息，但相应的password属性不匹配  
              req.session.error = "密码错误";
              res.send(404);
              //    res.redirect("/login");  
          } else {                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功  
              req.session.user = doc;
              res.send(200);
              //    res.redirect("/home");  
          }
      }
  });
});


/* GET register page. */
app.get('/register',function (req, res) {    // 到达此路径则渲染register文件，并传出title值供 register.html使用  
  res.render("register", { title: 'User register' });
})
app.post('/register',function (req, res) {
  //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)  
  var User = global.dbHandel.getModel('user');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  User.findOne({ name: uname }, function (err, doc) {   // 同理 /login 路径的处理方式  
      if (err) {
          res.send(500);
          req.session.error = '网络异常错误！';
          console.log(err);
      } else if (doc) {
          req.session.error = '用户名已存在！';
          res.send(500);
      } else {
          User.create({                             // 创建一组user对象置入model  
              name: uname,
              password: upwd
          }, function (err, doc) {
              if (err) {
                  res.send(500);
                  console.log(err);
              } else {
                  req.session.error = '用户名创建成功！';
                  res.send(200);
              }
          });
      }
  });
});

app.get("/home", function (req, res) {
  if (!req.session.user) {                     //到达/home路径首先判断是否已经登录  
      req.session.error = "请先登录"
      res.redirect("/login");                //未登录则重定向到 /login 路径  
  }
  console.log(req.session.user)
  res.render("home", { name: req.session.user.name });         //已登录则渲染home页面  
});


/* GET logout page. */
app.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径  
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});  

// app.post('/login', function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//     console.log(req.body)
//   res.send('welcome, ' + req.body.username)
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
