const express = require('express');
const { addQuery, getQuery, getCountry } = require('../Controllers/ContactUsControllers')
const { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy } = require('../Controllers/CaseStudiesController');
const path = require('path')
const multer = require('multer');

const { addFooterData, getFooterData, updateFooteData, deleteFooter } = require('../Controllers/FooterController');
const { addAdmin, adminLogin } = require('../Controllers/AdminController');
const { authenticate } = require('../Controllers/AuthController')
const { addProjects, getProjects, updateProjects, deleteProjects } = require('../Controllers/ErpController')
const { addHome, getHome, updatedHome, } = require('../Controllers/HomeController');
const { addshowreel, getShowreelItems, updateShowreel, deleteShowreel } = require('../Controllers/ShowreelController');
const { addAbout, getAbout, deleteAbout, updateAbout } = require('../Controllers/AboutController');
const { addService, getServices, updateService, deleteService } = require('../Controllers/ServiceController');
const { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial } = require('../Controllers/TestimonialController');
const { addkeywebsitecollection, getKeywebsitecollection, deleteKeyWebsiteCollection } = require('../Controllers/keywebsitecollection');
const { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose } = require('../Controllers/WhyController');
const { addclient, getClient, updateClient, deleteClient } = require('../Controllers/ClientController');




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
router.post('/case-studies', authenticate, upload.single('image'), addCaseStudies);

router.post('/contactus', addQuery);
router.get('/contactus', authenticate, authenticate, getQuery);
router.get('/all-countries', getCountry);

router.post('/add-footer-data', authenticate, upload.single('image'), addFooterData);
router.get('/get-footer-data', getFooterData);
router.put('/update-footerdata/:id', authenticate, upload.single('image'), updateFooteData);
router.delete('/delete-footer/:id', authenticate, deleteFooter)

router.post('/erp-projects', authenticate, upload.single('image'), addProjects);
router.get('/erp-projects', getProjects);
router.put('/erp-projects/:id', authenticate, upload.single('image'), updateProjects);
router.delete('/erp-projects/:id', authenticate, deleteProjects);

router.post('/create-admin', addAdmin);
router.post('/admin-login', adminLogin);

///home
router.post('/home', upload.single('image'), addHome);
router.get('/home', getHome)
router.put('/home/:id', upload.single('image'), updatedHome);
//showreel
router.post('/showreel', upload.single('image'), addshowreel)
router.get('/showreel', getShowreelItems)
router.put('/showreel/:id', upload.single('image'), updateShowreel);
router.delete('/showreel/:id', deleteShowreel);
//about
router.post('/about', upload.single('image'), addAbout);
router.get('/about', getAbout);
router.put('about/:id', upload.single('image'), updateAbout)
router.delete('/about/:id', deleteAbout)
///servie
router.post('/service', upload.single('image'), addService)
router.get('/service', getServices)
router.put('service/:id', upload.single('image'), updateService)
router.delete('/service/:id', deleteService)
//testimonial
router.post('/testimonial', upload.single('image'), addTestimonial)
router.get('/testimonial', getTestimonial);
router.put('/testimonial/:id', upload.single('image'), updateTestimonial);
router.delete('/testimonial/:id', deleteTestimonial);
//keywebsitecollection
router.post('/keywebsitecollection', upload.single('image'), addkeywebsitecollection)
router.get('/keywebsitecollection', getKeywebsitecollection);
router.put('/keywebsitecollection/:id', upload.single('image'), updateTestimonial);
router.delete('/keywebsitecollection/:id', deleteKeyWebsiteCollection);
//why choose us
router.post('/whychooseus', upload.single('image'), addWhychoose)
router.get('/whychooseus', getWhychoose);
router.put('/whychooseus/:id', upload.single('image'), updateWhychoose);
router.delete('/whychooseus/:id', deleteWhychoose);
/// client
router.post('/client', upload.single('image'), addclient)
router.get('/client', getClient);
router.put('/client/:id', upload.single('image'), updateClient);
router.delete('/client/:id', deleteClient);
router.use(handleMulterErrors)

module.exports = router
