const purchaseController=require('../Controller/purchaseController');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();

router.get('/purchase/premiummembership',userAuthentication.authenticate,purchaseController.purchasepremimum);
router.post('/purchase/updatetranactionstatus',userAuthentication.authenticate,purchaseController.updatetranactionstatus);
module.exports=router;