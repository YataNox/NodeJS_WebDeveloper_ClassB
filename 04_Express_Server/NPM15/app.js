const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// numjucks 사용환경 구성
app.set('view engine', 'html');
nunjucks.configure('views', {express : app, watch :true});

// 숨김 폴더 및 정적폴더 설정
// 클라이언트에서 localhost:3003/sequelize.js를 요청하면
// 서버에서는 localhost:3003/public/sequelize.js로 응답합니다.
app.use(express.static(path.join(__dirname, 'public')));
const {sequelize} = require('./models');

// 라우터들을 수집(require)합니다.
//const indexRouter = require('./routes');
const membersRouter = require('./routes/members');
//const boardsRouter = require('./routes/boards');
//const replysRouter = require('./routes/replys');

//app.use('/', indexRouter);
app.use('/members', membersRouter);
//app.use('/boards', boardsRouter);
//app.use('/replys', replysRouter);

sequelize.sync({force:false}).then(()=>{
    console.log('데이터베이스 연결 성공');
}).catch(()=>{
    console.error(err);
});


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
})