const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.send('회원가입 화면');
});

router.post('/register', (req,res) => {

    const {email} = req.body.email;

    //console.log(email);

    if(User.findOne(email)){
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
    
});

router.post('/login', (req,res) => {
//jwt 토큰 발급 
    const email = req.body.email;
    const password = req.body.password;

    const user = User.findOne({email});
    if(!user){
        return res.status(400).json({
            msg : "존재 하지 않는 이메일"
        });
    }

    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(isMatch){
            const payload = {
                email : user.email
            };
        const token = jwt.sign(payload, process.env.JWT_SECRET).res.json({
            token
        });
        }
        else{
            return res.status(400).json({
                msg : "패스워드가 일치하지 않음"
            });
        }
    })
    
});

module.exports = router;

