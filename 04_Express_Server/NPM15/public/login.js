document.getElementById('login-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;

    if(!userid){
        return alert('아이디를 입력하세요.');
    }
    if(!pwd){
        return alert('비밀번호를 입력하세요.');
    }

    // userid, pwd를 login라우터에 전송해서 일단 아이디로 조회한 회원의 정보를 res.json 등으로 돌려받습니다.
    try{
        const res =  await axios.post('members/login', {userid, pwd});
        const mem = res.data;

        let m = document.getElementById('msg');
        if(mem == null){
            m.innerHTML = '아이디가 없습니다.';
        }else if(mem.pwd != pwd){
            m.innerHTML = '비밀번호를 확인하세요.';
        }else if(mem.pwd == pwd){
            location.href='/boards';
        }else{
            m.innerHTML = '알 수 없는 이유로 로그인이 안돼요';
        }
    }catch(err){
        console.error(err);
    }

    e.target.pwd.value='';
});