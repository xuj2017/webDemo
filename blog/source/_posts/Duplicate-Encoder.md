---
title: Duplicate Encoder
tags: javascript
categories: codewars
date: 2017-07-21 13:24:49
---
## title
The goal of this exercise is to convert a string to a new string where each character in the new string is '(' if that character appears only once in the original string, or ')' if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.


example
```javascript
"din" => "((("

"recede" => "()()()"

"Success" => ")())())"

"(( @" => "))(("
```
<!--### Notes:
Note that the Java version expects a return value of null for an empty string or null.-->
---
## My solution 

```javascript
function duplicateEncode(word){
    if(!word){return}
    var str = word.toLowerCase();
    var newStr = '';
    for(var i = 0;i<str.length;i++){
        var _char = str.charAt(i);
        if(str.indexOf(_char) == str.lastIndexOf(_char) ){
        newStr +='\(';
        }else{
        newStr +='\)';
        }
    }
    return newStr;
}
```


## good solution

```javascript
function duplicateEncodes(word){
    return word
        .toLowerCase()
        .split('')
        .map( function (a, i, w) {
        return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
        })
        .join('');
}

function duplicateEncodess(word) {
    var letters = word.toLowerCase().split('')
    return letters.map(function(c, i) {
        return letters.some(function(x, j) { return x === c && i !== j }) ? ')' : '('
    }).join('')
}
```