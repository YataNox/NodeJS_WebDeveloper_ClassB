const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');

const router = express.Router();

router.get('/', (req, res)=>{
    const loginUser = req.session.loginUser;
    res.render('main', {luser:loginUser});
});
module.exports = router;