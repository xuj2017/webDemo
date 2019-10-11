---
title: vue开发技巧
date: 2019-10-09 16:18:10
tags: vue
---

### 前言

vue的基本语法很容易上手，但是有一些优化的写法我们在开发的时候不一定难能想到，本文列举了一些vue开发的技巧

### 1.require.context

如果我们在一个组件中需要导入很多其他组件，我们通常会这么写：
```js
import titleCom from '@/components/home/titleCom'
import bannerCom from '@/components/home/bannerCom'
import cellCom from '@/components/home/cellCom'
export default{
    components:{titleCom,bannerCom,cellCom}
    ....
}
```
但是如果存在大量的组件导入，我们可以利用`webpack`的`require.context`[api](https://webpack.js.org/guides/dependency-management/#requirecontext)统一引入

```js
const path = require('path')
const files = require.context('@/components/home', false, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})
export default{
    components:modules
}
```
> require.context(directory,useSubdirectories,regExp)
接收三个参数:
`directory`：说明需要检索的目录
`useSubdirectories`：是否检索子目录
`regExp`: 匹配文件的正则表达式,一般是文件名

### 2.watch
当我们需要初始化加载页面，又在监听某个值后重新加载页面的时候，我们一般这么写：
```js
created(){
  this.getList()
},
watch: {
  inpVal(){
    this.getList()
  }
}
```
我们可以利用`handler`和`immediate`属性来优化
```js
//该回调将会在侦听开始之后被立即调用
watch: {
  inpVal:{
    handler: 'getList',
    immediate: true
  }
}
```
当有复杂的数据类型时，我们也可以用`deep`属性进行深度监听
```js
//该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
watch:{
  inpValObj:{
    handler(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    },
    deep:true
  }
}
```
> 此时发现oldVal和 newVal 值一样; 因为它们索引同一个对象/数组,Vue 不会保留修改之前值的副本; 所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化

### 3.组件间的通讯

#### 1.Props
父传子的属性
```js
// 数组:不建议使用
props:[]

// 对象
props:{
 inpVal:{
  type:Number, //传入值限定类型
  // type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol
  // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  required: true, //是否必传
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
}

```

#### 2.$emit
字传父，触发父组件的自定义事件
```html
// 父组件
<home @title="title">
// 子组件
this.$emit('title',[{title:'这是title'}])

```

#### 3.vuex
`vuex`是一个状态管理器，适用于数据共享多的项目，是一个独立的插件
```js
state:定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
getter:获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或 mapGetters访问
mutation:同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
action:异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions访问
modules:模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入

```

#### 4. attrs和listeners
1. attrs:如果父传子有很多值，那么在子组件需要定义多个props解决，[attrs](https://cn.vuejs.org/v2/api/#vm-attrs)用来获取父传子中未在props定义的值

```js
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
mounted() {
  console.log(this.$attrs) //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
},

```
相对应的如果子组件定义了 props,打印的值就是剔除定义的属性

```js

props: {
  width: {
    type: String,
    default: ''
  }
},
mounted() {
  console.log(this.$attrs) //{title: "这是标题", height: "80", imgUrl: "imgUrl"}
},
```

2. listeners:子组件需要调用父组件的犯法解决，父组件的方法可以用过`v-on="listens"`传入内部组件

```html
// 父组件
<home @change="change"/>

// 子组件
mounted() {
  console.log(this.$listeners) //即可拿到 change 事件
}

```

#### 5.provide和inject
> `provide` 和 `inject` 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
```js
//父组件:
provide: { //provide 是一个对象,提供一个属性或方法
  foo: '这是 foo',
  fooMethod:()=>{
    console.log('父组件 fooMethod 被调用')
  }
},

// 子或者孙子组件
inject: ['foo','fooMethod'], //数组或者对象,注入到子组件
mounted() {
  this.fooMethod()
  console.log(this.foo)
}
//在父组件下面所有的子组件都可以利用inject

```
> provide 和 inject 绑定并不是可响应的。

```js
//父组件:
provide: { 
  foo: '这是 foo'
},
mounted(){
  this.foo='这是新的 foo'
}

// 子或者孙子组件
inject: ['foo'], 
mounted() {
  console.log(this.foo) //子组件打印的还是'这是 foo'
}
```

#### 6.parent和children

```js
//父组件
mounted(){
  console.log(this.$children) 
  //可以拿到 一级子组件的属性和方法
  //所以就可以直接改变 data,或者调用 methods 方法
}

//子组件
mounted(){
  console.log(this.$parent) //可以拿到 parent 的属性和方法
}

```

#### 7.$refs
> $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。

```js
// 父组件
<home ref="home"/>

mounted(){
  console.log(this.$refs.home) //即可拿到子组件的实例,就可以直接操作 data 和 methods
}

```

#### 8.$root
> 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己

```js
// 父组件
mounted(){
  console.log(this.$root) //获取根实例,最后所有组件都是挂载到根实例上
  console.log(this.$root.$children[0]) //获取根实例的一级子组件
  console.log(this.$root.$children[0].$children[0]) //获取根实例的二级子组件
}
```

#### 9.sync
> (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

```html
// 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}

```
#### 10 v-slot
>  1.slot,slot-cope,scope 在 2.6.0 中都被废弃,但未被移除 
2.作用就是将父组件的 template 传入子组件 
3.插槽分类: A.匿名插槽(也叫默认插槽): 没有命名,有且只有一个; 

```js
// 父组件
<todo-list> 
    <template v-slot:default>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list> 

// 子组件
<slot>我是默认值</slot>
//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写
```
B.具名插槽: 相对匿名插槽组件slot标签带name命名的;
```js
// 父组件
<todo-list> 
    <template v-slot:todo>
       任意内容
       <p>我是匿名插槽 </p>
    </template>
</todo-list> 

//子组件
<slot name="todo">我是默认值</slot>

```
C.作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)

```html
// 父组件
<todo-list>
 <template v-slot:todo="slotProps" >
   {{slotProps.user.firstName}}
 </template> 
</todo-list> 
//slotProps 可以随意命名
//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

// 子组件
<slot name="todo" :user="user" :test="test">
    {{ user.lastName }}
 </slot> 
data() {
    return {
      user:{
        lastName:"Zhang",
        firstName:"yue"
      },
      test:[1,2,3,4]
    }
  },
// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(="slotProps")
```

#### 11 EventBus
> 1.就是声明一个全局Vue实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上; 
2.类似于 Vuex。但这种方式只适用于极小的项目 
3.原理就是利用on和emit 并实例化一个全局 vue 实现数据共享
4.可以实现平级,嵌套组件传值,但是对应的事件名eventTarget必须是全局唯一的
```js
// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit('eventTarget','这是eventTarget传过来的值')

// 接收组件
this.$eventBus.$on("eventTarget",v=>{
  console.log('eventTarget',v);//这是eventTarget传过来的值
})

```

#### 13 Vue.observable
> 用法:让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象;
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新;
也可以作为最小化的跨组件状态存储器，用于简单的场景。
通讯原理实质上是利用Vue.observable实现一个简易的 vuex

```html
// 文件路径 - /store/store.js
import Vue from 'vue'

export const store = Vue.observable({ count: 0 })
export const mutations = {
  setCount (count) {
    store.count = count
  }
}

//使用
<template>
    <div>
        <label for="bookNum">数 量</label>
            <button @click="setCount(count+1)">+</button>
            <span>{{count}}</span>
            <button @click="setCount(count-1)">-</button>
    </div>
</template>

<script>
import { store, mutations } from '../store/store' // Vue2.6新增API Observable

export default {
  name: 'Add',
  computed: {
    count () {
      return store.count
    }
  },
  methods: {
    setCount: mutations.setCount
  }
}
</script>

```

### 4 路由传参
方案一
```js
// 路由定义
{
  path: '/describe/:id',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: `/describe/${id}`,
})
// 页面获取
this.$route.params.id
```
方案二
```js
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  omponent: Describe
}
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id

```
方案三
```js
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: '/describe',
    query: {
      id: id
  `}
)
// 页面获取
this.$route.query.id

```

### 5 render函数
> 1.有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用啦
2.render 和 template 的对比 前者适合复杂逻辑,后者适合逻辑简单; 后者属于声明是渲染，前者属于自定Render函数; 前者的性能较高，后者性能较低。
```html
// 根据 props 生成标签
// 初级
<template>
  <div>
    <div v-if="level === 1"> <slot></slot> </div>
    <p v-else-if="level === 2"> <slot></slot> </p>
    <h1 v-else-if="level === 3"> <slot></slot> </h1>
    <h2 v-else-if="level === 4"> <slot></slot> </h2>
    <strong v-else-if="level === 5"> <slot></slot> </stong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

// 优化版,利用 render 函数减小了代码重复率
<template>
  <div>
    <child :level="level">Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
    }
  })   
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
</script>
```

### 6 异步组件

> 项目过大就会导致加载缓慢，利用异步组件实现按需加载可以提高加载速度

```js
//第一种
Vue.component('async-webpack-example',resolve=>{
    // 这个特殊的 `require` 语法将会告诉 webpack
    // 自动将你的构建代码切割成多个包, 这些包
    // 会通过 Ajax 请求加载
    require(['./my-async-component'],resolve)
})

//第二种
// 工厂函数返回 Promise
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)


// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```
> 异步组件的渲染本质上其实就是执行2次或者2次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为loading节点, 在渲染为请求完成的组件

路由的按需加载

```js
webpack< 2.4 时
{
  path:'/',
  name:'home',
  components:resolve=>require(['@/components/home'],resolve)
}

webpack> 2.4 时
{
  path:'/',
  name:'home',
  components:()=>import('@/components/home')
}

//import()方法由es6提出，import()方法是动态加载，返回一个Promise对象，then方法的参数是加载到的模块。类似于Node.js的require方法，主要import()方法是异步加载的。
```

### 7.动态组件
做一个tan切换时就会涉及到组件的动态加载

```js
//动画
<transition>
    //缓存
    <keep-alive> 
        <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
</transition>

```

### 8.递归组件

如果开发一个 tree 组件,里面层级是根据后台数据决定的,这个时候就需要用到递归组件

```js
// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。
// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，
// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded
// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：
// 联级选择器和树形控件 
// 递归组件必须设置name 和结束的阀值

<template>
  <div v-for="(item,index) in treeArr">
      子组件，当前层级值： {{index}} <br/>
      <!-- 递归调用自身, 后台判断是否不存在改值 -->
      <tree :item="item.arr" v-if="item.flag"></tree>
  </div>
</template>
<script>
export default {
  // 必须定义name，组件内部才能递归调用
  name: 'tree',
  data(){
    return {}
  },
  // 接收外部传入的值
  props: {
     item: {
      type:Array,
      default: ()=>[]
    }
  }
}
</script>
```

### 9. [函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)
定义:无状态,无法实例化，内部没有任何生命周期处理方法 规则:在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。
在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的特性都会被自动隐式解析为 prop
在 2.5.0 及以上版本中，如果你使用了单文件组件(就是普通的.vue 文件),可以直接在 temp

组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：

- props：提供所有 prop 的对象
- children: VNode 子节点的数组
- slots: 一个函数，返回了包含所有插槽的对象
- scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- parent：对父组件的引用
- listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
- injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

```js
<template functional>
  <div v-for="(item,index) in props.arr">{{item}}</div>
</template>
```

### 10.components 和Vue.component
```js
//components:局部注册组件
export default{
    components:{home}
}

//Vue.component:全局注册组件
Vue.component('home',home)
```

### 11 Vue.extend

vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)
```