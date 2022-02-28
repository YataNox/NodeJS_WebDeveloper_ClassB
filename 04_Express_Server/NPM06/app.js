const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);  

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"changdae",  
}));  


app.get('/' , (req, res)=>{
    if(req.cookies.id){ 
        res.send(`${req.cookies.id} 님 반갑습니다` + '<br><a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});

app.post('/login' , (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    console.log(id, pw);

    if(id=='scott' && pw=='tiger'){    
        res.cookie( 'id' , id , {expires : expires, httpOnly : true, path : '/' }); 
        
        return res.json({msg:'ok'}); // json 데이터를 갖고 호출위치로 되돌아갑니다.
        // send는 화면 전환이 발생하지만, json은 화면 전환없이 리턴이 가능합니다.
    }else{
        
    }
    
});

app.get('/logout', (req, res) => {
    // id, pw 쿠키를 지우고, / 로 리다이렉트
    res.clearCookie( 'id' , req.cookies.name , {httpOnly:true, path:'/'});
    res.clearCookie( 'pw' , req.cookies.name , {httpOnly:true, path:'/'});
    res.redirect('/');
});

app.listen( app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});