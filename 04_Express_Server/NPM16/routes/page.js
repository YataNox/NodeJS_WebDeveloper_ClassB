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
        const posts = await Post.findAll({
            include : {
                model:User,
                attribute : ['id', 'nick'],
            },
            order : [['createdAt', 'DESC']],
        });

        let followerCount = 0;
        let followingCount = 0;
        let followerIdList = [];
        /* if(req.user.Followers){
            followerCount = req.user.Followers.length
        }
        if(req.user.followings){
            followerCount = req.user.Followings.length
            followerIdList = req.user.Followings.map(f=>f.id);
        } */

        res.render('main', {
            title : 'Nodegram', 
            user:req.user, 
            // 로그인 유저가 없으면 0, 있으면 인원 수 (length-레코드 갯수)
            followerCount : req.user ? req.user.Followers.length : 0,
            followingCount : req.user ? req.user.Followings.length : 0,
            // 로그인 유적 없으면 배열, 있으면 팔로잉들의 아이디 배열
            followerIdList : req.user ? req.user.Followings.map(f=>f.id) : [],
            posts,
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/join', async (req, res, next)=>{
    res.render('join', {title : '회원가입 - Nodegram'});
});
module.exports = router;