---
title: uniqueInOrder
date: 2017-12-20 17:52:43
tags: javascript
categories: codewars
---
## title
Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.
### example
```javascript
uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]
```

---
## My solution 

```javascript
var uniqueInOrder=function(iterable){
  //your code here - remember iterable can be a string or an array
  if(iterable.length==0){
    return [];
  }
  if(typeof iterable=='string'){
      iterable = iterable.split("");
  }

  var result = [];;
  for(var i = 0;i<iterable.length;i++){
    if(i == 0){
      result.push(iterable[0])
    }else if(iterable[i] != iterable[i-1]){
      result.push(iterable[i])
    }
  }
  return result;
}
```


## good solution

### one
```javascript
function uniqueInOrder(it) {
  var result = []
  var last
  
  for (var i = 0; i < it.length; i++) {
    if (it[i] !== last) {
      result.push(last = it[i])
    }
  }
  
  return result
}


var uniqueInOrder = function (iterable)
{
  return [].filter.call(iterable, (function (a, i) { return iterable[i - 1] !== a }));
}

var uniqueInOrder=function(iterable){
  return Array.prototype.reduce.call(iterable, function(a,b) { if (a[a.length-1] !== b) a.push(b); return a; }, []);
}

```