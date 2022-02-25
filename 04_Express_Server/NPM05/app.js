const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const exp = require('constants');
//------------------------------------------------------------ 

// express 설정
const app = express();
app.set('port', process.env.PORT || 8090);

app.use(morgan('dev'));
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
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    console.log(req.cookies); // 모두 읽어서 출력
    res.cookie('Login', 'loginTest', { // 쿠키에 특정 값을 저장
        httpOnly : true,
        path : '/'
    });

    // name이라는 이름의 쿠키가 있으면 000 님 반갑습니다. send
    if(req.cookies.id){
        res.send(`${req.cookies.id}님 안녕하세요.` + '<br><a href="/logout">로그아웃</a>');
    }else{// id쿠키가 없으면 index.html을 send
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pwd = req.body.pwd;
    console.log(id, pwd);

    if(id !== "scott"){
        const result = 1;
        console.log(JSON.stringify(result));
        return res.end(JSON.stringify(result));
    }else if(pwd !== "tiger"){
        const result = 2;
        console.log(JSON.stringify(result));
        return res.end(JSON.stringify(result));
    }else{
        res.cookie('id', id, { // 쿠키에 특정 값을 저장
            httpOnly : true,
            path : '/'
        });

        const result = 0;
        console.log(JSON.stringify(result));
        return res.end(JSON.stringify(result));
    }
});

app.get('/logout', (req, res)=>{
    // id 쿠키를 지우고, /로 리다이렉트 하세요
    res.clearCookie('id', req.cookies.id, {
        httpOnly:true,
        path:'/'
    }).redirect('/');
    // res.clearCookie('id').redirect('/');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});
