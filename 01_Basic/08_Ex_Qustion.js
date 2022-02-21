// 숫자 하나를 변수 k에 저장하고, 짝수이면 '짝수입니다', 홀수이면 '홀수입니다.'라는 텍스트를 결과로 전달하는 프라미스를 만들고, 결과를 출력하세요.

const pm = new Promise((resolve, reject)=>{
    const Rn = Math.floor(Math.random() * 100) + 1;
    if(Rn % 2 === 0){
        resolve();
    }else{
        reject();
    }
});

pm.then(()=>{
    console.log("짝수입니다.");
}).catch(()=>{
    console.log("홀수입니다.");
});