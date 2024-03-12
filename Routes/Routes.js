const express = require('express');
const { addQuery, getQuery, getCountry } = require('../Controllers/ContactUsControllers')
const { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy } = require('../Controllers/CaseStudiesController');
const path = require('path')
const multer = require('multer');
const { addFooterData, getFooterData, updateFooteData, deleteFooter } = require('../Controllers/FooterController');
const { addAdmin, adminLogin } = require('../Controllers/AdminController');
const { authenticate } = require('../Controllers/AuthController')
const { addHome, getHome, updateHome, updatedHome, } = require('../Controllers/HomeController')



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
router.put('/case-studies/:caseStudyId', authenticate, upload.single('image'), updateCaseStudies);
router.delete('/case-studies/:id', authenticate, deleteCaseStudy);
router.post('/contactus', authenticate, addQuery);
router.get('/contactus', authenticate, authenticate, getQuery);
router.get('/all-countries', getCountry);
router.post('/add-footer-data', authenticate, upload.single('image'), addFooterData);
router.post('/case-studies', authenticate, upload.single('image'), addCaseStudies);
router.get('/get-footer-data', authenticate, getFooterData);
router.put('/update-footerdata/:id', authenticate, upload.single('image'), updateFooteData);
router.delete('/delete-footer/:id', authenticate, deleteFooter)
router.post('/create-admin', addAdmin);
router.post('/admin-login', adminLogin)
///home
router.post('/home', upload.single('image'), addHome);
router.get('/home', getHome)

router.put('/home/:id', upload.single('image'), updatedHome);




router.use(handleMulterErrors)

module.exports = router