//회원정보에 대한 스키마
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);