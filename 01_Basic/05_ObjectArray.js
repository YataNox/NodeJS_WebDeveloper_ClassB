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