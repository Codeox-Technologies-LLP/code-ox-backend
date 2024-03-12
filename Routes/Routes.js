const express = require('express');
const { addQuery, getQuery, getCountry } = require('../Controllers/ContactUsControllers')
const { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy } = require('../Controllers/CaseStudiesController');
const path = require('path')
const multer = require('multer');
const {addFooterData,getFooterData,updateFooteData,deleteFooter}=require('../Controllers/FooterController');
const {addAdmin,adminLogin}=require('../Controllers/AdminController');
const {authenticate}=require('../Controllers/AuthController')
const {addProjects, getProjects,updateProjects,deleteProjects}=require('../Controllers/ErpController')


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },

  filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } })


// Error handling middleware
function handleMulterErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds the limit (2MB)' });
    }
  }
  next(err);
}
 


router.get('/case-studies', getCaseStudies);
router.put('/case-studies/:caseStudyId',authenticate,upload.single('image'), updateCaseStudies);
router.delete('/case-studies/:id',authenticate,deleteCaseStudy);
router.post('/case-studies', authenticate,upload.single('image'), addCaseStudies);

router.post('/contactus',authenticate,addQuery);
router.get('/contactus',authenticate,authenticate,getQuery);
router.get('/all-countries',getCountry);

router.post('/add-footer-data',authenticate,upload.single('image'),addFooterData);
router.get('/get-footer-data', getFooterData);
router.put('/update-footerdata/:id',authenticate, upload.single('image'),updateFooteData);
router.delete('/delete-footer/:id',authenticate,deleteFooter)

router.post('/erp-projects',authenticate,upload.single('image'),addProjects);
router.get('/erp-projects',getProjects);
router.put('/erp-projects/:id',authenticate,upload.single('image'),updateProjects);
router.delete('/erp-projects/:id',authenticate,deleteProjects);

router.post('/create-admin',addAdmin);
router.post('/admin-login',adminLogin);

router.use(handleMulterErrors)
module.exports = router