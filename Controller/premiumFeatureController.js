const User=require('../Model/userModel');


const getUserLeaderboard = async(req,res,next)=>{

    try{
         const leaderBoard=await User.find().sort({totalExpenses:'desc'});
       
         res.status(200).json(leaderBoard);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
module.exports={
    getUserLeaderboard
}