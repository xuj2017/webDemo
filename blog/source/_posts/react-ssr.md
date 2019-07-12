---
title: 从零构建react ssr应用
date: 2019-07-11 18:18:14
tags: react ssr
---

### 浅谈SSR

`SSR`(server side render)简称为服务端渲染，简单的理解是服务端直接生成html字符串发送给客户端从而渲染网页；服务端渲染的主要优势有两点：利于SEO和加快首屏渲染速度；
1. 更利于SEO。

不同爬虫工作原理类似，只会爬取源码，不会执行网站的任何脚本（Google除外，据说Googlebot可以运行javaScript）。使用了React或者其它MVVM框架之后，页面大多数DOM元素都是在客户端根据js动态生成，可供爬虫抓取分析的内容大大减少。另外，浏览器爬虫不会等待我们的数据完成之后再去抓取我们的页面数据。服务端渲染返回给客户端的是已经获取了异步数据并执行JavaScript脚本的最终HTML，网络爬中就可以抓取到完整页面的信息。

2. 更利于首屏渲染

首屏的渲染是node发送过来的html字符串，并不依赖于js文件了，这就会使用户更快的看到页面的内容。尤其是针对大型单页应用，打包后文件体积比较大，普通客户端渲染加载所有所需文件时间较长，首页就会有一个很长的白屏等待时间。

### 构建react-srr项目

初始化项目配置
```javascript
npm init -y

npm install

//package.json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  },
  "devDependencies": {
    "@babel/core": "^7.5.4",
    "@babel/preset-env": "^7.5.4",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5",
    "webpack-merge": "^4.2.1",
    "webpack-node-externals": "^1.7.2"
  }
}

```
由于react代码无法在node运行，所以需要webpack编译，配置webpack配置文件

```javascript
//./config/webpck.base.js
module.exports = {
    mode:"development",
    module:{
        rules:[{
            test:/\.js$/,
            exclude:/node_modules/,
            use:["babel-loader"]
        }]
    }
}


// ./config/webpck.server.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const config = require('./webpack.base.js')

module.exports =merge(config, {
    target:"node", //运行在node环境
    externals: [nodeExternals()], //可以排除所以node模块
    entry:{
        main:path.resolve(__dirname,'../src/server/index.js')
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../build')
    }
})

// .babelrc
{
"presets": ["@babel/preset-react"]
}
```

建立开发文件

```javascript

// 建立一个react组件
import React from 'react';

export default ()=>{
    return (
        <div>
            <div>Home</div>
            <button onClick={()=>{alert("home")}}>click</button>
        </div>
    )
}


// 建立服务端入口文件../src/server/index.js
import express from 'express';
import Home from '../containers/Home';
import React from 'react'
import {renderToString} from 'react-dom/server';
const app = express();
//renderToString方法会将react组件编译成字符串返回
const content = renderToString(<Home/>)
app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.send(`
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
         <title>Document</title>
     </head>
     <body>
        <div id="app">${content}</div>
     </body>
     </html>
    `)
})


app.listen('3004',function(){
    console.log("server start on http://localhost:3004/")
})

```

编译项目
```s
#命令行执行
webpack --config config/webpack.server.js

```

启动项目
```s
node build/bundle.js
```

打开[http://localhost:3004/](http://localhost:3004/),会发现页面成功显示，但是点击按钮时没有反应


### 实现React同构

> 简单的理解就是服务端返回的html页面只是字符串，并不包含逻辑代码，如果想要实现交互操作，需要在客户端重新执行一遍react代码

建立webpack客服端配置文件

```javascript
// ./config/webpck.client.js
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.js')

module.exports =merge(config, {
    entry:{
        main:path.resolve(__dirname,'../src/client/index.js')
    },
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'../public')
    }
})
```

建立客户端入口文件

```javascript
// 建立./src/client/index.js
import React from 'react';
import ReactDom from 'react-dom';
import Home from '../containers/Home';

ReactDom.hydrate(<Home/>,document.getElementById("app"));

//修改./src/server/index.js
...

app.get("/",(req,res)=>{
    res.send(`
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8"/>
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
         <title>Document</title>
     </head>
     <body>
        <div id="app">${content}</div>
     </body>
+     <script src="./index.js"></script>
     </html>
    `)
})
...
```

重新编译并启动项目

```s
webpack --config config/webpack.server.js

webpack --config config/webpack.client.js

build/bundle.js
```
打开[http://localhost:3004/](http://localhost:3004/),会发现页面成功显示并交互成功


命令行优化

可以借助`nodemon`和`npm-run-all`优化项目；`nodemon`可以监听文件修改自动重启项目，`npm-run-all`可以整合命令 并行执行；

```javascript
// 修改package.js
"scripts": {
    "dev:build:server": "webpack --config config/webpack.server.js --watch",
    "dev:build:client": "webpack --config config/webpack.client.js --watch",
    "dev:start": "nodemon build/bundle.js",
    "dev": "npm-run-all --parallel dev:**"
  },
```
现在启动项目直接运行`npm run dev`即可

