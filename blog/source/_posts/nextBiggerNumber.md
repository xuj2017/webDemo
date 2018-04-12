---
title: Next bigger number with the same digits***
date: 2017-12-21 16:24:52
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

### good soulutions
```javascript
//one 
function nextBigger(n){
  console.log(n);
  var chars = n.toString().split('');
  var i = chars.length-1;
  while(i > 0) {
    if (chars[i]>chars[i-1]) break;
    i--;
  }
  if (i == 0) return -1;
  var suf = chars.splice(i).sort();
  var t = chars[chars.length-1];
  for (i = 0; i < suf.length; ++i) {
    if (suf[i] > t) break;
  }
  chars[chars.length-1] = suf[i]
  suf[i] = t;
  var res = chars.concat(suf);
  var num = parseInt(res.join(''));
  console.log("->" +num);
  return num;
}

//two 暴力
const sortedDigits = n => { let arr = n.toString().split(''); arr.sort((a, b) => b - a); return arr; };

function nextBigger(n){
  
  let arr = sortedDigits(n);
  let max = parseInt(arr.join(''), 10);
  
  for(var i = n + 1; i <= max; i++){
    if(sortedDigits(i).every((x, j) => x === arr[j])){
      return i;
    }
  }
  
  return -1;
}
```