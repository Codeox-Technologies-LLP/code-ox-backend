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


 const getCaseStudies = async (req, res,next) => {
  try {
    const categories = req.params.id;
    const caseStudiesData = await caseStudiesModel.find(categories);
    if(!caseStudiesData){
      next(new ErrorHandler('casestudies not',400))
      return res

    }
    return res.status(200).json({ statusCode: 200, success: true, caseStudies: caseStudiesData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};












//update



//delete


module.exports={addCaseStudies, getCaseStudies}
