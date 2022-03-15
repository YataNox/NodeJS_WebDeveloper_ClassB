const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email:{
                type:Sequelize.STRING(50),
                allowNull:true,
                unique:true,    // null 값끼리는 고유값 적용을 하지 않습니다.
            },
            nick:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            provider:{
                type:Sequelize.STRING(10),
                allowNull:false,
                defaultValue:'local',
            },
            snsId:{
                type:Sequelize.STRING(30),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,    // createAt, updateAt 필드 자동 생성
            underscored:false,  // create_At, update_At
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // 레코드의 삭제시 실제 삭제는 일어나지않고 삭제시도 시간이 기록되서, 추후 복구가능
            charset:'utf8',
            collate:'utf8_general_ci',
        }); 
    } // 테이블의 생성
    static associate(db){
        db.User.hasMany(db.Post);   // Post 모델의 테이블과 1:N 관계로 설정
        // 1:N 관계에 외래키와 그 대상을 지정하지 않으면, 자연스럽게 기본키가 설정됩니다.
        // 현재는 자동으로 생성되는 id 가 Post 모델의 테이블에 생성될예정입니다.


        // 팔로워와 팔로잉 관계 테이블과 User 테이블 관계를 설정
        // ...
        db.User.belongsToMany(db.User, {
            foreignKey : 'followingId',
            as : 'Followers', // 팔로워 들을 검색해야 나를 팔로잉하는 사람들이 검색이 되기때문에...
            through : 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey : 'followerId',
            as : 'Followings', // 팔로잉들을 검색해서 나가 팔로우하는 사람들을 검색하기 위해
            through : 'Follow',
        });
    }  // 테이블간의 관계설정(1:N 또는 1:1 또는 N:N)
};

// 테이블에 필드는 Followers, Followings가 있는데
// 유저1이 유저2를 팔로잉한다.
// 유저1(Followers), 유저2(Followings)로 레코드 생성
// 반대로 유저2가 유저1을 팔로잉한다.
// 유저2(Followers), 유저1(Followings)로 레코드 생성
// 유저3(Followers), 유저1(Followings)
// 유저4(Followers), 유저1(Followings)
// 이 테이블에서 유저1의 팔로워들은 유저2, 유저3, 유저4가 됩니다.
// 유저2가 팔로잉하는 유저는 유저1과 유저4입니다.
