const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // num, subject, Writer, content, readCount,createAt
            // num -> 자동생성되는 id로 대체합니다.
            // Writer -> Member 테이블의 userid와 1:N 관계로 생성합니다.
            subject:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            readCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName : 'Board',
            tableName : 'boards',
            paranoid: false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        });
    }
    static associate(db){
        db.Board.belongsTo(db.Member, {foreignKey : 'writer', targetKey : 'userid'});
        db.Board.hasMany(db.Reply, {foreignKey:'boardnum', sourceKey:'id', onDelete:'cascade'});
    }
};