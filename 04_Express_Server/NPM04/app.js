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
const exp = require('constants');
//------------------------------------------------------------ 

// express 설정
const app = express();
app.set('port', process.env.PORT || 8090);

// 공통 미들웨어 설정---------------------------------------------
app.use(morgan('dev'));
// 실행결과 : GET / 200 5.315ms - 165
// method 방식, 응답 결과 코드, 요청과 실행에 걸린 시간 등등
// app.use(morgan('combined')); 더 자세한 내용을 볼 수도 있습니다.
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
// ----------------------------------------------------------------------

app.post('/login', (req, res)=>{
    // http 서버에서 전달 파라미터를 분해하는 과정
    // const {query} = url.parse(req.url);
    // console.log(query);
    // const {name} = qs.parse(query);

    // express 서버에서 전달 파라미터를 활용하는 과정
    // console.log(req.body.name);
    const name = req.body.name;

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    res.cookie('id', name, {
        expires : expires,
        httpOnly : true,
        path : '/'
    }); // 파라미터 내용을 쿠키로 추가

    res.redirect('/');
});


app.get('/', (req, res)=>{
    // http 서버에서 쿠키를 얻어오거나 저장하는 방식
    // console.log(req.url, req.headers.cookie); // 클라이언트의 요청에는 header의 쿠키가 자동으로 동봉됩니다.
    // res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    /* 
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
    */

    /*
    express 서버에서 쿠키를 읽어오거나 저장하는 방식
        1. 저장된 쿠키를 불러와서 활용할 변수 req.cookies
        console.log(req.cookies);
        2. 새로운 쿠키의 저장
        const name = 'HongGilDong';
        res.cookies('name', encodeURIComponent(name), {
            expires:new Date(),
            httpOnly:true,
            path:'/'
        });
        3. 쿠키의 삭제
        res.clearCookies('name', encodeURIComponent(name), {
            httpOnly:true,
            path:'/'
        });
    */

    console.log(req.cookies); // 모두 읽어서 출력
    console.log(req.cookies.test); // test만 출력
    res.cookie('test', 'cookietest', { // 쿠키에 특정 값을 저장
        httpOnly : true,
        path : '/'
    });

    // name이라는 이름의 쿠키가 있으면 000 님 반갑습니다. send
    if(req.cookies.id){
        res.send(`${req.cookies.id}님 안녕하세요.` + '<br><a href="/logout">로그아웃</a>');
    }else{// id쿠키가 없으면 index.html을 send
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.get('/logout', (req, res)=>{
    // id 쿠키를 지우고, /로 리다이렉트 하세요
    res.clearCookie('id', req.cookies.name, {
        httpOnly:true,
        path:'/'
    }).redirect('/');
    // res.clearCookie('id').redirect('/');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});

// 4. 세션의 저장
// req.session.id='hello';
// req.session.data = 'afdafd';
// 다른 미들웨어에서 req.session.data라는 이름으로 사용가능
// (영구적 저장)