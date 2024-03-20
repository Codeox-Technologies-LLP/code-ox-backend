const express = require('express');
const { addQuery, getQuery, getCountry } = require('../Controllers/ContactUsControllers')
const { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy } = require('../Controllers/CaseStudiesController');
const path = require('path')
const multer = require('multer');

const { addFooterData, getFooterData, updateFooteData, deleteFooter } = require('../Controllers/FooterController');
const { addAdmin, adminLogin } = require('../Controllers/AdminController');
const { authenticate } = require('../Controllers/AuthController')
const { addProjects, getProjects, updateProjects, deleteProjects } = require('../Controllers/ErpController')

const { addshowreel, getShowreelItems, updateShowreel, deleteShowreel } = require('../Controllers/ShowreelController');
const { addAbout, getAbout, deleteAbout, updateAbout } = require('../Controllers/AboutController');
const { addService, getServices, updateService, deleteService } = require('../Controllers/ServiceController');
const { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial } = require('../Controllers/TestimonialController');
const { addkeywebsitecollection, getKeywebsitecollection, deleteKeyWebsiteCollection } = require('../Controllers/keywebsitecollection');
const { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose } = require('../Controllers/WhyController');
const { addclient, getClient, updateClient, deleteClient } = require('../Controllers/ClientController');
const { addValue, getValue, updateValue, deleteValue } = require('../Controllers/OurvalueController');
const { addFounder, getFounder, updateFounder, deleteFounder } = require('../Controllers/FounderController');
const { addTeam, getTeam, updateTeam, deleteTeam } = require('../Controllers/TeamController');
const { addHome, getHome, deleteHome } = require('../Controllers/HomeController');





const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage})


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
router.put('/case-studies/:id', authenticate, upload.single('image'), updateCaseStudies);
router.delete('/case-studies/:id', authenticate, deleteCaseStudy);
router.post('/case-studies', authenticate, upload.single('image'), addCaseStudies);

router.post('/contactus', addQuery);
router.get('/contactus', authenticate, getQuery);
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
router.put('/home', upload.single('image'), addHome)
router.get('/home', getHome)
router.delete('/home/:id', deleteHome);
//showreel
router.post('/showreel', authenticate,  upload.array('image'), addshowreel)
router.get('/showreel', getShowreelItems)
router.put('/showreel/:id', authenticate,  upload.array('image'), updateShowreel);
router.delete('/showreel/:id', authenticate, deleteShowreel);
//about
router.post('/about', authenticate, upload.single('image'), addAbout);
router.get('/about', getAbout);
router.put('about/:id', authenticate, upload.single('image'), updateAbout)
router.delete('/about/:id', authenticate, deleteAbout)
///servie
router.post('/service', authenticate, upload.single('image'), addService)
router.get('/service', getServices)
router.put('service/:id', authenticate, upload.single('image'), updateService)
router.delete('/service/:id', authenticate, deleteService)
//testimonial
router.post('/testimonial', authenticate, upload.single('image'), addTestimonial)
router.get('/testimonial', getTestimonial);
router.put('/testimonial/:id', authenticate, upload.single('image'), updateTestimonial);
router.delete('/testimonial/:id', authenticate, deleteTestimonial);
//keywebsitecollection
router.post('/keywebsitecollection', authenticate, upload.single('image'), addkeywebsitecollection)
router.get('/keywebsitecollection', getKeywebsitecollection);
router.put('/keywebsitecollection/:id', authenticate, upload.single('image'), updateTestimonial);
router.delete('/keywebsitecollection/:id', authenticate, deleteKeyWebsiteCollection);
//why choose us
router.post('/whychooseus', authenticate, upload.single('image'), addWhychoose)
router.get('/whychooseus', getWhychoose);
router.put('/whychooseus/:id', authenticate, upload.single('image'), updateWhychoose);
router.delete('/whychooseus/:id', authenticate, deleteWhychoose);
/// client
router.post('/client', authenticate, upload.single('image'), addclient)
router.get('/client', getClient);
router.put('/client/:id', authenticate, upload.single('image'), updateClient);
router.delete('/client/:id', authenticate, deleteClient);

//about-us-page
/// our value
router.post('/value', authenticate, upload.single('gif'), addValue)
router.get('/value', getValue);
router.put('/value/:id', authenticate, upload.single('gif'), updateValue);
router.delete('/value/:id', authenticate, deleteValue);
//founder
router.post('/founder', authenticate, upload.single('image'), addFounder)
router.get('/founder', getFounder);
router.put('/founder/:id', authenticate, upload.single('image'), updateFounder);
router.delete('/founder/:id', authenticate, deleteFounder);
// team 
router.post('/team', authenticate, upload.single('image'), addTeam)
router.get('/team', getTeam);
router.put('/team/:id', authenticate, upload.single('image'), updateTeam);
router.delete('/team/:id', authenticate, deleteTeam);
//project counter
router.post('/project', authenticate, addProjects)
router.get('/team', getTeam);
router.put('/team/:id', authenticate, upload.single('image'), updateTeam);
router.delete('/team/:id', authenticate, deleteTeam);
router.use(handleMulterErrors)
//marquee



module.exports = router
