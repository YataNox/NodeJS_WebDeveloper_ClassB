// localhost:3000/members/joinform이라는 리퀘스트에 memberInsert.html이 화면에 나오게 설정해주세요.
// 1. 적정 라우터 생성
// 2. app.js에서 연결
// 3. 넌적스 설정 후 render

const express = require('express');
const Member = require('../models/Member');
const Board = require('../models/Board');
const Reply = require('../models/Reply');

const router = express.Router();


router.get('/joinform', (req, res, next)=>{
    try{
        res.render('memberinsert', {});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;