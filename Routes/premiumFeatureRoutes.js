const premiumFeatureController=require('../Controller/premiumFeatureController');
const userAuthentication=require('../middleware/auth')
const express=require('express');
const router=express.Router();
router.get('/premium/showLeaderBoard',userAuthentication.authenticate,premiumFeatureController.getUserLeaderboard);

module.exports=router;