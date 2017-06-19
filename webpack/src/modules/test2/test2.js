require('./test2.scss');
function text2(){
    var body = document.body;
    var span = document.createElement('span');
    span.innerHTML= '这是测试2';
    body.appendChild(span);
}

module.exports = text2;