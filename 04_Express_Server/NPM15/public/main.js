getBoard_list();

// 데이터베이스에서 게시물들을 읽어와서 table의 tr과 td로 삽입하는 함수
async function getBoard_list(){
    try{
        // 게시물을 조회
        const res = await axios.get('/boards/boardList');
        const Board_list = res.data;

        // 테이블의 tbody안을 비웁니다.
        const tbody = document.querySelector('#board-list tbody');
        tbody.innerHTML = '';

        // 조회한 게시물의 갯수만큼 반복해서 테이블을 채웁니다.
        Board_list.map(function(board){
            const row = document.createElement('tr');   // tr 태그 생성

            row.addEventListener('click', ()=>{
                location.href='/boards/boardView/' + board.id;
            });

            let td = document.createElement('td');  // td 태그 생성
            td.textContent = board.id;   // 생성된 태그에 user의 id 삽입
            td.id = 'boardnum';
            row.appendChild(td);    //tr 안에 td 삽입

            td = document.createElement('td');  
            td.textContent = board.subject;
            td.id = 'subject';
            row.appendChild(td); 
            
            td = document.createElement('td');  
            td.textContent = board.writer;
            td.id = 'writer';
            row.appendChild(td); 
            
            td = document.createElement('td');  
            td.textContent = board.readCount;
            td.id = 'readcount';
            row.appendChild(td); 

            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
    
}