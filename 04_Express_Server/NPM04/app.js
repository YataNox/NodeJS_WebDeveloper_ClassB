const express = require('express');
const path = require('path');
// 추가 설치 모듈 require---------------------------------
// 각각의 요청과 응답에 대한 필요정보를 보기 위한 모듈
const morgan = require('morgan');
// 쿠키 사용을 http 서버때보다 간결하게 사용하기 위한 모듈
const cookieParser = require('cookie-parser');
// 세션 사용을 http 서버때보다 간결하게 사용하기 위한 모듈
const session = require('express-session');
// 요청의 본분을 해석 및 구분하는 모듈
const bodyParser = require('body-parser');
//------------------------------------------------------------ 

// express 설정
const app = express();
app.set('port', process.env.PORT || 8090);

// 공통 미들웨어 설정---------------------------------------------
app.use(morgan('dev'));
// 실행결과 : GET / 200 5.315ms - 165
// method 방식, 응답 결과 코드, 요청과 실행에 걸린 시간 등등
// app.use(morgan('combined')); 더 자세한 내용을 볼 수도 있습니다.
app.use(cookieParser());
app.use(express.json()); // 바디파서 json : json 사용을 위한 모듈
app.use(express.urlencoded({extended:true})); // 바디 파서 폼데이터 모듈
// app.use(body-Parser.json());
// app.use(body-Parser.urlencoded({extended: false}));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"rladnwls",
})); // 세션 활용을 위한 미들웨어
// ----------------------------------------------------------------------


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});