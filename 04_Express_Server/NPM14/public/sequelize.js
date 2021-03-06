getUser();
getComment();


async function getCommentOne(id){
    try{
        const res = await axios.get(`/comments/${id}`);
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');

        tbody.innerHTML = ''; //tbody를 비웁니다.

        // map 함수를 이용해서 전달된 객체 내의 데이터 갯수만큼 반복(?)실행을 합니다.
        comments.map(function( comment ){
            
            const row = document.createElement('tr');   // tr 태그 생성

            let td = document.createElement('td');  // td 태그 생성
            td.textContent = comment.id;   // 생성된 태그에 comment의 userid 삽입
            row.appendChild(td);    //tr 안에 td 삽입

            td = document.createElement('td');  
            td.textContent = comment.User.name;
            row.appendChild(td); 

            td = document.createElement('td');  
            td.textContent = comment.comment;
            row.appendChild(td); 

            // 수정버튼
            const edit = document.createElement('button');
            edit.textContent='수정';

            // 수정 버튼에 이벤트 리스너 추가
            edit.addEventListener('click', async ()=>{
                // 게시물 id와 입력받은 내용으로 comment를 수정하시고, 다시 아이디로 검색하여 댓글을 표시해주세요.
                const newComment = prompt('바꿀 내용을 입력하세요.');
                if(!newComment){
                    return alert('내용을 반드시 입력하셔야 합니다.');
                }
                try{
                    await axios.patch(`/comments/${comment.id}`, {comment:newComment});
                    getCommentOne(id);
                }catch(error){
                    console.error(error);
                }
            });

            td = document.createElement('td');  
            td.appendChild(edit);
            row.appendChild(td); 

            // 삭제버튼
            const remove = document.createElement('button');
            remove.textContent='삭제';

            // 삭제 버튼에 이벤트 리스너 추가
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.patch(`/comments/remove/${comment.id}`);
                    getCommentOne(id);
                }catch(error){
                    console.error(error);
                }
            });

            td = document.createElement('td');  
            td.appendChild(remove);
            row.appendChild(td); 
            
            tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        });
    }catch(err){
        
    }

}



async function getUser(){
    // 모든 user를 조회해서 user-list 테이블에 표시합니다.
    try{
        // /user의 get 방식으로 모든 사용자 정보를 조회하고 리턴된 데이터를 res에 저장합니다.
        const res = await axios.get('/users');
        // 결과를 사용하기 위하여 변수를 만들고 데이터를 추출합니다.
        const users = res.data;

        // querySelector : ()의 선택자로 표시된 태그유형중 첫번째 태그를 선택
        // user-list의 tbody
        const tbody = document.querySelector('#user-list tbody');

        tbody.innerHTML = ''; //tbody를 비웁니다.

        // map 함수를 이용해서 전달된 객체 내의 데이터 갯수만큼 반복(?)실행을 합니다.
        // users 변수에 담긴 한사람의 데이터가 user 변수에 하나씩 담기면서 전달되어 익명 function이 실행됩니다.
        users.map(function( user ){
            
            const row = document.createElement('tr');   // tr 태그 생성

            row.addEventListener('click', ()=>{
                getCommentOne(user.id);
            })

            let td = document.createElement('td');  // td 태그 생성
            td.textContent = user.id;   // 생성된 태그에 user의 id 삽입
            row.appendChild(td);    //tr 안에 td 삽입

            td = document.createElement('td');  
            td.textContent = user.name;
            row.appendChild(td); 
            
            td = document.createElement('td');  
            td.textContent = user.age;
            row.appendChild(td); 
            
            td = document.createElement('td');  
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td); 
            
            tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        });
    }catch(err){
        console.error(err);
    }
}


async function getComment(){
    // 모든 user를 조회해서 comment-list 테이블에 표시합니다.
    try{
        const res = await axios.get('/comments');
        const comments = res.data;

        // querySelector : ()의 선택자로 표시된 태그유형중 첫번째 태그를 선택
        // user-list의 tbody
        const tbody = document.querySelector('#comment-list tbody');

        tbody.innerHTML = ''; //tbody를 비웁니다.

        // map 함수를 이용해서 전달된 객체 내의 데이터 갯수만큼 반복(?)실행을 합니다.
        comments.map(function( comment ){
            
            const row = document.createElement('tr');   // tr 태그 생성

            let td = document.createElement('td');  // td 태그 생성
            td.textContent = comment.id;   // 생성된 태그에 comment의 userid 삽입
            row.appendChild(td);    //tr 안에 td 삽입

            td = document.createElement('td');  
            td.textContent = comment.User.name;
            row.appendChild(td); 

            td = document.createElement('td');  
            td.textContent = comment.comment;
            row.appendChild(td); 

            const edit = document.createElement('button');
            edit.textContent='수정';

            // 수정 버튼에 이벤트 리스너 추가
            edit.addEventListener('click', async ()=>{
                const newComment = prompt('바꿀 내용을 입력하세요.');
                if(!newComment){
                    return alert('내용을 반드시 입력하셔야 합니다.');
                }
                try{
                    await axios.patch(`/comments/${comment.id}`, {comment:newComment});
                    getComment();
                }catch(error){
                    console.error(error);
                }
            });

            td = document.createElement('td');  
            td.appendChild(edit);
            row.appendChild(td); 

            const remove = document.createElement('button');
            remove.textContent='삭제';

            // 삭제 버튼에 이벤트 리스너 추가
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.delete(`/comments/${comment.id}`);
                    getComment();
                }catch(error){
                    console.error(error);
                }
            });

            td = document.createElement('td');  
            td.appendChild(remove);
            row.appendChild(td); 
            
            tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        });
    }catch(err){
        console.error(err);
    }
}




// 회원 추가 : 사용자 등록 -user-form이 submit이벤트를 일으키면 실행
document.getElementById("user-form").addEventListener('submit', async (event)=>{
    event.preventDefault(); // submit 중지 : 화면전환 방지
    
    const name = event.target.username.value;
    const age = event.target.age.value;
    const married = event.target.married.checked;

    if(!name) {return alert('이름을 입력하세요');}
    if(!age) {return alert('나이를 입력하세요');}

    try{
        // post 호출 & 해당 라우터 실행 후 현재 자리로 돌아오되, 리턴되어 오는 값은 없습니다.
        await axios.post('/users', {name, age, married});
        // 사용자를 조회해서 user-list 테이블에 표시하는 함수를 실행합니다
        getUser();
    }catch(err){
        console.error(err);
    }

    event.target.username.value = '';
    event.target.age.value = '';
    event.target.married.checked = false;
});

// 댓글 등록
document.getElementById("comment-form").addEventListener('submit', async (event)=>{
    event.preventDefault(); // submit 중지 : 화면전환 방지

    const userid = event.target.userid.value;
    const comment = event.target.comment.value;

    if(!userid) {return alert('id를 입력하세요');}
    if(!comment) {return alert('댓글을 입력하세요');}

    try{
        // post 호출 & 해당 라우터 실행 후 현재 자리로 돌아오되, 리턴되어 오는 값은 없습니다.
        await axios.post('/comments', {userid, comment});
        // 사용자를 조회해서 user-list 테이블에 표시하는 함수를 실행합니다
        getComment();
    }catch(err){
        console.error(err);
    }

    event.target.userid.value = '';
    event.target.comment.value = '';
});