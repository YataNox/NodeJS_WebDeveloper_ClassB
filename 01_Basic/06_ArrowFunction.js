// 06_ArrowFunction.js 화살표 함수

// 함수의 표현방법 #1 선언적 함수
function add1(x,y){
    return x+y;
}
console.log(add1(10,20));

// 함수의 표현방법 #2 익명 함수
let add2 = function(x,y){
    return x+y;
}
console.log(add2(10,20));

// 함수의 표현방법 #3-1 화살표 함수(람다식)
// 익명함수 (x,y) => {return x+y;}가 add3에 저장
const add3 = (x,y)=>{return x+y};
console.log(add3(10,20));

// 함수의 표현방법 #3-2 
const addr = (x,y)=> x+y;
console.log(addr(10, 20));
// 함수의 몸체가 단순하게 매개변수들의 연산의 결과들을 return하는 명령만 있을 때 사용.

// 함수 표현 방법 #3-3
const add5 = (x,y) => (x+y);
console.log(add5(10, 30));

function not1(x){
    return !x;
}
console.log(not1(true));

const not2 = x => !x;
console.log(not2(true));

// 매개변수 없고 리턴 값이 없는 함수
const func1 = () => {
    console.log('매개변수 없고 리턴 값 없는 함수');
}
func1();

// 매개변수 있고 리턴 값이 없는 함수
const func2 = (x,y) =>{
    console.log(`매개변수 (${x}, ${y}) 있고 리턴 값 없는 함수`);
}
func2(10, 20);

// 매개변수 있고 리턴 값이 있는 함수
const func3 = (x,y) => {
    console.log(`매개변수 (${x}, ${y}) 있고 리턴 값 있는 함수`);
    return x+y;
}
console.log('리턴값 : ' + func3(10,20));

// 매개변수 없고 리턴 값이 있는 함수
const func4 = () => {
    console.log(`매개변수 없고 리턴 값 있는 함수`);
    return 100;
}
console.log('리턴 값 : ' + func4());

// 매개변수 있고 단순 리턴 값만 있는 함수
const func5 = (x,y) => x+y;
// const func5 = (x,y) => (x+y);