// 09_WriteAndRead.js

// writeme2.txt에 '안녕하세요. 반갑습니다.'를 쓰고 바로 읽어서 콘솔창에 출력하세요.

const fs = require('fs');

fs.writeFile('./writeme2.txt', '안녕하세요. 반갑습니다.', (err)=>{
    if(err){
        throw err;
    }
    // fs.readFile();를 사용하여 방금 파일에 쓴 글을 바로 읽어서 화면에 쓸 수 있습니다.
    const fsp = fs.promises;
    fsp.readFile('./writeme2.txt').then((data)=>{
        console.log(data);
        console.log(data.toString());
    }).catch((err)=>{
        console.error(err);
    });
});