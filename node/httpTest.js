var http = require('http');
var fs = require('fs');
var path = require("path");

function serveStaticFile(res,path,contentType,responseCode){
    if(!responseCode){
        responseCode =200;
    }

    fs.readFile(__dirname + path,function(err,data){
        console.log(__dirname + path)
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('500-Internal Error');
        }else{
            res.writeHead(responseCode,{'Content-Type':contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

    switch(path){
        case '':
            serveStaticFile(res,'/public/index.html','text/html');
            break;
        case '/about':
            serveStaticFile(res,'/public/about.html','text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res,'/public/img/logo.jpg','image/jpeg');
            break;
        default:
            serveStaticFile(res,'/public/404.html','text/html');
            break;
    }
}).listen(3000);

console.log('Server start on localhost:3000')