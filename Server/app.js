const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

const User = require('./models/user');//

dotenv.config();
const app = express();
const usersRouter = require('./routes/users');

//미들웨어
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB 연결
mongoose.connect(process.env.MONGODB_URI, 
    {useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', function(){
    console.log('DB 연결 실패');
});
db.once('open', function(){
    console.log('DB 연결 성공');
});
/* 몽고DB 조회 테스트 코드 
//몽고 DB 권한 문제 해결해야 테스트 가능
//MongoError: command find requires authentication
User.findOne({email:'abcd@abcd.com'},function(error,user){
    if(error){
        console.log(error);
    }
    else{
        console.log(user);
    }
});
*/

//라우팅 설정
app.use('/routes/users', usersRouter); //회원가입, 로그인 관련 라우팅


//서버 실행
app.listen(5000, (req,res) => {
    console.log('5000번 포트 서버 실행');
});