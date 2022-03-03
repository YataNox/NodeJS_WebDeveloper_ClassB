const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next)=>{
    // sequelizt의 레코드 추가 함수는 create
    // await 모델명(User).create({필드명 : 전달인수, 필드명 : 전달인수....});
    try{
        const comment = await Comment.create({
            commenter:req.body.id,
            comment:req.body.comment,
        });
        res.json(comment);
    }catch(err){
        console.log(err);
        next(err); // 에러 루틴이 있는 라우터로 이동
    }
});

router.get('/', async(req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model : User,
            },// join을 위해서 주인공 테이블과 외래키관계(1:N)관계 테이블의 모델을 include합니다. 이렇게해서 join효과를 볼 수 있습니다.
        });
        // 결과를 json형식으로 리턴해줍니다.
        res.json(comments);
    }catch(err){
        console.log(err);
        next(err); // 에러 루틴이 있는 라우터로 이동
    }
})

module.exports = router;