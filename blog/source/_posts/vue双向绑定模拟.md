---
title: vue双向绑定模拟
date: 2018-03-12 14:08:34
tags: vue
categories: vue
---

### 利用`Object.defineProperty`属性模拟vue实现双向绑定

> 实现`v-model`、`v-bind`、`vue-click`效果

```html
    <!-- DOM格式 -->
    <div id="app">
        <input type="text" v-model="number">
        <button v-click="add">增加</button>
        <h3 v-bind="number"></h3>
    </div>
```
```js
//调用方法
var test = new Vue({
    el: '#app',
    data: {
        number: 0
    },
    methods: {
        add() {
            this.number++;
        }
    }
})
```

```js
//vue构造函数
function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function (options) {
    this.$options = options;
    this.$data = this.$options.data;
    this.$el = document.querySelector(this.$options.el);
    this.$methods = this.$options.methods;
    this._binding = {};
    this.observe(this.$data);
    this.compile(this.$el)
}

Vue.prototype.observe = function (obj) {
    var value
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            this._binding[key] = {
                _directive: []
            }
        }

        value = obj[key];
        if (typeof value === 'object') {
            this.observe(value)
        }
        var binding = this._binding[key];

        Object.defineProperty(this.$data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return value;
            },
            set: function (newVal) {
                if (value === newVal) return;

                value =newVal
                binding._directive.forEach(function (item) {
                    item.update();
                })
            }
        })
    }
}

Vue.prototype.compile = function (root) {
    var _this = this;
    var nodes = root.children;

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.children.length > 0) {
            _this.compile(node)
        }

        //v-click绑定
        if (node.hasAttribute('v-click')) {
            var clickName = node.getAttribute('v-click');
            node.onclick =_this.$methods[clickName].bind(_this.$data)
        }

        //v-model绑定
        if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === "TESTAREA")) {
            node.addEventListener('input', (function (key) {
                var attrVal = node.getAttribute('v-model');
                _this._binding[attrVal]._directive.push(new Watcher(
                    node, 'value', attrVal, _this
                ))
                return function () {
                    _this.$data[attrVal] = nodes[key].value;
                }
                return function() {
                _this.$data[attrVal] =  nodes[key].value;
            }
            })(i))
        }

        //v-binf绑定
        if (node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal]._directive.push(new Watcher(
                node,
                'innerHTML',
                attrVal,
                _this
            ))
        }
    }
}


function Watcher(node, method, name, vm) {
    this.node = node;//dom元素
    this.method = method;//方法:value,innnerHtml
    this.name = name;//数据名称：name
    this.vm = vm//Vue实例

    this.update();
}
//更新dom
Watcher.prototype.update = function () {
    this.node[this.method] = this.vm.$data[this.name]
}
```

