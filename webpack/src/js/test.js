var test1 = require('../modules/test1/test1.js');
var test2 = require('../modules/test2/test2.js');
test1();
console.log(test1);
test2();
var app = document.getElementById("app");
app.innerHTML = test1.tpl;