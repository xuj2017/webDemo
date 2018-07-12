---
title: node 小型库阅读(1)
date: 2018-07-12 10:08:17
tags:
---
> 记录阅读的[node模块](https://github.com/parro-it/awesome-micro-npm-packages)

## 1. is-sorted
> 一个用于检查数组是否排序的库 [github](https://github.com/dcousens/is-sorted)

```js
//默认排序函数 正序
function defaultComparator (a, b) {
  return a - b
}

module.exports = function checksort (array, comparator) {
  //用于检查array是否为数组
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))
  //设置comparator的默认值为defaultComparator即为正序
  comparator = comparator || defaultComparator

  //循环数组，判断相邻两数之差是否大于0，不是的话返回false
  for (var i = 1, length = array.length; i < length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) return false
  }

  return true
}
```
`Example`

```js
import sorted from 'is-sorted'

sorted([1,2,3])//=> true

sorted([1,3,2])//=> false

sorted([3,2,1],(a,b)=>b-a)//=> true

```
## 2.is-number
> 判断是否为数字

```js
module.exports = function(num) {
  //判断num 类型是否为number =>eg:10,5e3,0xff,+[]
  if (typeof num === 'number') {
   
    //去除NaN，typeof NaN === 'number'
    //NaN-NaN === NaN
    
    return num - num === 0;
  }
  
  // 判断num是否为不为空的字符串
  if (typeof num === 'string' && num.trim() !== '') {
    //isFinite 用于判断数字是否为有穷数
    //+num 转化为数值类型
    // Number.isFinite和isFinite区别在于：isFinite会将参数转化为数值，且兼容性高
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

```
`Example`

```js
import isNumber from 'is-number'
isNumber(5e3);               // true
isNumber(0xff);              // true
isNumber(-1.1);              // true
isNumber(0);                 // true
isNumber(1);                 // true
isNumber(1.1);               // true
isNumber(10);                // true
isNumber(10.10);             // true
isNumber(100);               // true
isNumber('-1.1');            // true
isNumber('0');               // true
isNumber('012');             // true
isNumber('0xff');            // true
isNumber('1');               // true
isNumber('1.1');             // true
isNumber('10');              // true
isNumber('10.10');           // true
isNumber('100');             // true
isNumber('5e3');             // true
isNumber(parseInt('012'));   // true
isNumber(parseFloat('012')); // true

isNumber(Infinity);          // false
isNumber(NaN);               // false
isNumber(null);              // false
isNumber(undefined);         // false
isNumber('');                // false
isNumber('   ');             // false
isNumber('foo');             // false
isNumber([1]);               // false
isNumber([]);                // false
isNumber(function () {});    // false
isNumber({});                // false

```
## 3.array-slice
> 数组取值

```js
module.exports = function slice(arr, start, end) {
  var len = arr.length;
  var range = [];

  start = idx(len, start);
  end = idx(len, end, len);
  
  //通过比较start和end的大小，循环将值push进range中，已达到取值的目的
  while (start < end) {
    range.push(arr[start++]);
  }
  return range;
};

//对pos进行处理，即：开始取值的位置
// 默认为end或0
function idx(len, pos, end) {
  if (pos == null) {
    pos = end || 0;
  } else if (pos < 0) {
    pos = Math.max(len + pos, 0);
  } else {
    pos = Math.min(pos, len);
  }

  return pos;
}
```
`Example`

```js
var slice = require('array-slice');
var arr = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

slice(arr, 3, 6);
//=> ['e', 'f', 'g']
```


## 4.array-first 
> 获取数组的第一个元素或者前n个元素

```js
var isNumber = require('is-number');
var slice = require('array-slice');

module.exports = function arrayFirst(arr, num) {

    //判断是否为数组
  if (!Array.isArray(arr)) {
    throw new Error('array-first expects an array as the first argument.');
  }

  if (arr.length === 0) {
    return null;
  }
  
  //通过array-slice模块进行取值，并返回结果
  var first = slice(arr, 0, isNumber(num) ? +num : 1);
  if (+num === 1 || num == null) {
    return first[0];
  }
  return first;
};

```
`Example`

```js
var first = require('array-first');

first(['a', 'b', 'c', 'd', 'e', 'f']);
//=> 'a'

first(['a', 'b', 'c', 'd', 'e', 'f'], 1);
//=> 'a'

first(['a', 'b', 'c', 'd', 'e', 'f'], 3);
//=> ['a', 'b', 'c']
```