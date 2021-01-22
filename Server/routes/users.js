const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.get('/register', (req, res) => {
    res.send('회원가입 화면');
});

router.post('/register', (req,res) => {
    
    console.log(req.body.email);

    const user = User.findOne({email:req.body.email});
    if(!user){

        return res.status(400).json({
            email: req.body.email,
            msg: "해당 이메일을 가진 사용자가 존재"
        });
    }
    else{
        const newUser = new User({
            email : req.body.email,
            password : req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
    
                newUser.password = hash;
    
                newUser.save();
                res.send('회원가입 완료');
            });
        });
    }
})

router.get('/login', (req,res) => {
    //로그인 화면
});

router.post('/login', (req,res) => {
//jwt 토큰 발급 
//클라이언트는 토큰을 저장하고, 로그인이 필요한 API 요청시 JWT를 헤더에 포함하고
//서버에 전송, 서버는 디코딩하고 서비스 제공
    const email = req.body.email;
    const password = req.body.password;
    //console.log(email,password);

    User.findOne({email}, (error, user) => {
        if(!user){
            return res.status(400).json({
                msg : "존재 하지 않는 이메일"
            });
        }
        else if(user){
            bcrypt.compare(req.body.password, user.password, (error,isMatch) =>{
                if(error){
                    return res.status(500).json({error:'error'});
                }
                if(isMatch){
                    const payload = {
                        email : email
                    };
                    const token = jwt.sign(payload,process.env.JWT_SECRET);
                    res.status(200).json({msg:"로그인 성공", token});
                }
                else{
                    return res.status(400).json({msg : "패스워드가 일치하지 않음" });
                }
            });
        }
    });
});

module.exports = router;

