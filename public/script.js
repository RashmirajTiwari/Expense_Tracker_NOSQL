
//Sign Up
var submit = document.getElementById("submitBtn");
if(submit!=null){
    submit.addEventListener("click", async (e) => {
  
        
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            if(name.value=="" || email.value==""|| password.value==""){
                
                alert("Please fill the fields");
            
            }else{
                let SignUp= {
                    name:name.value,
                    email:email.value,
                    password:password.value
                   }
                  
                
                await axios.post("http://localhost:3000/user/SignUp",SignUp).then(res=>{
                    
                if(res.status===200){
                    
                    window.location.href="../views/login.html"
                    //message.innerHTML=`<h5 style="text-align: center;color:green">${res.data.message}</h5>`
                }
    
            }).catch(err=>{
                
                const data=err.response.data.message;;

                if(err.response.status===501){
                    error.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                }else (
                    error.innerHTML=`<h5 style="text-align: center;color:red">Something went Wrong</h5>`
                )
              
                
                
            })
           
            
            name.value="";
            email.value="";
            password.value="";

        }
               
    
            
            
        
       
    
    })
}

//login
var login = document.getElementById("loginBtn");
if(login!=null){
    login.addEventListener("click", async (e) => {
  
            var message=document.getElementById('message');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            if(email.value==""|| password.value==""){
                
                alert("Please fill the fields");
            
            }else{
                let login= {
                    email:email.value,
                    password:password.value
                   }
                  
                 await axios.post("http://localhost:3000/user/login",login).then(res=>{
                    
                    if(res.status===200){
                        alert(res.data.message);
                        localStorage.setItem('token',res.data.token)
                        window.location.href="../views/expense.html"
                        //message.innerHTML=`<h5 style="text-align: center;color:green">${res.data.message}</h5>`
                    }
        
                }).catch(err=>{
                    
                    const data=err.response.data.message;
                    if(err.response.status===401){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    if(err.response.status===404){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    if(err.response.status===500){
                        message.innerHTML=`<h5 style="text-align: center;color:red">${data}</h5>`
                    }
                    
                })
               
                email.value="";
                password.value="";
    
            }
            
    
    })
}


