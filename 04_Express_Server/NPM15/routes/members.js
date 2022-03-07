//   localhost:3000/members/joinform 이라는 리퀘스트에   memberInsert.html 이 화며에 나오게 설정해주세요
// 1. 적정 라우터 생성
// 2. app.js 에서 연결
// 3. 넌적스 설정후  reder

const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
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


module.exports = router;