// 10_WriteFilePromise.js

const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다.').then(()=>{
    return fs.readFile('./writeme.txt'); // 파일을 읽어오는 Promise를 리턴
}).then((data)=>{
    console.log(data.toString());
}).catch((err)=>{
    console.error(err);
});