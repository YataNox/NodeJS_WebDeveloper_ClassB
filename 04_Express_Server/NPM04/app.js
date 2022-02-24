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

const app = express();

app.set('port', process.env.PORT || 8090);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});