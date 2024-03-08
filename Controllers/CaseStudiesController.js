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
    const caseStudyId = req.body.caseStudyId;
    const id = req.params.id;

    // Validate the request body to ensure all required fields are present
    if (!caseStudyId || !id || !req.body.title || !req.body.subtitle || !req.body.caseStudiesDescription || !req.body.buttonLink || !req.body.categories) {
      console.log("Missing required fields in the request body.");
      return res.status(400).json({ statusCode: 400, success: false, message: "Missing required fields in the request body" });
    }

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const data = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      caseStudiesDescription: req.body.caseStudiesDescription,
      buttonLink: req.body.buttonLink,
      categories: req.body.categories,
      image: req.file ? req.file.path : null,
    };

    console.log("Data:", data);

    // Perform the update operation
    const updatedCaseStudy = await caseStudiesModel.findOneAndUpdate(
      { "_id": id, "caseStudies._id": caseStudyId }, // Filter for the specific case study using both main document ID and case study ID
      {
        "$set": {
          "caseStudies.$[elem].title": data.title,
          "caseStudies.$[elem].subtitle": data.subtitle,
          "caseStudies.$[elem].caseStudiesDescription": data.caseStudiesDescription,
          "caseStudies.$[elem].buttonLink": data.buttonLink,
          "caseStudies.$[elem].categories": data.categories,
          "caseStudies.$[elem].image": data.image
        }
      },
      { 
        new: true, // Return the updated document
        arrayFilters: [{ "elem._id": caseStudyId }] // Filter to update the array element with matching ID
      }
    );

    // Check if the updatedCaseStudy is null, indicating no matching document was found
    if (!updatedCaseStudy) {
      console.log("Failed to update case study: Case study not found.");
      return res.status(404).json({ statusCode: 404, success: false, message: "Case study not found" });
    }

    console.log("Case study updated successfully.");

    // If the updatedCaseStudy is not null, it means the update was successful
    return res.status(200).json({ statusCode: 200, success: true, message: "Case study updated successfully", data: updatedCaseStudy });
  } catch (err) {
    // Handle any errors that occur during the update operation
    console.error("Error:", err);
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
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
