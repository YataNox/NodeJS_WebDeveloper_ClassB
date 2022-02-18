// 03_Object.js

// 자바스크립트의 객체 생성
// {} 중괄호 안에 key(요소이름)와 value(요소의 값)dl ':'(콜론)으로 구분되어서 존재하는 값들의 집합
var product = {name : '냉장고', 제조사: '대한민국'};
// 변수 하나 안에 한 개 이상의 키와 값이 조합되어 데이터를 넣어 사용합니다.
// 객체 안에 있는 키와 값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분합니다.

// 객체내의 키를 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

// 자바스크립트의 객체는 별도의 클래스 선언 없이, {}중괄호 안에 직접 속성들을 넣는 순간 객체(Object)로 인식되어 사용되어 집니다.

// 2, 객체의 속성과 메소드
// - 속성 : 객체 내부에 있는 하나하나의 값
// - 객체의 속성이 가질 수 있는 자료형
var object = {
    useName:273,
    useStirng:'문자열',
    useBoolean:true,
    useArray:[52,385,103,58],
    // 메소드 : 객체의 속성 중 함수 자료형인 속성
    method:function(){
        console.log('멤버 함수를 실행합니다.');
    }
};

object.method(); // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행합니다.
console.log(object.method);
console.log(object.method());
console.log(object.useName); // 함수의 내용 실행 : object.method()에 의해 '멤버함수를 실행합니다.' 출려r
console.log(object.useArray);

// 멤버함수에 매개변수가 존재할 수 있습니다.
var person = {
    name:'홍길동',
    eat:function(food){
        console.log('음식 : ' + food);
    }
};
console.log(person.name);
person.eat('스파게티');

// 3. 객체와 반복문
var product = {
    name: 'Eclipse & Tomcat',
    price:'Free',
    language:'한국어',
    supprotOS:'win32/64',
    subscripton:true
};
// 객체 이름을 반복문에 대입하여 각 멤법 변수들의 값에 접근합니다.
for(var key in product){
    var output = `${key} : ${product[key]}`;
    console.log(output);
}

// 4. 객체와 관련된 키워드
var student = {
    이름 : '홍길동',
    국어 : 92, 수학 : 98, 영어 : 96, 과학 : 98
};

// - in 키워드 : 해당 키가 객체 안에 있는지 확인
var output = '';
output += "'이름' in student : " + ('이름' in student) + '\n';
output += "'성별' in student : " + ('성별' in student);
console.log(output);

// - with 키워드 : 복잡하게 사용해야 하는 코드를 짧게 줄여주는 키워드.
// - with 키워드를 사용하지 않은 경우
var student = {
    이름 : '홍길동',
    국어 : 92, 수학 : 98, 영어 : 96, 과학 : 98
};
var write = '';
write += '이름 : ' + student.이름 + '\n';
write += '국어 : ' + student.국어 + '\n';
write += '수학 : ' + student.수학 + '\n';
write += '영어 : ' + student.영어 + '\n';
write += '과학 : ' + student.과학 + '\n';
console.log(write);

// - with 키워드를 사용한 경우
var write = '';
with(student){
    write += '이름 : ' + 이름 + '\n';
    write += '이름 : ' + 국어 + '\n';
    write += '이름 : ' + 수학 + '\n';
    write += '이름 : ' + 영어 + '\n';
    write += '이름 : ' + 과학 + '\n';
}
console.log(write);

// 5. 객체의 속성 추가와 제거
// - 동적 속성 추가/제거 : 처음 객체 생성하는 시점 이후에 객체의 속성을 추가하거나 제거할 수 있습니다.

// 빈 객체를 생성
var student = {};
// 객체 생성 이후 동적으로 속성(멤버변수)를 추가 할 수 있습니다.
student.이름 = '홍길동';
student.취미 = '악기';
student.특기 = '프로그래밍';
student.장래희망 = '훌륭한 프로그래머';

for(var key in student){
    console.log(`${key} : ${student[key]}`);
}

// 객체 안에 변수와 함수를 선언하는 경우
// var student = {이름 : '홍길동', toString.function(){}};

// 동적으로 메소드 추가
student.toString = function(){
    for(var key in this){
        if(key != 'toString'){
            console.log(`${key} : ${student[key]}`);
        }
    }
}
student.toString();

// 객체의 속성 제거
delete(student.장래희망);
student.toString();

// 6. 생성자 함수 : new 키워드를 사용해 객체를 생성할 수 있는 함수
// - 생성자 함수를 사용한 객체의 생성과 출력. 그냥 함수를 사용해 객체를 리턴하는 방법과 차이가 없어보임.
function Student(name, korean, math, english, science){
    // 속성
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    // 메소드
    this.getSum = function(){
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function(){
        return this.getSum() / 4;
    }
    this.toString = function(){
        return this.name + " : " + this.getSum() + ", " + this.getAvg();
    }
}

var obj1 = new Student('홍길동', 85, 90, 95, 100);
console.log('이름   : 총점, 평균');
console.log(obj1.toString());

// 7. 프로토타입
// - 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간.
// - 자바스크립트의 모든 함수는 변수 prototype을 갖습니다. 그리고 prototype은 객체입니다.
function Student(name, korean, math, english, science){
    // 속성
    this.name=name;
    this.kor=korean;
    this.math=math;
    this.english=english;
    this.science=science;
}
// 모든 함수에 존재하는 프로토 타입은 특히나 객체의 생성자로 사용할 때 용도가 확실해집니다.
// 가장 간단한 표현 : 생성자 함수에 메소드 추가용 키워드
Student.prototype.getSum = function(){
    return this.kor+this.math+this.english+this.science;
}

Student.prototype.getAvg = function(){
    return this.getSum() / 4;
}

Student.prototype.toString = function(){
    return this.name + " : " + this.getSum() + ", " + this.getAvg();
}
std1 = new Student("홍길동", 56, 87, 55, 99);
console.log(std1.toString());