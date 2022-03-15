const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 로그인유저(나)가 전달된 :id 주인공을 팔로우 하겠습니다
router.post('/:id/follow', async (req, res, next)=>{
    try{
      const user = await User.findOne({ where: {id: req.user.id } }); // 로그인 유저의 user정보 조회
      if(user){
          await user.addFollowings( parseInt(req.params.id , 10) );
          // as:'Followings' 에 따른 메서드가 만들어짐. 복수,단수 모두가능  setFollowing 수정 메서드
          // getFollowings  removeFillwigs 복수면 []사용
          res.send('success');
      }else{
          res.status(404).send('no user');
      }
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;