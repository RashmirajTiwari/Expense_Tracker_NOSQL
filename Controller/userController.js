const User=require('../Model/userModel')
const bcrypt=require('bcrypt');
exports.postSignUp=(req,res,next)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const saltRound=10;

    bcrypt.hash(password,saltRound,async(err,hash)=>{
      if(err){
        console.log(err);
      }

      const user = await User.findOne({email:email});
      console.log(user);
      if(user){
        res.status(501).json({message:"Email Already Exist!!!"});
      }else{
        const user=new User({name:name,email:email, password:hash,});
       user.save().then(result=>{
        console.log(result);
          //res.status(200).json({result:result});
        }).catch(err=>{
          res.status(504).json({message:"Something went Wrong"});
        })
      }
      
     

    })
    

}