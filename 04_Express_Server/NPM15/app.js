const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

const {sequelize} = require('./models');

sequelize.sync({force:false}).then(()=>{
    console.log('데이터베이스 연결 성공');
}).catch(()=>{
    console.error(err);
});



app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
})