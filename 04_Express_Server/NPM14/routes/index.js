const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', (req, res)=>{
    try{
        res.render('sequelize', {}); // 최초 서버 실행 시 첫 페이지로 sequelize.html로 응답
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;