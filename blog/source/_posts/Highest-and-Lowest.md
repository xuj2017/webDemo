---
title: Highest and Lowest
tags: javascript
categories: codewars
date: 2017-07-21 13:29:41
---
## title
In this little assignment you are given a string of space separated numbers, and have to return the highest and lowest number.

example
```javascript
highAndLow("1 2 3 4 5"); // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"
```
### Notes:
- All numbers are valid Int32, no need to validate them.
- There will always be at least one number in the input string.
- Output string must be two numbers separated by a single space, and highest number is first.
---
## My solution 

```javascript
function highAndLow(numbers){
    // ...
    var numArr = numbers.split(" ");
    var maxNum = numArr[0],mixNum = numArr[0];
    for(var i = 0;i<numArr.length;i++){
        if(parseInt(maxNum)<parseInt(numArr[i])){
        maxNum = numArr[i];
        };
        if(parseInt(mixNum)>parseInt(numArr[i])){
        mixNum = numArr[i];
        };
        console.log(maxNum,mixNum)
    }
    return maxNum+" "+mixNum;
}
```


## good solution

```javascript

```