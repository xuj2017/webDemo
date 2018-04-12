---
title: 'humanReadableTime'
date: 2017-12-19 09:20:07
tags: javascript
categories: codewars
---
## title
Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

### example
```javascript
    Test.assertEquals(humanReadable(0), '00:00:00', 'humanReadable(0)');
    Test.assertEquals(humanReadable(5), '00:00:05', 'humanReadable(5)');
    Test.assertEquals(humanReadable(60), '00:01:00', 'humanReadable(60)');
    Test.assertEquals(humanReadable(86399), '23:59:59', 'humanReadable(86399)');
    Test.assertEquals(humanReadable(359999), '99:59:59', 'humanReadable(359999)');
```
### Notes:
- HH = hours, padded to 2 digits, range: 00 - 99
- MM = minutes, padded to 2 digits, range: 00 - 59
- SS = seconds, padded to 2 digits, range: 00 - 59
---
## My solution 

```javascript
function humanReadable(seconds) {
  // TODO
  if(seconds < 0 || seconds > 359999) return false;
  
  var h = 0,m = 0,s = 0;
  if(seconds >= 3600){
    h = parseInt(seconds/3600);
    m = parseInt((seconds - h*3600)/60);
    s = seconds - h*3600 - m*60;
  }else if(seconds>=60) {
     m = parseInt(seconds/60);
     s = seconds - m*60;
  }else {
     s = seconds;
  }
    h = h.toString().length == 2 ? h : '0'+ h;
    m = m.toString().length == 2 ? m : '0'+ m;
    s = s.toString().length == 2 ? s : '0'+ s;
    
    return h + ':' + m + ':' + s;
}
```


## good solution

```javascript
//one
function humanReadable(seconds) {
  var pad = function(x) { return (x < 10) ? "0"+x : x; }
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}

//two
function humanReadable(seconds) {
  return [seconds / 3600, seconds % 3600 / 60, seconds % 60].map(function(v) {
    v = Math.floor(v).toString();
    return v.length == 1 ? '0' + v : v;
  }).join(':');
}

```