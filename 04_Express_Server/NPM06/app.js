const express = require('express');
const path = require('path');
const cookieParser = require('cookieParser');
const morgan = require('morgan');
const app = require('fs');

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/login.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
});