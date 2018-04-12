---
title: break-camelCase
date: 2017-12-25 14:38:48
tags: javascript
categories: codewars
---
## title
Complete the solution so that the function will break up camel casing, using a space between words.

example
```javascript
solution('camelCasing') // => should return 'camel Casing'
```
<!--### Notes:
Note that the Java version expects a return value of null for an empty string or null.-->
---
## My solution 

```javascript
function solution(string) {
    var newString = string.toLowerCase();
    var result = [];
    var j = 0;
    for(var i = 0;i<string.length;i++){
        if(string.charAt(i) != newString.charAt(i)){
            result.push(string.slice(j,i));
            j = i;
        }
    }
    result.push(string.slice(j));
    return result.join(' ');
}

```


## good solution

```javascript
function solution(string) {
  return(string.replace(/([A-Z])/g, ' $1'));

}
```