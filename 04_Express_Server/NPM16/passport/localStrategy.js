const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
//  일반 사용자의 로그인 절차를 정의한 strategy
module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField: 'email', // 보내온 req.body.email의 이름과 일치, 'email'이 같아야 합니다.
        passwordField: 'password', // 보내온 req.body.password의 이름과 일치, 'password'가 같아야 합니다.
    }, async (email,password, done)=>{
        try{
            const exUser = await User.findOne({where: {email}});    // 이메일로 회원 검색
            if(exUser){ // 회원이 존재한다면
                // 암호 - 해시화된 비번들을 비교
                const result = await bcrypt.compare(password, exUser.password);     // 비밀번호 비교
                if(result){ // 비번까지 같았다면
                    done(null, exUser);
                }else{  // 비번이 틀리다면
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            } else{ // 아이디를 검색하지 못했다면
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }   //done(서버에러, 성공여부(참/거짓), 거짓인경우 메세지)
            // done은 본 미들웨어가 호출된 시점을 이동
        }catch(err){
            console.error(err);
            done(error);
        }
    }));
};