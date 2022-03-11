// 모델명 : Post, 테이블명 :posts,
// 필드 : content(문자140, null 허용안함), img(문자200, null 허용)
// user와 1:N 관계표시
// timestamp ture, underscored false, paranoid false, 나머지 기존사항 그대로

const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type:Sequelize.STRING(140),
                allowNull:false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,    // createAt, updateAt 필드 자동 생성
            underscored:false,  // create_At, update_At
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false, 
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        }); 
    } // 테이블의 생성
    static associate(db){
        db.Post.belongsTo(db.User);   
        db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'});
    } 
};