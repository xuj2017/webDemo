const EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();
myEmitter.on('event',(a,b)=>{
    console.log('触发一个事件',a,b,this);
})
process.on('uncaughtException', (err) => {
    console.error('有错误');
  });
  
  myEmitter.emit('error', new Error('whoops!'));

myEmitter.emit('event','a','b');
myEmitter.emit('event','c','d');