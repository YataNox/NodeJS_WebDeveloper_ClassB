// 작성일시란에 현재 시간 나오게 코딩해주세요.
// getReplys 함수를 통해 화면에 댓글들이 표시되게 해주세요.

async function getReplys(boardnum, replyWriter){
    try{
        const res = await axios.get(`/replys/replyList/${boardnum}`);
        const replys = res.data;
        console.log('111111111111111111111111111');
        // querySelector : ()의 선택자로 표시된 태그유형중 첫번째 태그를 선택
        // user-list의 tbody
        const tbody = document.querySelector('#reply-list tbody');

        tbody.innerHTML = ''; //tbody를 비웁니다.

        // map 함수를 이용해서 전달된 객체 내의 데이터 갯수만큼 반복(?)실행을 합니다.
        replys.map(function( reply ){
            
            const row = document.createElement('tr');   // tr 태그 생성

            let td = document.createElement('td');  // td 태그 생성
            td.textContent = reply.created_at;   // 생성된 태그에 comment의 userid 삽입
            row.appendChild(td);    //tr 안에 td 삽입

            td = document.createElement('td');  
            td.textContent = reply.writer;
            row.appendChild(td); 

            td = document.createElement('td');  
            td.textContent = reply.content;
            row.appendChild(td); 

            const remove = document.createElement('input');
            remove.setAttribute('type', 'button');
            remove.value='삭제';

            // 삭제 버튼에 이벤트 리스너 추가
            remove.addEventListener('click', async ()=>{
                try{
                    await axios.delete(`/replys/deleteReply/${reply.id}`);
                    getReplys(reply.boardnum, replyWriter);
                }catch(error){
                    console.error(error);
                }
            });

            td = document.createElement('td');
            td.id = 'remove';
            if(reply.writer == replyWriter){
                td.appendChild(remove);
            }else{
                td.innerHTML = '&nbsp;';
            } 
            
            row.appendChild(td); 
            
            tbody.appendChild(row); // 완성된 tr을 tbody에 추가
        });
    }catch(err){
        console.error(err);
    }
}

document.getElementById('reply-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const writer = e.target.writer.value;
    const boardnum = e.target.boardnum.value;
    const reply = e.target.reply.value;

    if(!reply) {return alert('댓글 내용을 입력하세요.');}

    try{
        await axios.post('/replys/addReply', {writer, boardnum, reply});
        getReplys(boardnum, writer);
    }catch(err){
        console.error(err);
    }
    e.target.reply.value="";
});