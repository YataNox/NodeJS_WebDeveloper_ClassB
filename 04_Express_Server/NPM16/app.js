const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// 라우터들 추가
const postRouter = require('./routes/posts');
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {   express: app,   watch: true,   });


app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
// uploads 폴더를 정적 폴더로 쓰되 접근폴더명은 img로 설정합니다.

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure:false,
    }
}));


const {sequelize} = require('./models');
sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((err)=>{
    console.error(err);
});

app.use('/', pageRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter);

/* app.get('/', (req, res)=>{
    const user = {id:1, nick:'bbb'};
    res.render('postForm', {title:'NodeGram', user, followerCount:1, followingCount:2});
}); */

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); // 해당 요청에 따른 라우터가 없을 때 404에러

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}); // 그 외 서버 에러들

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});