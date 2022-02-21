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