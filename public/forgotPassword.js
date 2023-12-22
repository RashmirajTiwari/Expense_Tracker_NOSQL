
const submit= document.getElementById('submit');
var email = document.getElementById('email');
    submit.addEventListener("click", async () => {
        if(email.value==""){
                
            alert("Please fill the field");
        
        }else{
            let forgotPassword= {
                email:email.value
               }
        
               const token=localStorage.getItem('token');
            await axios.post("http://localhost:3000/password/forgotPassword",forgotPassword,{headers:{"Authorization":token}}).
            then((res)=>{
                var message=document.getElementById('message');
                const data=res.data.message;
                if(res.status===200){
                    message.innerHTML=`<h5 style="text-align: center;color:green">${data}</h5>`
                }
            }).
            catch(err=>{
                console.log(err);
            })
        } 
        email.value="";
})

