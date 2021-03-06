const express = require('express');
const Board = require('../models/board');
const Member = require('../models/member');
const Reply = require('../models/reply');

const router = express.Router();

router.get('/', (req, res, next)=>{
    try{
        res.render('login', {});
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;