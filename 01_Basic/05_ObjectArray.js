// 05_ObjectArray.js

// 생성자 함수로 배열의 요소 추가
function Student(name, korean, math, english, science){
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    this.getSum = function(){
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function(){
        return this.getSum() / 4;
    }
    this.toString = function(){
        return this.name + ": " + this.getSum() + ", " + this.getAvg();
    }
}

let students = []; // 비어있는 배열을 생성
let Obj1 = new Student('홍길동', 80, 65, 98, 78); // Student 객체 선언

students.push(Obj1); // 선언한 객체를 배열에 추가

Obj1 = new Student('홍길서', 65, 87, 89, 87);
students.push(Obj1);

students.push(new Student('홍길남', 88, 88, 99, 75));
students.push(new Student('홍길북', 85, 60, 85, 70));
students.push(new Student('김길동', 65, 60, 75, 80));
students.push(new Student('이길동', 75, 95, 85, 90));
students.push(new Student('박길동', 90, 80, 75, 90));

console.log('이름   총점    평균');
for(var i in students){
    console.log(students[i].toString());
}

// 문자열의 연산과 함수 변수의 활용
let sayNode = function(){
    console.log('Node');
}; // 단순 함수를 sayNode 변수에 저장. 익명함수를 변수에 넣어서 저장 sayNode();
// sayNode();

let myName = 'NodeJS';
let oldObject = {
    // myName : 'NodeJS',
    // myName : myName,
    myName,
    sayJS:function(){
        console.log('JS');
    },
    //sayNode:function(){
    //    console.log('Node');
    //} // 멤버변수 sayNode에 익명함수 대입

    // sayNode:sayNode, // 멤버변수 sayNode에 익명함수가 저장된 변수 sayNode를 대입.

    sayNode, // key이름과 value변수 이름이 같으면 한 번만 써도 (:생략) 무방합니다.
}

console.log(oldObject.myName);
oldObject.sayJS();
oldObject.sayNode();

let es = 'ES';
oldObject[es + '6'] = 'Fantistic'; // es6이라는 멤버변수 생성. 문자열 연산에 의해 변수 이름을 조합한 예
console.log(oldObject.ES6);

// const 변수로 객체 생성
const newObject = {
    myName,
    sayJS(){
        console.log('JS');
    },
    sayNode,
    [es + 6] : 'Fantastic',
};
console.log(newObject.myName); // myName
newObject.sayNode(); // Node;
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic

// 객체의 구조 분해
console.log();
const sayJ = newObject.sayJS; // 객체내의 함수를 별도의 변수에 저장
sayJ();
var sayN = newObject.sayNode;
sayNode();
var es6 = newObject.ES6;
console.log(newObject.ES6);
console.log(es6);

// 객체의 구조 분해를 하지 말아야 하는 경우 - this를 사용하는 객체는 구조분해를 하지 않는 것이 좋습니다.
const candyMachine = {
    status : {
        name : 'node',
        count : 5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    },
};
console.log(candyMachine.getCandy());
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
// getCandy(); // 에러
console.log(count);
// 객체 내의 메소드가 구조 분해 되는 순간 안에 있던 this를 사용할 수 없게 되므로 그 안의 count 또한 없는 변수가 되어 에러를 발생합니다.

// 필요한 데이터 또는 함수의 구조 분해를 한 번에 실행할 수 있습니다. 다만 아래 예제 또한 this를 사용하고 있어서 구조 분해를 하지 않는 것이 좋습니다.
// const {getCandy, status:{count}} = candyMachine;
// console.log(getCandy()); // 에러
// 위와 같이 한 번에 구조 분해를 하기 위해선 중괄호{} 안에 변수 이름을 맞춰서 분해합니다.
// 분해하지 않으려고 하는 멤버는 중괄호 안에 쓰지 않고 분해에서 제외할 수 있습니다.

// 이는 아래와 같이 배열에 여러 자료를 넣어 놓고 인덱스를 이용하여 따로 따로 추출하는 것과 한 번에 추출하는 모양과 같은 형식으로 사용합니다.
let array = ['nodejs', {}, 10, true];
let node = array[0];
let obj = array[1];
let bool = array[3];
console.log(node, obj, bool);
console.log(obj);
// 한 번에 추출
const array2 = ['nodejs2', {}, 20, false];
const[node2, obj2, , bool2] = array2;
console.log(node2, obj2, bool2);

// const{myName, sayJS, sayNode, ES6} = newObject;