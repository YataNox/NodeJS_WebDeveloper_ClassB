// 12_ReadFileAsyncPromise.js

console.log('시작');
// readme.txt 2,3 파일을 차례로 읽어 출력하고
// 마지막에 끝이라고 출력합니다. promise의 then-체인방식을 이용하세요.

const fs = require('fs').promises;

fs.readFile('./readme.txt').then((data)=>{
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
}).then((data)=>{
    console.log('2번', data.toString());
    return fs.readFile('./readme3.txt');
}).then((data)=>{
    console.log('3번', data.toString());
    console.log('끝');
}).catch((err)=>{
    console.err(err);
});