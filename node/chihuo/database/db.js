var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/chihuo');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var userScheMa = new Schema({
    name:String,
    password:String
});

exports.user = db.model('users',userScheMa);