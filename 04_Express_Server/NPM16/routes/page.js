const express = require('express');
const {Post, User, Hashtag} = require('../models');

const router = express.Router();

/* router.use((req, res, next)=>{
    res.locals.user =req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
}) */

router.get('/', async (req, res, next)=>{
    try{    
        // 포스트 검색
        // const posts = await Post.findAll();
        res.render('main', {title : 'Nodegram', user:req.user, followerCount:0, followingCount : 0} /*, posts */);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/join', async (req, res, next)=>{
    res.render('join', {title : '회원가입 - Nodegram'});
});
module.exports = router;