// userid, pwd, name, phone, email, created_at 들을 필드로한 모델을 만들어주세요.
// board의 writer와 member의 userid하고 N:1관계를 설정해주세요.
// 기타의 설정은 board하고 같은 설정이거나 맞춰서 설정합니다.
const Sequelize = require('sequelize');
module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid:{
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true,
                unique:true,
            },
            pwd: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName : 'Member',
            tableName : 'members',
            paranoid: false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        });
    }
    static associate(db){
        db.Member.hasMany(db.Board, {foreignKey:'writer', sourceKey:'userid', onDelete:'cascade'});
    }
};