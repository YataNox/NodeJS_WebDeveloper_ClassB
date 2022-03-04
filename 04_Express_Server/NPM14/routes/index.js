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

// 시퀄라이즈로 쿼리 실행하는 문법의 여러가지
// 1. 레코드 삽입
// 모델명.create({
//    필드명, 입력값,
//    필드명, 입력값,
//    필드명, 입력값,
// });

// User.create({
//    name : 'hong',
//   age : 24,
//    married : false,
//    comment: '일반회원',
// });

// 2. 일반조회(모든 필드, 모든 레코드)
// 모델명.findAll({});
// User.findAll({});

// 3. 일부 필드만 조회(select name, married from users)
// user.findAll({
//    attributes:['name','married'];
// });

// 4. 일부 필드 & 일부 레코드(where 조건) 조회- select name, married from users where married=1 and age>30;
// User.findAll({
//      attribute:['name', 'age'];
//      where:{
//          married : 1,
//          age:{[Op.gt]:30},
//      }
// });
// where절에 두 개의 조건이 별도의 언급없이 ','로 이어졌다면 그 둘은 and로 묶여 있는 것입니다.
// or을 쓰려면
// select id, name from users where marreid=0 or age<30;
// User.findAll({
//      attribute:['name', 'age'];
//      where:{
//          [Op:or]:[{married : 1},
//          {age:{[Op.lt]:30}]},
//      }
// });


module.exports = router;