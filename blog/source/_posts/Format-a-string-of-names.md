---
title: Format a string of names like 'Bart, Lisa & Maggie'.'
date: 2017-12-18 16:19:57
tags: javascript
categories: codewars
---
## title
Given: an array containing hashes of names

Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.

### Example
```javascript
    list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
    // returns 'Bart, Lisa & Maggie'

    list([ {name: 'Bart'}, {name: 'Lisa'} ])
    // returns 'Bart & Lisa'

    list([ {name: 'Bart'} ])
    // returns 'Bart'

    list([])
    // returns ''
```

---
## My solution 
```javascript
    function list(names){
        if(!Object.prototype.toString.call(names) === '[object Array]' || names.length <1){
            return '';
        }
        if(names.length == 1){
            return names[0]['name'];
        }else{
            var result = '';
            for(var i = 0; i<names.length;i++){
                if(i == names.length - 1){
                    result += ' & '+names[i]['name'];
                }else if(i == names.length - 2){
                    result +=names[i]['name'];
                }else{
                    result +=names[i]['name']+', ';
                }
            }
            return  result; 
        }
    }
```

## good solution

```javascript
//one
function list(names){
  return names.reduce(function(prev, current, index, array){
    if (index === 0){
      return current.name;
    }
    else if (index === array.length - 1){
      return prev + ' & ' + current.name;
    } 
    else {
      return prev + ', ' + current.name;
    }
  }, '');
 }
 //two
 //map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
 function list(names) {
  var xs = names.map(p => p.name)
  var x = xs.pop()//删除并返回数组的最后一个元素
  return xs.length ? xs.join(", ") + " & " + x : x || ""
}
```
