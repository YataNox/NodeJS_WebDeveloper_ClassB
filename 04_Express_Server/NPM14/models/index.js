const Sequelize = require('sequelize');

// 만들어놓은 테이블을 위한 모듈을 이곳에 require 합니다.
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // node.js에 접속하기 위한 접속객체를 db에 담습니다.
db.Sequelize = Sequelize; // require한 순수 Sequelize모듈을 db에 담습니다.

// require한 user모델과 comment모델도 db에 담습니다.
db.User = User;
db.Comment = Comment;

// 모델 객체를 초기화하는 함수와 관계 형성 함수를 실행합니다.
User.init(sequelize);
Comment.init(sequelize);
User.associate(db);
Comment.associate(db);

// 여기까지의 코드가 테이블이 생성되는 내용을 구성하는 코드입니다.
// 밑에 코드처럼 db가 exports 되고, app.js에 require되면, require된 db에서 sequelize를 꺼내어서 sync함수를 실행하게 되고 이때 테이블도 생성합니다.

module.exports = db;
