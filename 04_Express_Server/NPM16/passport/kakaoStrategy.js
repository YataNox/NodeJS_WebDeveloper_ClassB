const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');
module.exports = ()=>{
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('kakao profile', profile);
        try{
            const exUser = await User.findOne({
                where: {snsId: profile.id, provider: 'kakao'},
            });
            if(exUser){
                done(null, exUser);
            } else{ 
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                }); // 회원 가입 후... 로그인 절차가 진행
                done(null, newUser);
            } 
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};