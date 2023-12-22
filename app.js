const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors = require('cors');
const path=require('path');
const fs=require('fs');
require('dotenv').config();
const mongooose=require('mongoose');



 const userRoutes=require('./Routes/userRoutes');
 const expenseRoutes=require('./Routes/expenseRoutes');
const purchaseRoutes=require('./Routes/purchaseRoutes');
const premiumFeatureRoutes=require('./Routes/premiumFeatureRoutes');
const forgotPasswordRoutes=require('./Routes/forgotPasswordRoutes');

const morgan=require('morgan');


const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})




app.use(morgan('combined',{stream:accessLogStream}));
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumFeatureRoutes);
 app.use(forgotPasswordRoutes);


app.use(bodyParser.urlencoded({ extended: true }));

mongooose.connect('mongodb+srv://rajneeshkt17:BWwoMVmUaAsyGsQP@expense.zm58qvo.mongodb.net/expense?retryWrites=true&w=majority').
then(result=>{
    console.log('connected');
    app.listen(process.env.PORT);

}).catch(err=>{
    console.log(err);
})
