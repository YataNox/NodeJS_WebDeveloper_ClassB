const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User} = require('../models');

const router = express.Router();

try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer(
    { storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/'); 
        }, 
            filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }
    ), 
    limits:{ fileSize: 5*1024*1024},}
); 

router.post('/posting', upload.single('img'), async (req, res, next)=>{
    try{
        await Post.create({
            content:req.body.content,
            img:req.file.filename,
            UserId:1,
        });
        res.json({});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/', async (req, res, next)=>{
    try{
        const result = await Post.findAll({
            include : {
                model : User,
                attributes : ['id', 'nick'],
            },
            order:[['createdAt', 'desc']],
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;