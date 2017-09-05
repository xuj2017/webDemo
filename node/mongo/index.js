var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';

var insertData = function(db,table,callback){
    // 连接到表site
    var collection = db.collection(table);
    // 插入数据
    var data =[
        {
            "name":"菜鸟教程",
            "url":"www.runoob.com"
        },
        {
            "name":"菜鸟工具",
            "url":"c.runoob.com"
        }
    ];

    collection.insert(data,function(err,result){
        if(err){
            console.log('Eooro:'+err);
            return
        }
        callback(result);
    })
}

var selectData = function(db,table,callback){
    var collection = db.collection(table);

    var whereStr = {"name":"菜鸟教程"};

    collection.find(whereStr).toArray(function(err,result){
        if(err){
            console.log('Eooro:'+err);
            return
        }
        callback(result);
    })
}

var updateData = function(db,table,callback){
    var collection = db.collection(table);
    var whereStr = {"name":"菜鸟教程"};
    var updateStr = {$set:{"url":"https://www.runoob.com"}};

    collection.update(whereStr,updateStr,function(err,result){
        if(err){
            console.log('Error'+err);
            return;
        }
        callback(result);
    })

}

MongoClient.connect(DB_CONN_STR,function(err,db){
    console.log("connent successfully");
    updateData(db,'site',function(result){
        console.log(result);
        db.close();
    })
})