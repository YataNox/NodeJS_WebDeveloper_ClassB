document.getElementById('write-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const subject = e.target.subject.value;
    const text = e.target.text.value;
    const writer = e.target.userid.value;
    
    if(!subject){return alert('제목을 입력하세요.');}
    if(!text){return alert('내용을 입력하세요.');}

    const formData = new FormData();

    formData.append('image', e.target.image.files[0]);
    formData.append('subject', subject);
    formData.append('writer', writer);
    formData.append('text', text);

    try{
        await axios.post('/boards/insertBoard', formData);
        location.href='/boards';
    }catch(err){
        console.error(err);
    }
});