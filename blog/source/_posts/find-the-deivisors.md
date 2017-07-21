---
title: find the deivisors
date: 2017-07-21 11:09:54
tags: javascript
categories: codewars
---
## title
Create a function named divisors that takes an integer and returns an array with all of the integer's divisors(except for 1 and the number itself). If the number is prime return the string '(integer) is prime' (use Either String a in Haskell).

### Example
```javascript
    divisors(12); //should return [2,3,4,6]
    divisors(25); //should return [5]
    divisors(13); //should return "13 is prime"
```

---
## My solution 
```javascript
    function divisors(integer) {
        var helf = Math.round(integer/2);
        var arr = [];
        for(var i = 2;i<=helf;i++){
            if(integer%i == 0){
            arr.push(i)
            }
        }
        if(arr.length>0){
            return arr;
        }else{
            return integer+" is prime";
        }
    };
```

## good solution

```javascript
function divisors(integer) {
  var res = []
  for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
  return res.length ? res : integer + ' is prime'
};

```