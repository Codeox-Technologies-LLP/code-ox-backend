const express = require('express');
const {addQuery,getQuery, getCountry}=require('../Controllers/ContactUsControllers')
const router = express.Router()

//Contact us routes
router.post('/contactus',addQuery)
router.get('/contactus',getQuery)
router.get('/all-countries',getCountry)
module.exports=router