const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views')); // 대상 퍼그 파일의 경로 설정
app.set('view engine', 'put'); // 템플릿 엔진에 퍼그 설정

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/login.html'));
});

app.listen( app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});

// PUG

// html의 단점 : 조건문의 부배, 반복 실행문의 부재, 변수의 부재, 동적페이지 제작이 불가능
// 위의 사유로 추가적인 마크업 또는 프론트 개발 언어가 추가로 사용됩니다.
// express서버에서는 pug라는 언어를 사용합니다.
// 추가로 pug와 비슷한 numjucks를 사용하기도 합니다.
// 이들을 쓰기위해선 express서버의 탬플릿 엔진을 사용해야 하며, 추가적인 require의 대상도 설치해야합니다.

// HTML을 대신하여 사용할 마크업 언어이면서 부족했던 조건, 반복, 변수의 기능이 추가되어 있습니다.