const express = require('express');
const {addQuery,getQuery}=require('../Controllers/ContactUsControllers')
const router = express.Router()

//Contact us routes
router.post('/contactus',addQuery)
router.get('/contactus',getQuery)
module.exports=router