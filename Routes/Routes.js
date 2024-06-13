const express = require('express');
const { addQuery, getQuery, getCountry } = require('../Controllers/ContactUsControllers')
const { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy } = require('../Controllers/CaseStudiesController');
const { upload } = require('../middlewares/multer');


const { addFooterData, getFooterData, updateFooteData, deleteFooter } = require('../Controllers/FooterController');
const { addAdmin, adminLogin } = require('../Controllers/AdminController');
const { authenticate } = require('../Controllers/AuthController')
const { addProjects, getProjects, updateProjects, deleteProjects } = require('../Controllers/ErpController')
const { addshowreel, getShowreel, updatedShowreel, deleteShowreel } = require('../Controllers/ShowreelController');
const { addAbout, getAbout, deleteAbout, updateAbout } = require('../Controllers/AboutController');
const { addService, getServices, updateService, deleteService } = require('../Controllers/ServiceController');
const { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial } = require('../Controllers/TestimonialController');
const { deleteKeyWebsiteCollection, addKeyWebsiteCollection, updateKeyWebsiteCollection, getKeyWebsiteCollection } = require('../Controllers/keywebsitecollection');
const { addWhychoose, getWhychoose, updateWhychoose, deleteWhychoose } = require('../Controllers/WhyController');
const { addclient, getClient, updateClient, deleteClient } = require('../Controllers/ClientController');
const { addValue, getValue, updateValue, deleteValue } = require('../Controllers/OurvalueController');
const { addFounder, getFounder, updateFounder, deleteFounder } = require('../Controllers/FounderController');
const { addTeam, getTeam, updateTeam, deleteTeam } = require('../Controllers/TeamController');
const { addHome, getHome, deleteHome } = require('../Controllers/HomeController');
const { addSeo, getSeo, updateSeo, deleteSeo } = require('../Controllers/SeoController');
const {
    addAboutcodeox,
    getAboutcodeox,
    updateAboutcodeox,
    deleteAboutcodeox
} = require('../Controllers/AboutCodeoxController');
const { addOdooaboutus, getOdooaboutus, deleteOdooaboutus, updateOdooAboutus } = require('../Controllers/OdooAboutusController');
const { addOdoohero, getOdoohero, updateOdooHero, deleteOdoohero } = require('../Controllers/OdooHeroController');
const { addSolution, getSolution, updateSolution, deleteSolution } = require('../Controllers/OdooSolution');
const { addOdooCaseStudy, getOdooCaseStudy, deleteOdooCaseStudy, updateOdooCaseStudy } = require('../Controllers/OdooCaseStudyController');

const router = express.Router();








//caseStudies
// router.get('/case-studies', getCaseStudies);
// router.put('/case-studies/:id', authenticate, upload.single('image'), updateCaseStudies);
// router.delete('/case-studies/:id', authenticate, deleteCaseStudy);
// router.post('/case-studies', authenticate, upload.single('image'), addCaseStudies);
//contactus
router.post('/contactus', addQuery);
router.get('/contactus', authenticate, getQuery);
router.get('/all-countries', getCountry);
//footer data
router.post('/add-footer-data', authenticate, upload.single('image'), addFooterData);
router.get('/get-footer-data', getFooterData);
router.put('/update-footerdata/:id', authenticate, upload.single('image'), updateFooteData);
router.delete('/delete-footer/:id', authenticate, deleteFooter)
//erp-project
router.post('/erp-projects', authenticate, upload.single('image'), addProjects);
router.get('/erp-projects', getProjects);
router.put('/erp-projects/:id', authenticate, upload.single('image'), updateProjects);
router.delete('/erp-projects/:id', authenticate, deleteProjects);
//adminLogin
router.post('/create-admin', addAdmin);
router.post('/admin-login', adminLogin);
///home
router.put('/home', upload.single('image'), addHome)
router.get('/home', getHome)
router.delete('/home/:id', deleteHome);
//showreel
router.post('/showreel', upload.array('image'), addshowreel);
router.get('/showreel', getShowreel)
router.put('/showreel/:id', upload.single('image'), updatedShowreel);
router.delete('/showreel/:id', authenticate, deleteShowreel);

/// Erp Casestudy
router.post('/odooCasestudy', authenticate, upload.single('image'), addOdooCaseStudy);
router.get('/odooCasestudy', getOdooCaseStudy)
router.put('/odooCasestudy/:id', authenticate, upload.single('image'), updateOdooCaseStudy);
router.delete('/odooCasestudy/:id', authenticate, deleteOdooCaseStudy)

//about
router.post('/about', authenticate, upload.single('image'), addAbout);
router.get('/about', getAbout);
router.put('/about/:id', authenticate, upload.single('image'), updateAbout);
router.delete('/about/:id', authenticate, deleteAbout)
///servie
router.post('/service', authenticate, upload.single('image'), addService)
router.get('/service', getServices)
router.put('/service/:id', authenticate, upload.single('image'), updateService)
router.delete('/service/:id', authenticate, deleteService)
//testimonial
router.post('/testimonial', authenticate, upload.single('image'), addTestimonial)
router.get('/testimonial', getTestimonial);
router.put('/testimonial/:id', authenticate, upload.single('image'), updateTestimonial);
router.delete('/testimonial/:id', authenticate, deleteTestimonial);
//keywebsitecollection
router.post('/keywebsitecollection', authenticate, upload.single('image'), addKeyWebsiteCollection);
router.get('/keywebsitecollection', getKeyWebsiteCollection);
router.put('/keywebsitecollection/:id', authenticate, upload.single('image'), updateKeyWebsiteCollection);
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

//seo
router.post('/seo', authenticate, addSeo);
router.get('/seo', authenticate, getSeo);
router.put('/seo/:id', authenticate, updateSeo);
router.delete('/seo/:id', authenticate, deleteSeo);

//aboutcodeox
router.post('/aboutcodeox', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cardImage', maxCount: 10 }]), addAboutcodeox);
router.get('/aboutcodeox', getAboutcodeox);
router.put('/aboutcodeox/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cardImage', maxCount: 10 }]), updateAboutcodeox);
router.delete('/aboutcodeox/:id', deleteAboutcodeox);

//odooaboutus
router.post('/odooaboutus',  authenticate, upload.single('image'), addOdooaboutus)
router.get('/odooaboutus', getOdooaboutus);
router.put('/odooaboutus/:id', updateOdooAboutus);
router.delete('/odooaboutus/:id', deleteOdooaboutus);

//odoohero
router.post('/odoohero', authenticate, upload.single('backgroundImage'), addOdoohero)
router.get('/odoohero', getOdoohero);
router.put('/odoohero/:id', upload.single('backgroundImage'), updateOdooHero);
router.delete('/odoohero/:id', deleteOdoohero)

//solution
router.post('/solution', authenticate, upload.single('image'), addSolution)
router.get('/solution', getSolution);
router.put('/solution/:id',upload.single('image'), updateSolution);
router.delete('/solution/:id', deleteSolution);




module.exports = router
