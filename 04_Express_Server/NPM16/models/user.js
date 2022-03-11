const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(){
        return super.init({
            email:{
                type:Sequelize.STRING(50),
                allowNull:true,
                unique:true, // null 값끼리는 고유값 적용을 하지 않습니다
            },
            nick:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            password:{
                type:Sequelize.STRING(100), // 암호화하면 길어짐
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
        }, {
            sequelize,
            timestamps:true, // createAt, updateAt 필드 자동 생성
            underscored:false, // true이면 created_at, updated_at 
            modelName: 'User',
            tableName: 'users',
            paranoid:true, // 레코드 삭제 시 실제 삭제는 일어나지 않고 삭제시도시간이 기록돼서, 추후 복구 가능
            charset:'utf8', //mb4 이모티콘 포함
            collate:'utf8_general_ci',
        });
    } // 테이블의 생성
    static associate(db){
        db.User.hasMany(db.Post); // Post 모델의 테이블과 1:N 관계로 설정
        // 1:N 관계에 외래키와 그 대상을 지정하지 않으면, 자연스럽게 기본키가 설정됩니다
        // 현재 자동으로 생성되는 id가 Post 모델의 테이블에 생성될 예정입니다

        // 팔로워와 팔로잉 관계 테이블과 User 테이블 관계를 성정
        // ...

    } // 테이블 간의 관계(1:N 또는 1:1 또는 N:N) 
};