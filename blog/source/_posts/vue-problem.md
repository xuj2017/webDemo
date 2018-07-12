---
title: '[转]Vue项目通用问题及解决方案'
date: 2018-07-05 09:50:26
tags:
---
## 列表进入详情页的传参问题

> 商品列表页面前往详情页，需要传一个商品id;

```html
 <router-link :to="{path: 'detail', query: {id: 1}}">前往detail页面</router-link>
```
此时详情页面的路径为`http://localhost:8080/#/detail?id=1`,就算刷新页面`id`依旧会存在,获取id的方式是`this.$route.query.id`

补充一下其他两种传参：

- 如果传参通过`:to="{name: 'Detail', params: {id:1}}"`的话,这种传参方式，`params`中的参数不会出现在`url`中，所以一旦刷新页面，id就不存在了

- 还有一种传参的方式：动态路由传参。动态路由通过在路由文件中定义路由：`{ path: '/detail/:id', name: 'Detail', component: Detail }`，就是这里`/detail/:id`，在详情页可以通过`this.$route.params.id`获取传来的参数，`url`会显示为`http://localhost:8080/#/detail/123`，且刷新页面参数也会存在。对于传单个参数，这种方式实现了我们的需求，但是没法传多个参数。除非定义路由的时候，定义为`'/detail/:id/:param1/param2/param3'`，这样限制死了，必须要这样传参数。且个人角度看来，这种`/detail/1/123/1d`的`url`不如`detail?id=1&user=123&identity=1`来的优雅。

## 本地开发环境请求服务器接口跨域的问题

![error](https://user-gold-cdn.xitu.io/2018/6/7/163d84c797b26f89?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上面的这个报错大家都不会陌生，报错是说没有访问权限（跨域问题）。本地开发项目请求服务器接口的时候，因为客户端的同源策略，导致了跨域的问题。

`vue-cli`初始化的项目，在配置文件中提供了`proxyTable`来解决本地开发的跨域问题。`config`文件的`index.js`文件中，找到`proxyTable`选项，进行如下配置：

```js
proxyTable: {
      // 用‘/api’开头，代理所有请求到目标服务器
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 接口域名
        changeOrigin: true, // 是否启用跨域
        pathRewrite: { //
          '^/api': ''
        }
      }
}
```

例如请求接口：`/api/posts/1` ==>`http://jsonplaceholder.typicode.com/posts/1`

## 打包后生成很大的.map文件的问题

> 项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。 而生成的`.map`后缀的文件，就可以像未加密的代码一样，准确的输出是哪一行哪一列有错可以通过设置来不生成该类文件。但是我们在生成环境是不需要`.map`文件的，所以可以在打包时不生成这些文件：在`config/index.js`文件中，设置`productionSourceMap: false`,就可以不生成.map文件

![.map](https://user-gold-cdn.xitu.io/2018/6/8/163de300c977f7cd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## fastClick的300ms延迟解决方案

> 开发移动端项目，点击事件会有300ms延迟的问题。至于为什么会有这个问题，请自行百度即可。这里只说下常见的解决思路，不管vue项目还是jq项目，都可以使用fastClick解决。

```js
//安装
cnpm install fastclick -S

//main.js 中初始化

import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclic
```

## 组件中写选项的顺序

```js
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
```

## 查看打包后各文件的体积，把你快速定位大文件

> 如果你是`vue-cli`初始化的项目，会默认安装`webpack-bundle-analyzer`插件，该插件可以帮助我们查看项目的体积结构对比和项目中用到的所有依赖。也可以直观看到各个模块体积在整个项目中的占比。

![size](https://user-gold-cdn.xitu.io/2018/6/12/163f310014cc9b59?imageslim)

```js
npm run build --report // 直接运行，然后在浏览器打开http://127.0.0.1:8888/即可查看
```

## 开启gzip压缩代码

> `spa`这种单页应用，首屏由于一次性加载所有资源，所有首屏加载速度很慢。解决这个问题非常有效的手段之一就是前后端开启gizp（其他还有缓存、路由懒加载等等）。`gizp`其实就是帮我们减少文件体积，能压缩到30%左右，即100k的文件gizp后大约只有30k。

vue-cli初始化的项目中，是默认有此配置的，只需要开启即可。但是需要先安装插件：

```js
//安装
cnpm i compression-webpack-plugin

//在config/index.js中开启

build: {
    ………………
    productionGzip: true, // false不开启gizp，true开启
    ………………
}

```

现在打包的时候，除了会生成之前的文件，还是生成.gz结束的gzip过后的文件。具体实现就是如果客户端支持gzip，那么后台后返回gzip后的文件，如果不支持就返回正常没有gzip的文件。

