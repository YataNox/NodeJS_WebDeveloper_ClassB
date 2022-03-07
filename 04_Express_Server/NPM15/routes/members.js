//   localhost:3000/members/joinform 이라는 리퀘스트에   memberInsert.html 이 화며에 나오게 설정해주세요
// 1. 적정 라우터 생성
// 2. app.js 에서 연결
// 3. 넌적스 설정후  reder

const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const { render } = require('nunjucks');
const router = express.Router();

router.post('/login', async (req, res)=>{
    try{
        const luser = await Member.findOne({
            where:{userid : req.body.userid },
        });
        if((luser != null) && (luser.pwd == req.body.pwd)){
            req.session.loginUser = luser;
        }
        res.json(luser);
    }catch(err){
        console.error(err);
    }
});

router.get('/joinform', (req, res)=>{
    res.render( 'memberInsert', {});
});

router.post('/insertMember', async (req, res)=>{
    try{
        await Member.create({
            userid:req.body.userid,
            pwd:req.body.pwd,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
        });
    }catch(err){
        console.error(err);
    }
}); 

router.get('/updateForm/:userid', async (req, res, next)=>{
    try{
        // userid로 검색해서 검색결과를 member라는 이름으로 같이 memberUpdateForm.html로 이동 전송합니다.
        const member = await Member.findOne({
            where:{userid : req.params.userid},
        });
        res.render('memberUpdateForm', {member : member});
    }catch(err){
        console.error(err);
    }
});

router.post('/update', async (req, res,  next)=>{
    // userid로 검색해서 검색결과를 member라는 이름으로 같이 memberUpdateForm.html로 이동합니다.
    try{
        // 회원정보 수정
        const result = await Member.update({
           pwd:req.body.pwd,
           name:req.body.name,
           phone:req.body.phone,
           email:req.body.email,
        },{
           where : {userid:req.body.userid},
        });
        // 다시 현재 회원 검색
        const member = await Member.findOne({
            where : {userid:req.body.userid},
        });
        // 세션값 갱신
        req.session.loginUser = member;
        res.json(member);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
});

module.exports = router;