---
title: react-router按需加载
date: 2018-11-27 19:37:38
tags:
---

### 什么是按需加载？

按需加载是前端性能优化中的一项重要措施，按需加载是如何定义的呢？顾名思义，指的是当用户触发了动作时才加载对应的功能。触发的动作，是要看具体的业务场景而言，包括但不限于以下几个情况：鼠标点击、输入文字、拉动滚动条，鼠标移动、窗口大小更改等。加载的文件，可以是JS、图片、CSS、HTML等。react按需加载进化了好几个方式，目前最新的方式就是使用react-loadable这个组件.


### React Loadable

Loadable 是一个高阶组件（简单来说，就是把组件作为输入的组件。高阶函数就是把函数作为输入的函数。在 React 里，函数和组件有时是一回事），一个可以构建组件的函数（函数可以是组件），它可以很容易的在组件层面分割代码包


### 使用Loadable之前

创建`webpack.config.js`

```js
var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry:'./a.js',
  mode:'development',
  output:{
    filename:'[name].js',
    chunkFilename:'[name].js',// 设置按需加载后的chunk名字
    publicPath:'/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 9000,
    hot: true,
  },
  plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
  ],
}


```

添加`.babelrc`

```
{
  "presets": ["@babel/preset-react","@babel/preset-env"]
}
```
添加b.js
```js
import React,{Component} from 'react';
export default class B extends Component{
  render(){
    return <div>this is B</div>
  }
}

```

添加a.js

```js
    import React,{Component} from 'react';
    import ReactDom from 'react-dom';
    import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
    import B from './b.js';
    export default class A extends Component{
    render(){
        return (
             <Router>
                <div>
                <Route path="/B" component={B}/>
                <Link to="/B">to B</Link><br/>
                </div>
            </Router>
            )
        }
    }
    ReactDom.render(<A/>,document.querySelector("#btn"))
    if (module.hot) {
        module.hot.accept()
    }

```

使用`webpack-dev-server`启动，发现页面只加载`mian.js`,点击链接前后并没有发生什么变化
![img1](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181126-01.png)

### 使用Loadable

修改a.js
```js
import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const B = Loadable({
  loader: () => import('./b.js'),
  loading: Loading,
})

export default class A extends Component{
  render(){
    return <div>
      <Router>
        <div>
          <Route path="/B" component={B}/>
          <Link to="/B">to B</Link><br/>
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(<A/>,document.querySelector("#btn"))
if (module.hot) {
     module.hot.accept()
}

```

安装`babel-plugin-dynamic-import-webpack`,修改`.babelrc`
```
{
    "presets": ["@babel/preset-react","@babel/preset-env"],
    "plugins": ["dynamic-import-webpack"]
  }
  
```

使用`webpack-dev-server`启动，发现页面初始加载`mian.js`,点击后又加载`1.js`,实现了按需加载

![img1](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181126-02.png)

### 嵌套路由按需加载

修改`a.js`

```js
import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const Loading = (props) => {
  return <div>Loading...</div>
};
const B = Loadable({
  loader: () => import('./b.js'),
  loading: Loading,
})
const C = Loadable({
  loader: () => import('./c.js'),
  loading: Loading,
})
export default class A extends Component{
  render(){
    return <div>
      <Router>
        <div>
          <Route path="/B" component={B}/>
          <Route path="/C" component={C}/>
          <Link to="/B">to B</Link><br/>
          <Link to="/C">to C</Link>
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(<A/>,document.querySelector("#btn"))
if (module.hot) {
     module.hot.accept()
}

```

增加`c.js`和`d.js`

```js

import React,{Component} from 'react';
import { Route,Link} from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = (props) => {
  return <div>Loadingc...</div>
};

const D = Loadable({
  loader: () => import('./d.js'),
  loading: Loading,
})
export default class C extends Component{
  render(){
    return <div>
      this is C
      <Route path="/C/D" component={D}/>
      <Link to="/C/D">to D</Link>
    </div>
  }
}
```

- 入口文件引入两个动态路由B、C
- c.js中嵌套了路由/C/D
- 路由/C/D中使用了按需组件D

启动后发现正常，实现了按需加载


### 封装

import不支持动态路径，是因为webpack需要先扫一遍js文件，找出里面按需加载的部分，进行按需打包，但不会关心内部的js执行上下文，也就是说，在webpack扫描的时候，js中的变量并不会计算出结果，所以import不支持动态路径。所以只能封装非import部分
```js
const LazyLoad = loader => Loadable({
  loader,
  loading:Loading,
})


```

修改`a.js`

```js
import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const Loading = (props) => {
  return <div>Loading...</div>
};

const LazyLoad = loader => Loadable({
  loader,
  loading:Loading,
})
const B = LazyLoad(()=>import('./b.js'));
const C = LazyLoad(()=>import('./c.js'));

export default class A extends Component{
  render(){
    return <div>
      <Router>
        <div>
          <Route path="/B" component={B}/>
          <Route path="/C" component={C}/>
          <Link to="/B">to B</Link><br/>
          <Link to="/C">to C</Link>
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(<A/>,document.querySelector("#btn"))
if (module.hot) {
     module.hot.accept()
}
```

### 按需加载+router config

添加`LazyLoad.js`

```js
import React from 'react';
import Loadable from 'react-loadable';
const Loading = (props) => {
  return <div>Loading...</div>
};

export default loader => Loadable({
  loader,
  loading:Loading,
})

```

创建`routes.js`
```js
import LazyLoad from './LazyLoad';
export default [
  {
    path: "/B",
    component: LazyLoad(()=>import('./b.js'))
  },
  {
    path: "/C",
    component: LazyLoad(()=>import('./c.js')),
    routes: [
      {
        path: "/C/D",
        component: LazyLoad(()=>import('./d.js'))
      },
      {
        path: "/C/E",
        component: LazyLoad(()=>import('./e.js'))
      }
    ]
  }
];

```

添加`utils.js`

```js
import React from 'react';
import {Route} from 'react-router-dom';
export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

```

修改`a.js`
```js
import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import ReactDom from 'react-dom';

import {RouteWithSubRoutes} from './utils';
import routes from './routes';

export default class A extends Component{
  render(){
    return <div>
      <Router>
        <div>
          <Link to="/B">to B</Link><br/>
          <Link to="/C">to C</Link>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(<A/>,document.querySelector("#btn"))
if (module.hot) {
     module.hot.accept()
}

```

修改`c.js`
```js
import React,{Component} from 'react';
import {RouteWithSubRoutes} from './utils';
import { Link} from 'react-router-dom';

export default ({ routes }) => (
  <div>
    this is C
    <Link to="/C/D">to D</Link>
    <Link to="/C/E">to E</Link>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </div>
);

```

- 引入RouteWithSubRoutes工具方法
- 暴露的函数接受一个参数routes

>文章参考自[脑阔疼的webpack按需加载](https://juejin.im/post/5bf61082f265da616a474b5c?utm_source=gold_browser_extension)