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