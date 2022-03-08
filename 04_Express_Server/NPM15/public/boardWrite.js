document.getElementById('write-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const writer = e.target.userid.value;
    
    if(!subject){return alert('제목을 입력하세요.');}
    if(!text){return alert('내용을 입력하세요.');}

    try{
        await axios.post('/boards/insertBoard', {subject, writer, text});
        location.href='/boards';
    }catch(err){
        console.error(err);
    }
});