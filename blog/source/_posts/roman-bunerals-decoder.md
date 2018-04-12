---
title: Roman Numerals Decoder
date: 2017-12-28 14:28:53
tags: javascript
categories: codewars
---
## title
Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer. You don't need to validate the form of the Roman numeral.

Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.


### example
```javascript
solution('XXI'); // should return 21
```

---
## other solution 

```javascript
function solution(roman){
      var romanNumerals = {
          'M': 1000,
          'D': 500,
          'C': 100,
          'L': 50,
          'X': 10,
          'V': 5,
          'I': 1
        };
      roman=roman.split("");
      var m=0;
      n=roman[0];
      roman.reduce(function(pre,item,index){
        var j=romanNumerals[n]||0;
        var k=romanNumerals[item]||0;
        m+=j<k?-j:j;
        n=item
      });
      return m+romanNumerals[roman[roman.length-1]]
    }
```


## good solution

### one
```javascript
function solution(roman){
    var rom ={ "I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000};
    return roman.split('').reverse().reduce(
        function(dec,c,i,rr){ 
            c=rom[c];
            i=rom[rr[i-1]]||0; 
            return dec + (i<=c? c: -c) }
        ,0
    )
}


```
### two
```javascript
function solution(roman){
   var conversion = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
   
   return roman.match(/CM|CD|XC|XL|IX|IV|\w/g).reduce((accum, roman) => accum + conversion[roman], 0);
}
```