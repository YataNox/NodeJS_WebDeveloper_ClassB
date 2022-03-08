const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');

const router = express.Router();

router.post('/addReply', async (req, res)=>{
    try{
        await Reply.create({
            writer : req.body.writer,
            content : req.body.reply,
            boardnum : req.body.boardnum,
        })
        res.end();
    }catch(err){
        console.error(err);
    }
})

router.get('/replyList/:id', async (req, res, next)=>{
    const replys = await Reply.findAll({
        where : {boardnum : req.params.id},
    });
    res.json(replys);
});

module.exports = router;