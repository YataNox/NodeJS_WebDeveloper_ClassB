// 01_Server01.js

const http = require('http');
// createServer 함수 : 이 함수로 자바스크립트로 만든 http 서버실행이 가능해집니다.
// req와 res를 전달받아 실행되는 익명함수를 포함한 createServer 함수로 클라이언트로부터 들어온 요청에 응답합니다.
http.createServer((req, res)=>{
    // 서버요청 시 응답내용이 쓰여집니다.
    res.write('<h1>Hello Node Server!!</h1>');
    res.write('<p>Welcome to My Node Server!!</p>')
}).listen(8090, ()=>{
    console.log('8090포트에서 서버가 대기중입니다.');
});
