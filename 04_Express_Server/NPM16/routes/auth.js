const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router =express.Router();

// 회원가입
router.post('/join', async (req, res, next)=>{
    try{
        const {email, nick, password} = req.body;
        const exUser = await User.findOne({where:{email}}); // 이메일로 회원 검색
        if(exUser){ // 이미 해당 이메일 회원이 있다면
            return res.redirect('/join?error=exist'); // 이메일 중복
        }

        const hash = await bcrypt.hash(password, 12); // 12 : 해시화를 하기위한 복잡도 인수. 숫자가 클 수록 해시화 암호화가 복잡해지고 복구시간도 오래걸립니다. 12가 약 1초정도 시간의 실행을 해줍니다.

        await User.create({
            email,
            nick,
            password : hash,
        }); // 이메일, 닉네임, 패스워드로 회원 추가
        return res.redirect('/'); // 메인페이지로
    }catch(err){
        console.error(err);
    }
});

router.post('/login', (req, res, next)=>{
    // passport 모듈로 로그인을 구현합니다. 회원가입할 때 입력한 패스워드도 해시화(암호화)해서 저장하는 걸로 전환됩니다.
});

module.exports = router;