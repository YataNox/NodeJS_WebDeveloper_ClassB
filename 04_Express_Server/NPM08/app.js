const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// 업로드를 하려면 업로드된 파일이 저장될 폴더를 지정해줘야 합니다.
// 다만 fs 모듈에 있는 함수를 이용하여 사용하려는 폴더가 있다면 사용. 없다면 생성하는 동작을 실행합니다.
// 파일 폴더와 같은 외부의 리소스를 다루는 작업은 명령 오류와 상관없이 디스크 상태에 따라 오류가 발생할 수 있으며 예외처리를 해줍니다. 특히나 지금은 readdirSync가 실행될 때 해당 폴더가 없다면 에러가 발생하므로 그에 대한 처리로 예외처리를 이용합니다.
try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// 현재 프로젝트에서 사용할 multer 객체를 생성합니다. 객체이름 upload
// multer 함수에 전달인수로 객체 하나를 전달하는데 그 객체에는 storage 와 filename라는 속성이 포함됩니다.
const upload = multer(
    {storage : multer.diskStorage(
        {
            destination(req, file, done){
                done(null, 'uploads/'); // 폴더 설정
                // 첫 번째 인수 null은 현재파일(file)의 경로와 이름 그대로 사용.
                // (변경 및 추가 없음)
            }, 
            filename(req, file, done){
                const ext = path.extname(file.originalname);// 확장자 추출
                // 확장자를 뺀 파일 이름 + 오늘 날짜(밀리초) + 추출된 확장자로 저장 파일명 변경
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
                // abc.jpg => 'abc' + 123456483 + '.jpg' ->abc123456483.jpg
                // 업로드 파일명이 같은 경우 cos처럼 처리할 객체가 없고, 위와 같은 방법으로
                // 파일명의 충돌을 방지합니다.(오늘날짜시간의 밀리초 값)
            },
        }
    ),
    limits:{fileSize : 5 * 1024 * 1024}, //업로드 파일 사이즈의 제한
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multer.html'));
});

app.post('/upload', upload.single('image'), (req,res)=>{
    
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
})