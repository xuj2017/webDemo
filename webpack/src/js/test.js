var test1 = require('../modules/test1/test1.js');
var test2 = require('../modules/test2/test2.js');
var cookie = require('../modules/cookie/cookie');
test1();
test2();
var app = document.getElementById("app");
app.innerHTML = test1.tpl;

cookie.set('name','xujun',2);
cookie.set('caneer','developer',1);
console.log(cookie.get("name"));
cookie.del("name");
console.log(cookie.get("name"));