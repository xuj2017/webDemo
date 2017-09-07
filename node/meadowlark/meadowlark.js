var express = require('express');

var app = express();
var http = require('http');
var fortune = require('./lib/fortune.js');
var formidable = require('formidable');

var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    extname:'.handlebars',
    helpers:{
        section:function(name,options){
            if(!this._sections){
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

var fortunes = [
    "Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do  not fear ehat you don't konw",
    "You will have a pleasant surprise",
    "Whenever possible,keep it simple."
];
var products = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];
var tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);
app.use(require('body-parser')());

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.use(express.static(__dirname+'/public'));

app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
})

app.get('/',function(req,res){
    // res.type('text/plain');
    // res.send('Meadowlark Travel')
    // console.log(req.ip);
    res.render('home');
});

app.get('/newsletter',function(req,res){
    res.render('newsletter',{csrf:'CSRF token goes here'});
})

app.post('/process',function(req,res){
    // console.log('Form (from querystring): ' + req.query.form);
    // console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    // console.log('Name (from visible form field): ' + req.body.name);
    // console.log('Email (from visible form field): ' + req.body.email);
    // res.redirect(303, '/thank-you');
    if(req.xhr || req.accepts('json,html')==='json'){
        //如果发生错误,{error:'error decription'}
        res.send({success:true})
    }else{
        res.redirect(303, '/thank-you');
    }
})

app.get('/about',function(req,res){
    // res.type('text/plain');
    // res.send('About Meadowlark Travel')
    res.render('about',{
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/weather',function(req,res){
    res.render('weather');
})
app.get('/nursery-rhyme',function(req,res){
    res.render('nursery-rhyme');
})
app.get('/data/nursery-rhyme', function(req, res){
    res.json({
    animal: 'squirrel',
    bodyPart: 'tail',
    adjective: 'bushy',
    noun: 'heck',
    });
});

app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
            year: now.getFullYear(),
            month: now.getMonth()+1
    });
});

app.post('/contest/vacation-photo/:year/:month',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(err){
            return res.redirect(303,'/error');
            console.log('received fields:');
            console.log(fields);
            console.log('received files:');
            console.log(files);
            res.redirect(303, '/thank-you');
        }
    })
})

app.get('/api/tours',function(req,res){
    res.json(tours);
})

// app.get('/api/tours', function (req, res) {
//     req.accepts('json, text');
//     var toursXml = '<?xml version="1.0"?><tours>' + products.map(function (p) {
//                         return '<tour price="' + p.price +
//                             '" id="' + p.id + '">' + p.name + '</tour>';
//                         }).join('') + 
//                     '</tours>';
//     var toursText = tours.map(function (p) { return p.id + ': ' + p.name + ' (' + p.price + ')'; }).join('\n');
//     res.format({
//         'application/json': function () {
//             res.json(tours);
//         },
//         'application/xml': function () {
//             res.type('application/xml');
//             res.send(toursXml);
//         },
//         'text/xml': function () {
//             res.type('text/xml');
//             res.send(toursXml);
//         },
//         'text/plain': function () {
//             res.type('text/plain');
//             res.send(toursXml);
//         }
//     });
// });

app.get('/tours/hood-river',function(req,res){
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate',function(req,res){
    res.render('tours/request-group-rate');
});



//定制404页面 catch-all处理器
app.use(function(req,res,next){
    // res.type('text/plain');
    res.status(404);
    // res.send('404-Not Found');
    res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    console.log(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500-server Error');
    res.render('500');
});

// app.listen(app.get('port'),function(){
//     console.log('Express started on http://localhost:'+app.get('port')+';');
// });
http.createServer(app).listen(app.get('port'), function(){
    console.log( 'Express started in ' + app.get('env') +
    ' mode on http://localhost:' + app.get('port') +
    '; press Ctrl-C to terminate.' );
    });