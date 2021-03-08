//게시글에 대한 스키마
var mongoose = require('mongoose');
var postsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

var Post = mongoose.model('post',postsSchema);
module.exports = Post;