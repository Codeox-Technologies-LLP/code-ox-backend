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
        categories:req.body.categories,
        image: image,

    }
    
      const response= await caseStudiesModel.findOneAndUpdate({}, {
     
      $set: {
        heading: req.body.heading,
        subheading: req.body.subheading,
        description: req.body.description,
      }, $push: { caseStudies: data }
    } ,{ new: true, upsert: true });
  
    return res.status(201).json({statusCode:201, success: true, message: "Case study added successfully" });
  } catch (err) {
    res.status(500).json({statusCode:500, success: false, message: err.message });
  }
};


//get


//update



//delete


module.exports={addCaseStudies}
