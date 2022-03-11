// 필드 : title, id(자동 생성 고유번호) 관계 Post와 N:N관계
// title은 해시태그들
// Post 테이블 - 중간 테이블 - HashTag테이블
// 포스트 테이블에는 게시물들이 있고, hashTag 테이블에는 해시태그 단어들이 하나당 하나의 레코드를 이룹ㄴ디ㅏ.
// 중간 테이블 : 게시물번호1-해시태그1
// 게시물 번호1-해시태그2
// 게시물 번호2-해시태그3
// 게시물 번호2-해시태그4
// 게시물 번호3-해시태그2
// 게시물 번호3-해시태그4

// 해시태그4번으로 게시물 검색을 한다면, 게시물 번호2와 게시물 번호 3이 검색됨

const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            },
        },{
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'Hashtag',
            tableName : 'hashtags',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through:'PostHashtag'});
        // N:N 관계 설정 : belongToMany, 중간테이블 : through
    }
};