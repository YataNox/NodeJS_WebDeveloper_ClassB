const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('main', {});
});
module.exports = router;