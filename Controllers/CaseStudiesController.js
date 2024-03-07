const caseStudiesModel = require('../Model/caseStudies');

//post
const addCaseStudies = async (req, res) => {
  try {
    const image = req.file.path
    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      caseStudiesDescription: req.body.caseStudiesDescription,
      buttonLink: req.body.buttonLink,
      categories: req.body.categories,
      image: image,
    }
    
      const response= await caseStudiesModel.findOneAndUpdate({}, {
     
      $set: {
        heading: req.body.heading,
        subheading: req.body.subheading,
        description: req.body.description,
      }, $push: { caseStudies: data }
    }, { new: true, upsert: true });
    console.log(response)

    return res.status(201).json({ statusCode: 201, success: true, message: "Case study added successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};

//get
const getCaseStudies = async (req, res, next) => {
  try {
    const category = req.query.category ? req.query.category.toLowerCase() : null; 
    let caseStudiesData = await caseStudiesModel.find(); 

    // Filter the data
    if (category) {
      caseStudiesData = caseStudiesData.filter(caseStudy => 
        caseStudy.caseStudies.some(study => study.categories.toLowerCase() === category)
      );
      // Now caseStudiesData only contains projects that have at least one case study matching the category
      // If you want to include only the matching case studies, you can further filter here
      caseStudiesData.forEach(caseStudy => {
        caseStudy.caseStudies = caseStudy.caseStudies.filter(study => study.categories.toLowerCase() === category);
      });
    }

    if (caseStudiesData.length === 0) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'No case studies found for the provided category.' });
    }

    return res.status(200).json({ statusCode: 200, success: true, caseStudies: caseStudiesData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};













//update



//delete


module.exports={addCaseStudies, getCaseStudies}
