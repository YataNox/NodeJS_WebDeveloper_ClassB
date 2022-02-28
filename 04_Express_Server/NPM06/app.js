const express = require('express');
const path = require('path');
const cookieParser = require('cookieParser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res)=>{
    if(req.cookie.id){
        res.send(`${req.cookie.id}님 반갑습니다.` + '<br><a href="/logout">로그아웃</a>');   
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pwd = req.body.pwd;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);

    if(id == 'scott' && pw=='tiger'){
        res.cookie('id', id,{
            expires : expires,
            httpOnly : true,
            path : '/'
        });
        return res.json({msg:'ok'}); // json 데이터를 갖고 호출 위치로 되돌아 갑니다.
        // send는 화면전환이 발생하지만 json은 화면 전환없이 리턴이 가능합니다.
    }else{
        
    }
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
});