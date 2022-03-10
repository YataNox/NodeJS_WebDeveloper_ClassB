const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const upload = multer(
    { storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/uploads/'); 
        }, 
            filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }
    ), 
    limits:{ fileSize: 5*1024*1024},}
); 

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
        const dt = new Date();
        res.render('boardView', {boardView2, luser, dt});
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

router.post('/insertBoard', upload.single('image'), async (req, res, next)=>{
    try{
        const board = await Board.create({
            subject : req.body.subject,
            content : req.body.text,
            writer : req.body.writer,
            filename : req.file.originalname,
            realfilename : req.file.filename,
        });
        res.json(board);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/UpdateForm/:id', upload.single('image'), async (req, res, next)=>{
    // 전달된 아이디로 게시물을 조회한 후 updateForm.html로 렌더링. 세션에 있는 유저 아이디랑, 조회한 게시물과 같이 이동합니다.
    try{
        const board = await Board.findOne({
            where : {id : req.params.id},
        });
        res.render('updateForm', {board : board});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/update', upload.single('image'), async(req, res, next)=>{
    try{
        if(req.file != undefined){
            await Board.update({
                subject : req.body.subject,
                content : req.body.text,
                filename : req.file.originalname,
                realfilename : req.file.filename,
            },{
                where : {id : req.body.id},
            });
        }else{
            await Board.update({
                subject:req.body.subject,
                content:req.body.text,
            },{
                where : {id : req.body.id },
            })
        }
        // 게시물 번호로 해당 게시물을 보던 페이지로 되돌아 갑니다. 이때 조회수는 늘어나지 않습니다.
        res.redirect('/boards/boardView2/' + req.body.id);

    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/boardView2/:id', async (req, res)=>{
    try{
        const boardView2 = await Board.findOne({
            where : {id:req.params.id},
        });
        const luser = req.session.loginUser;
        const dt = new Date();
        res.render('boardView', {boardView2, luser, dt});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/deleteBoard/:id', async (req, res)=>{
    // 해당 아이디로 게시물을 삭제한 후 boards로 이동해주세요.
    try{
        await Board.destroy({
            where : {id:req.params.id},
        });
        const luser = req.session.loginUser;
        res.redirect('/boards');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;