---
title: Jaden Casing Strings
tags: javascript
categories: codewars
date: 2017-07-21 13:31:47
---
## title
Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

### example
```javascript
Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
```
### Notes:
Note that the Java version expects a return value of null for an empty string or null.
---
## My solution 

```javascript

```


## good solution

```javascript
String.prototype.toJadenCase = function () {
    var strArr = this.split(" ");
    for(var i =0;i<strArr.length;i++){
        var toUpperCase = strArr[i].split('')[0].toUpperCase();
        strArr[i] = strArr[i].split('');
        strArr[i].splice(0,1,toUpperCase);
        strArr[i] = strArr[i].join("");
        
    }
    return strArr.join(" ");
};
```