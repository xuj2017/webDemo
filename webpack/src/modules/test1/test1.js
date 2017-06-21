require('./test1.scss');
// var tpl = require('./test1.html');
function text1(){
    var body = document.body;
    var div = document.createElement('div');
    div.innerHTML= '这是测试1123123';
    body.appendChild(div);
    // var app = document.getElementById("app")
    // app.innerHTML = tpl;
    // return {
    //     tpl:tpl
    // }
}

module.exports = text1;