const signupController=require('../Controller/userController');
const loginController=require('../Controller/loginController');
const express=require('express');
const router=express.Router();

router.post('/user/SignUp',signupController.postSignUp);
router.post('/user/login',loginController.postLogin);

module.exports=router;
