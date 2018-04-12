---
title: nextSmallerNumber
date: 2017-12-29 17:34:44
tags: javascript
categories: codewars
---
## title
You have to create a function that takes a positive integer number and returns the next bigger number formed by the same digits:
```javascript
nextBigger(12)==21
nextBigger(513)==531
nextBigger(2017)==2071
```
If no bigger number can be composed using those digits, return -1:

```javascript
nextBigger(9)==-1
nextBigger(111)==-1
nextBigger(531)==-1
```
### mysolution
```javascript
function nextSmaller(n) {
    var chars = n.toString().split('');
    var i = chars.length -1;
    while(i>0){
    if(chars[i] < chars[i-1]) break;
    i--
    }

    if(i == 0) return -1;
    
    var suf = chars.splice(i).sort();

    var t = chars[chars.length - 1];

    for(var i =suf.length-1;i>=0;i--){
    if (suf[i] < t) break;
    }
    
    chars[chars.length - 1] = suf[i];
    suf[i] = t;
    var res = chars.concat(suf.sort((a,b)=>b-a));

    var num = parseInt(res.join(''));

    if(num.toString().length == n.toString().length ){
        return num;
    }else{
        return -1
    }
			 
```

### good soulutions
```javascript
//one 
function nextSmaller(n) {
  var digits = ('' + n).split('');
  for (var ix = digits.length - 1; ix-- > 0;) {
    if (digits[ix + 1] < digits[ix]) {
      var tail = digits.slice(ix).sort((a, b) => b - a);
      var head = tail.splice(tail.findIndex(x => x < digits[ix]), 1);
      if (!ix && '0' == head[0]) {
        return -1;
      }
      return +digits.slice(0, ix).concat(head, tail).join('');
    }
  }
  return -1;
}

//two 
const nextSmaller = n => {
  let min = minify(n);
  while (--n >= min) if (minify(n) === min) return n;
  return -1;
};

const minify = n => [...`${n}`].sort().join``.replace(/^(0+)([1-9])/, '$2$1');
```
