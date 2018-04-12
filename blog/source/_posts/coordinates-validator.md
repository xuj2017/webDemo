---
title: coordinates-validator
date: 2017-12-27 14:19:01
tags: javascript
categories: codewars
---
## title
You need to create a function that will validate if given parameters are valid geographical coordinates.

Valid coordinates look like the following: "23.32353342, -32.543534534". The return value should be either true or false.

Latitude (which is first float) can be between 0 and 90, positive or negative. Longitude (which is second float) can be between 0 and 180, positive or negative.

Coordinates can only contain digits, or one of the following symbols (including space after comma) -, .

There should be no space between the minus "-" sign and the digit after it.

### example
 Here are some valid coordinates:
- -23, 25
- 24.53525235, 23.45235
- 04, -23.234235
- 43.91343345, 143
- 4, -3

And some invalid ones:

- 23.234, - 23.4234
- 2342.43536, 34.324236
- N23.43345, E32.6457
- 99.234, 12.324
- 6.325624, 43.34345.345
- 0, 1,2
- 0.342q0832, 1.2324
---
## My solution 

```javascript
//去除首位空格
function trim(str){   
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');   
}
function isValidCoordinates(coordinates){
  var valiArr = coordinates.split(',');
  if(valiArr.length != 2){
    return false
  }
  var Latitude =trim(valiArr[0]);
  var Longitude = trim(valiArr[1]);
  
  var regu = /^(\-|\+)?\d+(\.\d+)?$/;
  if(!regu.test(Latitude)||!regu.test(Longitude) ){
     return false
  }
  if(Math.abs(Latitude)>90||Math.abs(Longitude)>180){
    return false
  }
  return true; // do your thing!
}

```


## good solution

```javascript
function isValidCoordinates(coordinates){
  var match = coordinates.match(/^[-]?(\d+(?:\.\d+)?), [-]?(\d+(?:\.\d+)?)$/);
  if (!match) { return false; }
  var lat = Math.abs(parseFloat(match[1]));
  var lng = Math.abs(parseFloat(match[2]));
  return lat >= 0 && lat <= 90 && lng >= 0 && lng <= 180;
}

function isValidCoordinates(coordinates){
  return /^-?((\d)|([0-8]\d)|(90))(\.\d+)?, ?-?((\d\d?)|(1[0-7]\d)|(180))(\.\d+)?$/.test(coordinates)
}

function isValidCoordinates(coordinates){
  return /^(-?((\d|[0-8]\d)(\.\d+)?)|90),\s?(-?((\d\d?|[01][0-7]\d)(\.\d+)?)|180)$/.test(coordinates);
}
```