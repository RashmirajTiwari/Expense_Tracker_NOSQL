const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../Model/userModel');
const ForgotPassword = require('../Model/forgotPassword');
const Sib=require('sib-api-v3-sdk')
require('dotenv').config();

const forgotPassword= async(req, res, next) => {

    try{

        const {email}=req.body;
        const user = await User.findOne( { email:email });
        console.log(user)

        if(user){
            var id;
            const forgotPassword= new ForgotPassword({active:true,userId:req.user._id});
            forgotPassword.save().then(r=>{
            id=r._id.toString();
            const client =Sib.ApiClient.instance
            const apiKey=client.authentications['api-key']
            apiKey.apiKey='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'
            const tranEmailApi=new Sib.TransactionalEmailsApi()
        
            const sender={
                email:'rashmiraj.tiwari.nit.17@gmail.com'
            }
        
            const receivers=[
                {
                    email:req.body.email
                }
            ]
        
            tranEmailApi.sendTransacEmail({
                sender,
                to:receivers,
                subject:'Reset Password',
                textContent:`<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            
            }).then((response)=>{
                return res.status(200).json({message: 'Link to reset password sent to your mail ', sucess: true})
            }).catch((err)=>{
                console.log(err)
            })
            }).catch();
            
            
        
        }else{
            throw new Error('User Doesn not Exist ')
        }

   

    }catch(err){
        return res.json({ message: err, sucess: false });
    }

    
};
const resetpassword=(req,res)=>{
    const id=req.params.id;
    ForgotPassword.findOne({_id:id}).then(forgotpasswordrequest=>{
        if(forgotpasswordrequest){
            ForgotPassword.updateOne({'_id':id},{'$set':{'active':false}});
        res.status(200).send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>

        <form action="/password/updatepassword/${id}" method="get">
            <label for="newpassword">Enter New Password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
    </html>`)
    
    res.end()
    

        }
    })  

}
const updatepassword=(req,res)=>{

    try{

        const {newpassword}=req.query;
        const {resetpasswordid}=req.params;

        ForgotPassword.findOne({_id:resetpasswordid}).then(resetpasswordrequest=>{
            User.findOne({_id:resetpasswordrequest.userId}).then(user=>{
                if(user){

                    const saltRounds=10;
                    bcrypt.genSalt(saltRounds,function(err,salt){
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }

                        bcrypt.hash(newpassword,salt,function(err,hash){
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            User.updateOne({'_id':resetpasswordrequest.userId},{'$set':{'password':hash}}).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        })
                    });

                }else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
            })
        })

    }catch(error){
        
        return res.status(403).json({ error, success: false } )

    }
}
module.exports={
    forgotPassword,resetpassword,updatepassword
}