const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const { renderString } = require('nunjucks');

const router = express.Router();

router.get('/', (req, res)=>{
    const loginUser = req.session.loginUser;
    res.render('main', {luser:loginUser});
});

router.get('/boardList', async (req, res)=>{
    try{
        const boards = await Board.findAll({
            order : [['id', 'DESC']],
        });
        res.json(boards);
    }catch(err){
        console.log(err);
        next(err);
    }
});

router.get('/boardView/:id', async (req, res, next)=>{
    try{
        // 게시물을 검색
        // 검색한 게시물의 조회수를 추출해서 +1 연산
        // 연산한 겨로가를 검색한 게시물에 update 합니다.
        // 다시 게시물을 검색
        // 검색결과를 render에 포함시켜 줍니다.
        const boardView = await Board.findOne({
            where : {id : req.params.id},
        });

        await Board.update({
            readCount : (boardView.readCount*1) + 1,
        },{
            where : {id : req.params.id},
        });
        
        const boardView2 = await Board.findOne({
            where : {id : req.params.id},
        });

        const luser = req.session.loginUser;
        console.log(luser.userid);
        res.render('boardView', {boardView2, luser});
    }catch(err){
        console.error(err);
    }
});

router.get('/writeForm', (req, res)=>{
    try{
        const luser = req.session.loginUser;
        res.render('writeForm', {luser});
    }catch(err){
        console.error(err);
    }
});

module.exports = router;