---
title: merged-string-checker
date: 2017-12-25 15:38:37
tags: javascript
categories: codewars
---
## title
At a job interview, you are challenged to write an algorithm to check if a given string, s, can be formed from two other strings, part1 and part2.

The restriction is that the characters in part1 and part2 are in the same order as in s.

The interviewer gives you the following example and tells you to figure out the rest from the given test cases.

### example
```javascript
'codewars' is a merge from 'cdw' and 'oears':

    s:  c o d e w a r s   = codewars
part1:  c   d   w         = cdw
part2:    o   e   a r s   = oears
```
<!--### Notes:
Note that the Java version expects a return value of null for an empty string or null.-->
---
## My solution 

```javascript
function isMerge(s, part1, part2) {
 if(!part1){
   return s == part2
 }
 if(!part2){
   return s == part1
 }
 
 if(!s){
   return part1+part2 == ''
 }
 if(s[0] == part1[0] && isMerge(s.slice(1),part1.slice(1),part2)){
   return true;
 }
 if(s[0] == part2[0] && isMerge(s.slice(1),part1,part2.slice(1))){
   return true;
 }
 
 return false;
}

```


## good solution

```javascript
function isMerge(s, part1, part2) {
  return !s ? !(part1 || part2) :
    s[0] == part1[0] && isMerge(s.slice(1), part1.slice(1), part2) ||
    s[0] == part2[0] && isMerge(s.slice(1), part1, part2.slice(1));
}
```