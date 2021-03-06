// 변수 선언
// 자바 스크립트의 버젼에 따라 사용하는 변수 선언이 달라지고 있습니다.
// 브라우져를 대상으로 하는 ES0215 버젼에서는 var로 변수 선언이 많이 되었지만 이후부터는 const 또는 let 변수를 많이 사용합니다.

var x = 3;
console.log(x);
x = '홍길동';
console.log(x);

// 상수형 변수 선언 const
// 변수의 생성과 함께 반드시 초기 값이 있어야 하며, 이후 값의 변경이 불가능합니다.
const y = 3;
console.log(y);
// y = '홍길동'; // 에러 - const 변수는 최초 1회만 값을 할당할 수 있습니다.

// var와 const의 차이점
// - 블록 스코프 : var 변수는 영역(지역변수)과 상관없이 값이 접근이 가능합니다.
if(true){
    var a = 3;
}
console.log(a);
// 다만 함수의 시작과 끝을 구분짓는 중괄호는 영향을 받아서 함수를 벗어나면 변수로 인식되지 못합니다.

// 반면 const 변수는 블록영역에 영향을 받아 접근이 구분됩니다.
if(true){
    const b = 3;
}
// console.log(b); // 에러

// const 변수는 상수형 변수라고 부릅니다.
// 한 번 할당된 값은 변경할 수 없으며, 상수 선언 초기화가 없어도 에러가 발생합니다.
const a1 = 0;
// a1 = 1; // 에러
// 값을 변경할 수 있는 변수를 사용하려면, 앞에서 사용한 var 변수나, 서버 프로그래밍에서 주로 사용하는 let 변수를 사용합니다.
// var과 let 변수의 차이는 다소 많지는 않으며, 명백히 다른 점이 있지만 현재 사용상 구분할 일이 그렇게 많지는 않습니다.
// 버전업과 제작자 사이에서 있을 수 있는 차이입니다.

let b1 = 0;
b1 = 1; // 정상 실행

// const, let, var의 차이점
// 자바스크립트의 변수 생성은 선언, 할당(초기값 대입) 사용의 단계로 구분됩니다. const와 let은 그 실행과 시험이 구분되어 사용해야 하지만, var은 그 구분에 비교적 자유롭습니다.
// const와 let변수는 반드시 선언 후 사용해야하며, var는 선언없이 사용될 수 있습니다. 따라서 선언과 할당없이 사용된 변수는 모두 var 변수입니다.
// 선언되지 않고 사용된 var변수의 최초 값은 undefined입니다.

// const
// - 선언과 함꼐 할당되며, 새로운 값으로 재할당이 되지않습니다.
// - 변수 선언 후 반드시 초기 값이 할당되어야합니다.
// - 중괄호 영역(스코프)에 영향을 받아 스코프를 벗어나면 변수가 인식되지 못합니다.
// - 에러내용 (변수이름 is not defined)
if(true){
    const a = 213;
}
// console.log(a); // 에러

// let
// - 재할당이 가능한 변수입니다.
// - const와 같이 반드시 선언 후 사용해야 합니다.
// - 같은 이름의 변수를 중복 선언시 에러가 발생합니다.
let b = 456;
// let b = 789; // 에러
// - 초기 값 할당없이 선언된 변수의 최초 값은 undefined입니다.
// - 중괄호 영역(스코프)에 영향을 받아 스코프를 벗어나면 변수가 인식되지 못합니다.
// - 에러내용 (변수이름 is not defined)
if(trun){
    let c = 123;
}
// console.log(c); // 에러

// var
// - 선언, 할당, 사용이 위치와 상관없이 자유롭습니다.
// - 스코프에 상관없이 값의 접근이 가능합니다.
// - 같은 스코프 안에서 중복 선언도 가능합니다. 이때 마지막에 대입된 값을 현재값으로 인식합니다.
var i = 10;
var i = 20; // 정상 실행
// - 이와 같은 특성으로 구조가 복잡한 함수내에서는 현재 값을 유추하는데 다소 불편함이 있습니다.
// - 값이 변경이 자유로워서 의도한 값의 저장 및 유지가 실패할 가능성이 있습니다.
// - 함수의 영역을 벗어나는 스코프에만 영향을 받습니다.

// 변수 선어노가 선언 키워드 별 사용의 방향
// 1. 변수 선언에는 기볹거으로 const를 사용하고, 재할장이 필요한 경우에 한정해 let을 사용하는 것을 권장합니다.
// - 객체를 재할당하는 경우는 생각보다 흔하지 않으므로, 객체 변수 또한 const를 사용하는 것을 권장하며, const를 사용하면 의도치 않은 재할당을 방지해주기 때문에 데이터의 안전을 보장 받을 수 있습니다.
// 2. 재할당이 필요한 경우에 한정해 let을 사용합니다. 이 때, 변수의 스코프(영역)은 최대한 좁게 만드는 것을 권장합니다.
// 재할당이 필요 없는 상수와 객체에만 const를 사용합니다.