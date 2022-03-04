const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

const Member = require('./member');
const Board = require('./board');
const Reply = require('./reply');

db.sequelize = sequelize;
db.Sequelize = sequelize;

db.Member = Member;
db.Board = Board;
db.Reply = Reply;

Member.init(sequelize);
Board.init(sequelize);
Reply.init(sequelize);

Member.associate(db);
Board.associate(db);
Reply.associate(db);

module.exports = db;