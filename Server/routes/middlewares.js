//로그인 검증 미들웨어

const jwt = require('jsonwebtoken');

//exports.isLoggedIn = (req,res, next) => {
//    if(req.isAuthenticated()){ // 로그인이 되어 있다면
//        next();
//    }
//    else{
//        res.status(403).send('로그인 필요');
//    }
//}

exports.verifyToken = (req, res, next) => {
    const token = req.body.token;

    try {
        req.decoded = jwt.verify(token/*req.headers.authorization*/, process.env.JWT_SECRET);
        res.send('로그인 성공');
        return next();
    } catch(error){
        if(error.name === 'TokenExpiredError') { //token의 유효기간 초과
            return res.status(419).json({
                code : 419,
                message : '토근이 만료됨'
            });
        }
        return res.status(401).json({
            code: 401,
            message : '유효하지 않은 토큰'
        });
    }
};