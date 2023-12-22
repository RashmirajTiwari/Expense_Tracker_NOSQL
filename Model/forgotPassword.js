
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const forgotPasswordSchema=new Schema({
  
    active:{
        type:Boolean,
    },
    expiresby:{
        type:Date,
    },
  
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
  
})

module.exports=mongoose.model('Forgotpassword',forgotPasswordSchema);




// const Sequelize=require('sequelize')
// const sequelize=require('../util/database')

// const forgotPassword=sequelize.define('forgotpassword',{
//     id:{
//         type:Sequelize.UUID,
//         allowNull:false,
//         primaryKey:true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE

// });
// module.exports=forgotPassword;