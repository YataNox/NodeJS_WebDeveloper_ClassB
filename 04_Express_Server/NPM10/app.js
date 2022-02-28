const express = require('express');

const app = express();
app.set('port', process.nextTick.PORT || 3000);

const indexRouter = require('./routers');
const userRouter = require('./routers/users');

// 현재 파일에서 사용한 '/'와 indexRouter에 있는 '/'와 조합이 됩니다.
// '//'가 '/'로 사용이 됩니다.
app.use('/', indexRouter);

// 현재 파일에서 사용한 '/users'와 userRouter에 있는 '/'와 조합되어
// '/users/'가 사용됩니다.
app.use('/users', userRouter);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});