const Razorpay=require('razorpay');
const User=require('../Model/userModel');
const Order=require('../Model/orders');
const loginController=require('../Controller/loginController');
require('dotenv').config();
const jwt=require('jsonwebtoken');

function generateAccessToken(id,ispremiumuser){
    return jwt.sign({userId:id,ispremiumuser},'secretkey');
}

const purchasepremimum=async (req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_VdZX0spjFCXDwI',
            key_secret:'lw8SGINIGYIs0UYmN1OljWyw'
        })
        const amount=2500;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            console.log(order)
            if(err){
                
                throw new Error(err);
            }
            
            const orders=new Order({orderid:order.id,status:'PENDING',userId:req.user._id})
            orders.save().then(()=>{
               
                return res.status(201).json({order,key_id:rzp.key_id});
            
            }).catch(err=>{
                
                throw new Error(err);
            })
        
        });
    
    }catch(err){
        
        console.log(err);
        res.status(403).json({message:'something went wrong',error:err});

    }
}

const updatetranactionstatus= async(req,res)=>{
    try{
        const userId=req.user._id;
        const {payment_id,order_id}=req.body;
       const promise1= User.updateOne({'_id':userId},{'$set':{'ispremiumuser':true}});
        const promise2=Order.updateOne({'orderid':order_id},{'$set':{paymentid:payment_id,status:'SUCCESSFUL'}});
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:"Tranasaction Successful",token:generateAccessToken(userId,true)});
        }).catch(err=>{
            throw new Error(err);
        })
                    
 }catch(err){
        console.log(err);
    }
}

module.exports={
    purchasepremimum,updatetranactionstatus
}