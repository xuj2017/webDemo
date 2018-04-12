---
title: Pascal's-Triangle
date: 2017-12-26 10:02:45
tags: javascript
categories: codewars
---
## title
![image](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/PascalTriangleAnimated2.gif/220px-PascalTriangleAnimated2.gif)

Wikipedia article on Pascal's Triangle: [http://en.wikipedia.org/wiki/Pascal's_triangle](http://en.wikipedia.org/wiki/Pascal's_triangle)

### example
```javascript
pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]
```
<!--### Notes:
Note that the Java version expects a return value of null for an empty string or null.-->
---
## My solution 

```javascript
function pascalsTriangle(n) {
  //return a flat array representing the values of Pascal's Triangle to the n-th level
  var result = [];
  var partPre = [];
  for(var i = 1;i<=n;i++){
    var part = Array(i).fill(1);
    for(var j = 1;j<i-1;j++){
        part[j] = partPre[j]+partPre[j-1];
    }
    
    partPre = [].concat(part);
    result = result.concat(part);
  }
  return result;
}

```


## good solution

```javascript
function pascalsTriangle(n) {
  if (n === 1) {
    return [1];
  }
  var prev = pascalsTriangle(n - 1), len = prev.length;
  prev.push(1);
  for (var i = len - n + 1; i < len - 1; i ++) {
    prev.push(prev[i] + prev[i + 1]);
  }
  prev.push(1);
  return prev;
}
```