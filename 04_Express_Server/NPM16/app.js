const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();    // dotenv 설정은 가장 위에 쓰는것이 좋습니다.

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {   express: app,   watch: true,   });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    }, 
}));


app.use(express.static(path.join(__dirname, 'public')));
const {sequelize} = require('./models');

sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((err)=>{
    console.error(err);
});


app.get('/', (req, res)=>{
     const user = {id : 1, nick : 'aaa'};
    res.render('postForm', {title : 'NodeGram', user, followerCount:1, followingCount:2,});
});

app.get('/saveimg', (req, res)=>{
    
})


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); // 해당 요청에 따른 라우터가 없을때 404에러

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}); // 그 외 에러들

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});