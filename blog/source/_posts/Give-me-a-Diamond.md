---
title: Give me a Diamond
tags: javascript
categories: codewars
date: 2017-12-18 16:08:06
---
This kata is to practice simple string output. Jamie is a programmer, and James' girlfriend. She likes diamonds, and wants a diamond string from James. Since James doesn't know how to make this happen, he needs your help.
## title
You need to return a string that displays a diamond shape on the screen using asterisk ("*") characters. Please see provided test cases for exact output format.

The shape that will be returned from print method resembles a diamond, where the number provided as input represents the number of *’s printed on the middle line. The line above and below will be centered and will have 2 less *’s than the middle line. This reduction by 2 *’s for each line continues until a line with a single * is printed at the top and bottom of the figure.

Return null if input is even number or negative (as it is not possible to print diamond with even number or negative number).

### 翻译
输出菱形图案；

---
## My solution 

```javascript
function diamond(n) {

    if(n < 3 || n % 2 == 0) {
        return null;
    }

    var middle = parseInt((n + 1) / 2);
    var j, diam = '';
    for(var i = 1; i <= n; i++) {
        j = i <= middle ? i : n - i + 1;
        diam += ' '.repeat(middle - j) + '*'.repeat(2 * j - 1) + '\n';
    }
    return diam;
}
```


## good solution

```javascript
function diamond(n){
  if (n < 0 || !(n % 2)) return null; 
  const middleIndex = Math.floor(n / 2);
  
  return Array.apply(null, {length: n})
      .map((el, index) => {
        const indentation = Math.abs(index - middleIndex);
        const numberOfAsterisks = n - indentation * 2;
        return Array(indentation + 1).join(' ') + Array(numberOfAsterisks + 1).join('*');
      })
      .join('\n') + '\n';
}
```