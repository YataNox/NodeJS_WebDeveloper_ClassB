getUser();

async function getUser(){
    // 모든 user를 조회해서 user-list 테이블에 표시합니다.

    // /users의 get방식으로 모든 사용자 정보를 조회하고 리턴된 데이터를 res에 저장합니다.
    const res = await axios.get('/users');
    // 결과를 사용하기 위하여 변수 만들고 데이터를 추출합니다.
    const users = res.data;

    // querySelector : ()의 선택자로 표시된 태그 유형 중 첫 번째 태그를 선택
    // user-list의 tbody
    const tbody = document.querySelector('#user-list tbody');

    tbody.innerHTML = ''; // tbody를 비웁니다.

    // map함수를 이용해서 전달된 객체내의 데이터 갯수 만큼 반복 실행을 합니다.
    // users 변수에 담긴 한 사람의 데이터가 user 변수에 하나씩 담기면서 전달되 익명 function이 실행됩니다.
    try{
        users.map(function(user){
            // tr 태그 생성
            const row = document.createElement('tr');

            // td 태그 생성
            td = document.createElement('td');
            td.textContent = user.id;// 생성된 태그에 user의 id 삽입
            row.appendChild(td); // tr안에 td삽입

            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.married? '기혼' : '미혼';
            row.appendChild(td);

            tbody.appendChild(row); // 완성된 tr을 tbody에 삽입 
        });
    }catch(err){
        console.error(err);
    }
}

// 회원 추가 : 사용자 등록 - user-form이 submit이벤트를 일으키면 실행
document.getElementById('user-form').addEventListener('submit', async (e)=>{
    e.preventDefault(); //submit 중지 : 화면전환 방지

    // 이름, 나이, 결혼여부를 변수에 저장
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;

    console.log(name, age, married);
    if(!name){return alert('이름을 입력하세요.');}
    if(!age){return alert('나이를 입력하세요.');}

    try{
        //post 호출 & 해당 라우터 실행 후 현재 자리로 돌아오되, 리턴되어 오는 값은 없습니다.
        await axios.post('/users', {name, age, married});
        // 사용자를 조회해서 user-list 테이블에 표시하는 함수를 실행합니다.
        getUser();
    }catch(err){
        console.error(err);
    }

    // 사용자 추가-사용자정보 표시 등의 동작을 마치고, 사용자 추가 폼의 입력란들은 다음 사용자 추가 위해 다 비워줍니다
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});