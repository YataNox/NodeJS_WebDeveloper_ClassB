const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 8090);

// app.get()또는 app.post()등.. 리퀘스트로 키워드를 받아 해당 요청에 응답을 보내주는 메소드들을 라우터(Router)라고 부릅니다.
// 첫 번째 매개변수 전달요소별로 리퀘스트 키워드를 요청받아 익명함수를 실행해서 응답.
// 그 메소드안에 들어가는 익명함수들 ()=>{}을 "미들웨어"라고 부릅니다.

// 미들웨어 종류에 대해 알아봅시다.
// 1. 모든 라우터들이 실행되기 전 실행되는 라우터 : 보통 다른 라우터들의 위쪽에 기술되어져셔, 모든 라우터들이 실행되기전 실행의 대상으로 인식됩니다.
app.use((req, res, next)=>{
    console.log('모든 요청에 실행하고 싶어요.');
    next();
    // 모든 라우터에 next가 있지만 사용하지 않아서 생략된 상태입니다. 필요하면 꺼내서 사용할 수 있습니다.
})
//--------------------------------------------------------------

// 2. 특정 리퀘스트 키워드 내에서만 실행할 미들웨어
app.use('/about', (req, res, next)=>{
    console.log('about 요청에만 실행하고 싶어요.');
    next();
})
// get과 pose등 키워드만 같으면 모든 method에서 실행됩니다.
// 실행 후 next()로 인해 제어권이 아래로 이동하며, 해당 get이나 post등이 추가 실행됩니다.
//------------------------------------------------------------------

app.get('/about', (req, res)=>{
    res.send('<h2>Hello, About</h2>');
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/abc', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index1.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
});
