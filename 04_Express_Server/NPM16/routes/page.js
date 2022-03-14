const express = require('express');
const {Post, User, Hashtag} = require('../models');

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try{    
        // 포스트 검색
        // const posts = await Post.findAll();
        res.render('main', {title : 'Nodegram'}, /*, posts */);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/join', async (req, res, next)=>{
    res.render('join', {title : '회원가입 - Nodegram'});
});
module.exports = router;