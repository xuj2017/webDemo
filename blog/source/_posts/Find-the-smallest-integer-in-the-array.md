---
title: Find the smallest integer in the array
tags: javascript
categories: codewars
date: 2017-07-21 13:27:06
---
## title
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

### Find the smallest integer in the array.
    Given an array of integers your solution should find the smallest integer. For example:

### Notes:
- Given [34, 15, 88, 2] your solution will return 2
- Given [34, -345, -1, 100] your solution will return -345
You can assume, for the purpose of this kata, that the supplied array will not be empty.

### 翻译
    找出最小数

---
## My solution 

```javascript
 function  findSmallestInt(args){
    if(!args){return}
    var minNum = args[0];
    for(var item in args){
        if(parseInt(minNum)>parseInt(args[item])){
            minNum = args[item]           
        }
    };
    return minNum;
}
```


## good solution

```javascript
//...为展开运算符，属于es6语法
function findSmall(args){
    //  return Math.min.apply(Math, args)
    //  return Math.min(...args)
    return Math.min.apply(null, args)
}
```