---
title: mpvue开发cnode社区问题记录
date: 2018-07-23 18:51:34
tags: javascript
categories: mpvue
---
> [mpvue](https://github.com/Meituan-Dianping/mpvue) 是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验

开发这款小程序主要是为了体验mpvue框架的开发流程，所以在部分界面功能上借鉴了其他开源项目([mpvue-node](https://github.com/jaxQin/mpvue-cnode))，对此表示非常感谢!

由于`涉及个人小程序未允许内容：文娱-资讯（含有评论功能）`,所有小程序没有发布成功，只能在本地浏览

本文主要是为了记录在使用mpvue开发时所遇到的一些地方


### 1. vuex 的使用
   
```js
    //在src/main.js 中
    import store from './store/index';
    Vue.prototype.$store = store;
```

### 2. 提示：单个 JS 文件的体积超过了 500KB，则会跳过 ES6 转 ES5 以及代码压缩的处理

在开发过程中，微信开发工具会提醒你`提示：单个 JS 文件的体积超过了 500KB，则会跳过 ES6 转 ES5 以及代码压缩的处理`;
其实这个不需要处理，因为`mpvue`的构建工具已经有 ES6 转 ES5 和压缩功能，可以关闭开发者工具的这些功能[issues](https://github.com/Meituan-Dianping/mpvue/issues/550)

目前mpvue不支持分包加载，如果需要使用可参考[590](https://github.com/Meituan-Dianping/mpvue/issues/590) [672](https://github.com/Meituan-Dianping/mpvue/issues/672)

### 3.接口请求失败

小程序开发所用的接口，均来源于[cNode社区](https://cnodejs.org/api)，在开发中如果提示你接口请求失败，可能是你没有设置request合法域名，在小程序开公众平台->开发设置->服务器域名中设置request合法域名

### 4.this指向问题

 在开发中，有时会调用小程序的官网api，会导致this指向出错获取不到真确数据
 ```js
 //例如
export default {
    data(){
        return{
            accesstoken:null
        }
    },
    methods:{
        dd(){
            //
            let vue = this;
            wx.showModal({
                content:'这是弹窗'，
                showCancel: false,
                confirmText: "确定",
                complete() {
                    //扫描二维码
                    wx.scanCode({
                        success(res) {
                            //这里的this会指向wx，需要使用上面定义的vue
                            vue.accesstoken = res.result;
                        }
                    });
                }
            })
        }
    }
}
 
 ```
### 5.mpvue 不支持部分复杂的 JavaScript 渲染表达式

  也就是你在模板中不能直接只有methods中方法

```
//这样写页面无法渲染
<div>{{getTimeInfo(item.create_at)}}</div>
```
需要这样写
```js
//template
<div>{{item.createTime}}</div>

//js
//需要在获取数据的时候，处理数据
this.list = this._normalizeTopics(res)

_normalizeTopics(json) {
      return json.map(item => {
        return Object.assign(item, {
          createTime: formatTime(item.create_at),
    });
  });
}
```

### 6.created生命周期


所有页面的created会在小程序加载的时候一起执行，不管页面你是否打开，

如果需要在页面加载的时候执行操作，可利用小程序本身的生命周期

```js
async onLoad(){}
```

### 7.路由及参数

mpvue中不能使用vue-router，所有需要用小程序自身的api进行页面跳转，如
```
wx.navigateTo({
  url: 'test?id=1'
})
```

如果需要获取路由参数，有下面两种方式

```js

 async onLoad(option) {
    //通过option参数获取
    let id = option.id;
    
    //通过this.$root.$mp.query方式获取
    let id = this.$root.$mp.query.id
 }

```
### 8.列表渲染时需增加索引，否则会发生警告

```js
<div v-for="(item,index) in list" :key="index">
```

### 9. 改变page 标签的css属性

在开发时，有时需要设置页面`100%`的高度,在平时开发时，只需要
```css
page{
    height:100%
}
```
但是在mpvue中开始不起作用，后来发现是scoped属性的原因去掉即可
```js
<style lang="scss"></style>
```

## 预览

![preview](https://user-gold-cdn.xitu.io/2018/7/23/164c66484d08bf41?w=324&h=684&f=jpeg&s=42175)
![preview](https://user-gold-cdn.xitu.io/2018/7/23/164c66484d1e1f02?w=324&h=684&f=jpeg&s=53112)
![preview](https://user-gold-cdn.xitu.io/2018/7/23/164c6648624d5f42?w=324&h=684&f=jpeg&s=15470)
![preview](https://user-gold-cdn.xitu.io/2018/7/23/164c66484e6dbef9?w=324&h=684&f=jpeg&s=38990)
![preview](https://user-gold-cdn.xitu.io/2018/7/23/164c66485d56071a?w=324&h=684&f=jpeg&s=43545)


目前小程序初始的样子已经开发完成，但是还有很多待完善的地方，由于首次开发小程序，所有在代码上还存在很多不足之处，项目纯属自娱自乐，勿喷！！！

项目地址[mpvue-node](https://github.com/xuj2017/mpvue-cnode)