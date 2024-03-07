const express = require('express');
const {addQuery,getQuery, getCountry}=require('../Controllers/ContactUsControllers')
const {addFooterData}=require('../Controllers/FooterController')
const {addCaseStudies} = require('../Controllers/CaseStudiesController');
const multer=require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
    },
  
    filename: function(req, file, cb) {
      
        cb(null, file.fieldname + '-' + Date.now() +   path.extname(file.originalname));
    }
  });
  
var upload = multer({ storage: storage ,limits: { fileSize: 2 * 1024 * 1024 } })

// Error handling middleware
function handleMulterErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds the limit (2MB)' });
      }
    }
    next(err);
  }
  

//Contact us routes
router.post('/contactus',addQuery);
router.get('/contactus',getQuery);
router.get('/all-countries',getCountry);
router.post('/add-footer-data',upload.single('image'),addFooterData);
router.post('/case-studies', upload.single('image'), addCaseStudies);
router.use(handleMulterErrors)
module.exports=router