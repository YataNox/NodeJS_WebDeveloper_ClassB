const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cookieParser('nodejsdotenv'));

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'nodejsdotenv',
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie',
}));

app.get('/', (req, res)=>{
    if(req.session.userid){
        res.send(`${req.session.userid}님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
})

app.post('/login' , (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    console.log(id, pw);

    if(id=='scott' && pw=='tiger'){    
        req.session.userid = id;
        
        return res.json({msg:'ok'}); // json 데이터를 갖고 호출위치로 되돌아갑니다.
        // send는 화면 전환이 발생하지만, json은 화면 전환없이 리턴이 가능합니다.
    }else if(id != 'scott'){
        return res.json({msg:'없는 아이디입니다.'});
    }else if(pw != 'tiger'){
        return res.json({msg:'비밀번호가 맞지 않습니다.'});
    }else{
        return res.json({msg:'알 수 없는 이유로 로그인이 안됩니다.'});
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
});

app.listen( app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});