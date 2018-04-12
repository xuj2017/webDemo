---
title: Reverse or rotate
date: 2017-07-24 10:14:16
tags: javascript
categories: codewars
---
## title
The input is a string str of digits. Cut the string into chunks (a chunk here is a substring of the initial string) of size sz (ignore the last chunk if its size is less than sz).

If a chunk represents an integer such as the sum of the cubes of its digits is divisible by 2, reverse that chunk; otherwise rotate it to the left by one position. Put together these modified chunks and return the result as a string.

If

- `sz` is <= 0 or if `str` is `empty` return ""
- `sz` is greater `(>)` than the length of `str` it is impossible to take a chunk of size `sz` hence return "".


### example
```javascript
revrot("123456987654", 6) --> "234561876549"
revrot("123456987653", 6) --> "234561356789"
revrot("66443875", 4) --> "44668753"
revrot("66443875", 8) --> "64438756"
revrot("664438769", 8) --> "67834466"
revrot("123456779", 8) --> "23456771"
revrot("", 8) --> ""
revrot("123456779", 0) --> "" 
revrot("563000655734469485", 4) --> "0365065073456944"
```

---
## My solution 

```javascript
function revrot(str, sz) {
			    // your code
    var result="";
    if(str.length<sz||str.length == 0||sz == 0){
        return result;
    }
    var cubeNum = Math.floor(str.length/sz);//判断可以分成几块
    for(var i = 0 ;i<cubeNum;i++){
        var cube = str.slice(i*sz,(i+1)*sz);
        var sum = 0;//每块求和
        for(var j = 0;j<cube.length;j++){
            sum = parseInt(cube.charAt(j)) +parseInt(sum);
        }
        if(sum%2== 0){
            for(var j =cube.length;j>=0;j--){
            result += cube.charAt(j)+'';
            }
        }else{
            var firstCode =  cube.split("").splice(0,1).toString();
                result += cube.split("").splice(1,cube.length).join("") + firstCode;
        }
    }
    return result;
}
```


## good solution

### one
```javascript
function revrot(str, sz) {
  if (sz < 1 || sz > str.length) 
    return '';

  let reverse = s => s.split('').reverse().join('');
  let rotate  = s => s.slice(1) + s.slice(0, 1);
  let sum_cubes = c => c.split('').reduce((a, b) => a + +b ** 3, 0); 

  return str
    .match(new RegExp('.{' + sz + '}', 'g'))
    .map(c => sum_cubes(c) % 2 ? rotate(c) : reverse(c))
    .join('');
}


```
### two
```javascript
function revrot(str, sz) {
   if(!sz||sz<0||sz>str.length)return '';
   var arr=str.match(new RegExp('\\d{'+sz+'}','g'));
   return arr.map(function(v){
     if(v.toString().split('').reduce((s,v)=>s+v*1,0)%2===0){
       return v.split('').reverse().join('');
     }
     else return v.slice(1)+v[0];
   }).join('');
}

```