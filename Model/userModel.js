const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
      type:String,
      required:true
    },
    ispremiumuser:{
      type:Boolean
    },
    totalExpenses:{
              type:Number,
              default:0,
      }
  
})

module.exports=mongoose.model('User',userSchema);

// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const user=sequelize.define('user',{
//     id:{
//       type:Sequelize.INTEGER,
//       autoIncrement:true,
//       allowNull:false,
//       primaryKey:true
//     },
//     name:Sequelize.STRING,
//     email:{
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false,
//     },
//     password:Sequelize.STRING,
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalExpenses:{
//         type:Sequelize.INTEGER,
//         defaultValue:0,
//     }
   
//   })
