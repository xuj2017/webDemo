---
title: node 小型库阅读
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
> 判断是否为数字[github](https://github.com/jonschlinkert/is-number)

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
> 数组取值[github](https://github.com/jonschlinkert/array-slice)

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
> 获取数组的第一个元素或者前n个元素[github](https://github.com/jonschlinkert/array-first)

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


## 5.array-last

> 获取数组的最后一个元素或者最后n个元素[github](https://github.com/jonschlinkert/array-last)

```js
  var isNumber = require('is-number');

  module.exports = function last(arr, n) {
    //判断是否为数组
    if (!Array.isArray(arr)) {
      throw new Error('expected the first argument to be an array');
    }

    //数组长度判断
    var len = arr.length;
    if (len === 0) {
      return null;
    }

    //第二个参数初始化
    n = isNumber(n) ? +n : 1;
    if (n === 1) {
      return arr[len - 1];
    }

    //通过while循环倒序取值，并返回相应的结果
    var res = new Array(n);
    while (n--) {
      res[n] = arr[--len];
    }
    return res;
  };
```

`Example`
```js
  var last = require('array-last');

  last(['a', 'b', 'c', 'd', 'e', 'f']);
  //=> 'f'

  last(['a', 'b', 'c', 'd', 'e', 'f'], 1);
  //=> 'f'

  last(['a', 'b', 'c', 'd', 'e', 'f'], 3);
  //=> ['d', 'e', 'f']
```

## 6.arr-flatten

> 利用递归进行数组平坦化[github](https://github.com/jonschlinkert/arr-flatten)

```js
'use strict';

module.exports = function (arr) {
  return flat(arr, []);
};

function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    //判读该元素是否为数组，如果是则递归，否则将值push进res中(res为空数组)
    Array.isArray(cur) ? flat(cur, res) : res.push(cur);
  }
  return res;
}
```
`Example`

```js
var flatten = require('arr-flatten');

flatten(['a', ['b', ['c']], 'd', ['e']]);
//=> ['a', 'b', 'c', 'd', 'e']
```

## 7.dedupe

> 删除数组中的重复的值[github](https://github.com/seriousManual/dedupe)

```js
function dedupe (client, hasher) {
    hasher = hasher || JSON.stringify//后面用于将元素字符串化

    const clone = []//保存最后的结果
    const lookup = {} //用于判断元素是否重复

    for (let i = 0; i < client.length; i++) {
        let elem = client[i]
        let hashed = hasher(elem)//JSON.stringify(elem)

        if (!lookup[hashed]) {
            clone.push(elem)
            lookup[hashed] = true
        }
    }

    return clone
}

module.exports = dedupe
```
`Example`

```js
var dedupe = require('dedupe')

dedupe([1, 2, 2, 3])//result: [1, 2, 3]

dedupe({a: 2}, {a: 1}, {a: 1}, {a: 1}) //result: [{a: 2}, {a: 1}]

dedupe([{a: 2, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}])//result: [{a: 2, b: 1}, {a: 1,b: 2}]
```

## 8.array-range

> 通过给定的范围返回一个递增数组[github](https://github.com/mattdesl/array-range)

```js
module.exports = function newArray(start, end) {
    var n0 = typeof start === 'number',//记录start是否为数字
        n1 = typeof end === 'number'//记录end是否为数字

    if (n0 && !n1) {//如果仅start为数字，则（0,start）
        end = start
        start = 0
    } else if (!n0 && !n1) {//如果均不为数字，则（0,0）
        start = 0
        end = 0
    }

    start = start|0
    end = end|0
    var len = end-start//长度
    if (len<0)
        throw new Error('array length must be positive')
    
    var a = new Array(len)//最终返回值
    for (var i=0, c=start; i<len; i++, c++)
        a[i] = c
    return a
}
```
`Example`

```js
var range = require('array-range')
range(3)       // -> [ 0, 1, 2 ]
range(1, 4)    // -> [ 1, 2, 3 ]
array(5).map( x => x*x )
// -> [ 0, 1, 4, 9, 16 ]

array(2, 10).filter( x => x%2===0 )
// -> [ 2, 4, 6, 8 ]
```
## 9 arr-diff

>从第一个数组中返回一个与其他数组值均不同的数组[github](https://github.com/jonschlinkert/arr-diff)

```js
module.exports = function diff(arr/*, arrays*/) {
  var len = arguments.length;//参数的个数
  var idx = 0;
  while (++idx < len) {//++idx=>1
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
};

//通过比对两个数组，返回一个不同于第二个数组值的新数组
function diffArray(one, two) {
  //如果two不是数组则直接返回one
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var tlen = two.length//数组two的长度
  var olen = one.length;//数组one的长度
  var idx = -1;
  var arr = [];

  //++idx=>0
  while (++idx < olen) {
    var ele = one[idx];//去数组one的第一个值

    //用于判断在数组two中是否存在ele
    var hasEle = false;
    for (var i = 0; i < tlen; i++) {
      var val = two[i];

      if (ele === val) {
        hasEle = true;
        break;
      }
    }

    //不存在的话，就将值push进arr中
    if (hasEle === false) {
      arr.push(ele);
    }
  }
  return arr;
}
```
`Example`

```js
var diff = require('arr-diff');

var a = ['a', 'b', 'c', 'd'];
var b = ['b', 'c'];

console.log(diff(a, b))
//=> ['a', 'd']
```

## 10.filled-array

> 返回一个有指定值填充的数组[github](https://github.com/sindresorhus/filled-array)

```js
module.exports = function (item, n) {
	var ret = new Array(n);//新建一个长度为n的数组
	var isFn = typeof item === 'function';//判断item是否为函数

  //如果item不是函数且fill兼容的话，则使用fill方法填充值
	if (!isFn && typeof ret.fill === 'function') {
		return ret.fill(item);
	}
  //如果不支持fill，则通过循环填充
  //当item是函数时，执行item
	for (var i = 0; i < n; i++) {
		ret[i] = isFn ? item(i, n, ret) : item;
	}

	return ret;
};
```
`Example`

```js
const filledArray = require('filled-array');

filledArray('x', 3);
//=> ['x', 'x', 'x']

filledArray(0, 3);
//=> [0, 0, 0]

filledArray(i => {
	return (++i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i;
}, 15);
//=> [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
```
## 11.map-obj
> 映射对象的键值到新的对象中[github](https://github.com/sindresorhus/map-obj)

```js
//检测是否为对象
const isObject = x =>
	typeof x === 'object' &&
	x !== null &&
	!(x instanceof RegExp) &&
	!(x instanceof Error) &&
	!(x instanceof Date);

module.exports = function mapObj(obj, fn, opts, seen) {
	opts = Object.assign({
		deep: false,
		target: {}
	}, opts);

	seen = seen || new WeakMap();

	if (seen.has(obj)) {
		return seen.get(obj);
	}

	seen.set(obj, opts.target);

	const target = opts.target;
	delete opts.target;

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (opts.deep && isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map(x => isObject(x) ? mapObj(x, fn, opts, seen) : x);
			} else {
				newVal = mapObj(newVal, fn, opts, seen);
			}
		}

		target[res[0]] = newVal;
	}

	return target;
};
```

## 12.map-array

> 映射对象的键和值到数组中[github](https://github.com/parro-it/map-array)

```js
const map = require('map-obj');

function mapToArray(obj, fn) {
	let idx = 0;
	const result = map(obj, (key, value) =>
		[idx++, fn(key, value)]
	);
	result.length = idx;
	return Array.from(result);
}

module.exports = mapToArray;
```
