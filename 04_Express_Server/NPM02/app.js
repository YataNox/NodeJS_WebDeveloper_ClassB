const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 8090); // 서버내에 port라는 변수를 만들어서 현재 환경의 포트 또는 포트가 지정되지 않았다면 3000을 저장합니다.

app.get('/', (req, res)=>{
    //res.send('<h1>Hello, Express Server #2</h1>');
    // __dirname의 내용과 index.html 파일명이 조합된 종합 경로가 만들어지고 해당 파일의 내용으로 클라이언트에 응답합니다.

    // 02_Internal_module의 04번 파일에서 발췌
    // console.log('path.join():', path.join(__dirname, '..', '/woojin', '.', '/node_js'));
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
});
