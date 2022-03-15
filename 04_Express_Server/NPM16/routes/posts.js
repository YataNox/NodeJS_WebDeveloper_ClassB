const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Hashtag} = require('../models');

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

/* router.post('/posting', upload.single('img'), async (req, res, next)=>{
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
}) */

router.post('/img', upload.single('img'), (req, res, next)=>{
    console.log(`/img/${req.file.filename}`)
    res.json({url: `/img/${req.file.filename}`});
}); // 그림만 업로드하고, 저장된 경로를 json형식으로 되돌려줍니다.

const upload2 = multer();
router.post('/', upload2.none(), async (req, res)=>{
    try{
        const currentPost = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        // 게시물 포스팅 할때 같이 입력한 해시태그를 골라내서, 단어별로 처음 나온 단어를 해시태그 테이블에 insert 하고,  현재 게시물이 어떤 해시태그를 갖고 있는지의 여부를 posthashtags 테이블에 insert 합니다.

        // 전송된 content에서 해시태그만 골라내고 각각 따로 태그별로 저장하면, 정규표현식이 필요합니다.
        // 짧은 또는 긴 문장속에서 전화번호, 또는 우편번호, 아이피주소 등 특정 형식이 있는 일부 단어를 골라내고자 할때 쓰는 표현식을 정규표현식이라고 합니다.

        // "안녕하세요 반갑습니다. 좋은 제품 많이 파세요. 신발이 예쁘네요 #신발 #예쁜신발 #많이파세요"

        const hashtags = req.body.content.match(/#[^s#]*/g);
        // '#'으로 시작해서 빈칸과  '#'이 아닌 곳까지를 단어로 해서 모두 검색
        if ( hashtags ){ // 추출한 해시태그가 하나 이상 있다면....
            const result =  await Promise.all(
                hashtags.map( tag =>{
                    return Hashtag.findOrCreate({
                        where: {title: tag.slice(1).toLowerCase() },    //slice(1) #을 제외
                    })  // 맨앞에 #을 제외한 단어를 테이블에서 찾고 없으면 추가
                }),
            );
            await currentPost.addHashtags(result.map(r => r[0])); 
            // 지금 추가한 post 게시물에 대한 해시태그로 해시태그들을 posthashtags 테이블에 추가
            // as 를 지정하지 않아서 addHashTag 로 사용

            // addHashtags: Post 와 Hashtag 간 관계에 throuth 로 설정된 posthashtag 테이블에
            // 현재 insert 된 post의 id 와 해시태그들을 연결해서 추가하세요
            // removeHashtags, findHashtags ...
        }

        res.redirect('/');
    }catch(err){
        console.error(err);
        nextTick(err);
    }
});

router.post('/', upload.single('img'), (req,res)=>{

});
module.exports = router;