const express = require('express');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
app.set('port', process.env.POST || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// numjucks 사용환경 구성
app.set('view engine', 'html');
nunjucks.configure('views', {express : app, watch :true});

// config.json의 내부 정보로 연결하기 윈한 db객체를 require합니다.
const {sequelize} = require('./models');

// 데이터 베이스 연결
// 모델 제작 후 데이터베이스 연결시 해당 모델에 매핑되는 테이블이 없으면 새로 테이블을 만들라는 옵션.
// force값이 true이면 기존 테이블도 지우고 강제로 만드렉 되니 주의하세요.
sequelize.sync({force:false}).then(()=>{
    console.log('데이터베이스 연결 성공');
}).catch((err)=>{
    console.error(err);
});

app.use((req, res, next) =>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});