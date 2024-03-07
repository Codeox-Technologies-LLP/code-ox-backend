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
const updateCaseStudies = async (req, res) => {
  try {
    const id = req.params.id; // Assuming you are passing the ID in the request parameters
    
    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      caseStudiesDescription: req.body.caseStudiesDescription,
      buttonLink: req.body.buttonLink,
      categories: req.body.categories,
      image: req.file ? req.file.path : null, // Check if file exists
    };

    const response = await caseStudiesModel.findByIdAndUpdate(id, {
      $push: { caseStudies: data },
    }, { new: true });
    console.log(response);

    return res.status(200).json({ statusCode: 200, success: true, message: "Case study updated successfully", data: response });
  } catch (err) {
    res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};


//delete


const deleteCaseStudy = async (req, res) => {
  try {
    const caseStudyId = req.params.id; // Assuming you are passing the case study ID in the URL

    // Find and delete the case study
    const response = await caseStudiesModel.findOneAndUpdate(
      {},
      { $pull: { caseStudies: { _id: caseStudyId } } },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ statusCode: 404, success: false, message: "Case study not found" });
    }

    return res.status(200).json({ statusCode: 200, success: true, message: "Case study deleted successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};

// Define your delete route




module.exports={addCaseStudies, getCaseStudies,updateCaseStudies,deleteCaseStudy}
