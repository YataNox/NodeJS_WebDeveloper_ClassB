const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dateFilter = require('nunjucks-date-filter');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'rladnwls',
}));

// numjucks 사용환경 구성
app.set('view engine', 'html');
nunjucks.configure('views', {express : app, watch :true});
let env = nunjucks.configure('views', {express:app, watch : true,});

// 숨김 폴더 및 정적폴더 설정
// 클라이언트에서 localhost:3003/sequelize.js를 요청하면
// 서버에서는 localhost:3003/public/sequelize.js로 응답합니다.
app.use(express.static(path.join(__dirname, 'public')));
const {sequelize} = require('./models');

// 라우터들을 수집(require)합니다.
const indexRouter = require('./routes');
const membersRouter = require('./routes/members');
const boardsRouter = require('./routes/boards');
const replysRouter = require('./routes/replys');

app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/boards', boardsRouter);
app.use('/replys', replysRouter);

sequelize.sync({force:false}).then(()=>{
    console.log('데이터베이스 연결 성공');
}).catch(()=>{
    console.error(err);
});

try{
    fs.readdirSync('public/uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('public/uploads'); // 현재 폴더의 최상위 폴더 아래에 생성
}

const upload = multer(
    { storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/uploads/'); 
        }, 
            filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }
    ), 
    limits:{ fileSize: 5*1024*1024},}
); 

// 에러처리 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
})