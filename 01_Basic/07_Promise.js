// 07_Promise.js

// 함수와 비슷한 기능을 갖고 있는 객체.
// 객체내의 익명함수의 내용을 실행하고, 결과를 보관하고 있다가, 결과가 필요할 때 전달 받아 사용할 수 있게 해주는 구조의 객체

// const pm = new Promise(/* 익명함수 */); // promise 객체의 전달인수 없는 선언문.
// promise 객체는 생성자의 전달인수로 현재 promise 객체의 기능을 갖는 익명함수를 전달하여야 생성됩니다..
// func = (resolve, reject) => { }
// const pm = new Promise(func);
// 또는
// const pm = new Promise((resolve, reject) => { });
// 객체변수의 이름 pm

// 전달인수로 전달되는 익명함수의 내용
// (resolve, reject) => {
//    if(condition) resolve('성공');
//    else reject('실패');
// }
// 익명함수에서 실행된 결과의 값이나 상태에 따라 resolve() 함수 또는 reject() 함수를 실행합니다.
// 이 때 문자 또는 다른 형식의 데이터(대부분 문다를 사용)를 resolve와 reject에 전달인수로 전달하여
// 결과가 필요한 곳에서 그 데이터를 꺼내쓰게 합니다.
// 위의 예는 '성공' 또는 '실패'가 전달

// 함수 안에서 반드시 resolve() 또는 reject()가 호출 됩니다.
// if 문이나 선택 실행에 적용하여 둘 중 하나만 실행하여도 되고, 무조건 resolve()나 reject() 하나만 실행하기도 합니다.

const condition = true;

const pm = new Promise((resolve, reject) => {
    if(condition){
        resolve('성공');
    }else{
        reject('실패');
    }
})

// resolve(성공리턴 값) -> then으로 연결
// reject(실패리턴 값) -> catch로 연결
// finally -> 성공과 실패 리턴 값에 상관없이 무조건 실행되는 영역

// then과 함께 실행할 처리 이전에 다른 코드가 작성될 수 있습니다.
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');

// 이제 결과를 이용한 작업을 시작합니다.
// then과 catch와 finally에 익명함수가 전달인수로 전달되어 실행되게 합니다.
// .then((message)=>{})
// 매개변수의 이름은 자유롭게 정할 수 있습니다.
// (message)=>{} : resolve가 호출되어 도착했을 때 실행될 익명함수입니다. message 변수에 '성공' 전달
// (error)=>{} : reject가 호출되어 도착했을 때 실행될 익명함수 입니다. error 변수에 '실패' 전달
pm.then((message)=>{
    console.log(message); // 성공한 경우 실행
}).catch((error)=>{
    console.log(error); // 실패한 경우 실행
}).finally(()=>{ 
    console.log('무조건 실행'); // 성공 실패 중 하나와 함께 반드시 실행
});