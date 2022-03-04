const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next)=>{
    // sequelizt의 레코드 추가 함수는 create
    // await 모델명(User).create({필드명 : 전달인수, 필드명 : 전달인수....});
    try{
        const comment = await Comment.create({
            commenter:req.body.userid,
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
});

// :id -> 와일드 카드 문자로 전송되는 req.의 url 중 :id 위치에 전송되는 단어를 id 변수에 넣고 진행되는 url입니다.
// 정확한 구분을 위해서 '/' 라우터보다 위쪽에 위치하면 안됩니다.
router.get('/:id', async(req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include : {
                model:User,
                where: {id: req.params.id}, // 조건 검색
            },
        });
        res.json(comments);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async (req, res, next)=>{
    try{
        const result = await Comment.update({
            comment : req.body.comment, // 전달된 comment로 테이블내의 comment를 수정
        },{
            where : {id : req.params.id}, // 전달된 id(댓글번호)만..
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/remove/:id', async(req,res,next)=>{
    try{

        const result = await Comment.destroy({
            where : {id:req.params.id},
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;