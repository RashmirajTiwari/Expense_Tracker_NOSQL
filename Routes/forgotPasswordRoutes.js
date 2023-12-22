const forgotPasswordController=require('../Controller/forgotPassword');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();
router.post('/password/forgotPassword',userAuthentication.authenticate,forgotPasswordController.forgotPassword);
router.get('/password/resetpassword/:id',forgotPasswordController.resetpassword);
router.get('/password/updatepassword/:resetpasswordid',forgotPasswordController.updatepassword);

module.exports=router;