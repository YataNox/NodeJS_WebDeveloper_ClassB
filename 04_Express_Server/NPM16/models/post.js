// 모델명 : Post, 테이블 명 : posts,
// 필드 : content(문자140, null 허용안함), img(문자200, null 허용)
// user 외 1:N 관계표시
// timestamp true, underscored false, paranoid false 나머지 기존 사항 그대로
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(){
        return super.init({
            content:{
                type:Sequelize.STRING(140),
                allowNull:null,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
        }, {
            sequelize,
            timestamps : true, // createAt, updateAt 필드 자동 생성
            underscored : false, // true이면 created_at, updated_at 
            modelName : 'Post',
            tableName : 'posts',
            paranoid : false, // 레코드 삭제 시 실제 삭제는 일어나지 않고 삭제시도시간이 기록돼서, 추후 복구 가능
            charset :'utf8', //mb4 이모티콘 포함
            collate :'utf8_general_ci',
        });
    } // 테이블의 생성
    static associate(db){
        db.Post.belongsTo(db.User); 
    }
};