const express = require('express');
const router = express.Router();
var Post = require('../models/post');


router.get('/new', (req, res) => {
    //웹페이지 화면은 view를 res.render()하여 표시
    res.send('게시글 작성');
});

//새로운 글 작성
router.post('/new',function(req,res){
    //에러 처리 코드 보완
    res.send('게시글 작성 테스트');
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body
    });
    newPost.save();    
});
//게시글 수정

//게시글 삭제

/*
// Index 
router.get('/', function(req, res){
    Post.find({})                  // 1
    .sort('-createdAt')            // 1
    .exec(function(err, posts){    // 1
      if(err) return res.json(err);
      res.render('posts/index', {posts:posts});
    });
  });
  
  // New
  router.get('/new', function(req, res){
    res.render('posts/new');
  });
  
  // create
  router.post('/', function(req, res){
    Post.create(req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  });
  
  // show
  router.get('/:id', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/show', {post:post});
    });
  });
  
  // edit
  router.get('/:id/edit', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/edit', {post:post});
    });
  });
  
  /* update
  router.put('/:id', function(req, res){
    req.body.updatedAt = Date.now(); //2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/posts/"+req.params.id);
    });
  });
  

  // destroy
  router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  });
  */
  module.exports = router;