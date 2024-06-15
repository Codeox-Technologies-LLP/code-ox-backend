const caseStudiesModel = require('../Model/caseStudies');
const heroCaseStudy = require('../Model/HeroCaseStudy')
const mongoose = require('mongoose');
const bgValidator = require('../middlewares/bg');
const { addImage, updateImage } = require('../middlewares/image');
const HeroCaseStudy = require('../Model/HeroCaseStudy');

//post
const addCaseStudies = async (req, res) => {
  try {
    const { title, subtitle, caseStudiesDescription, link, category, bg, titleTextColor } = req.body;

    const { path: imagePath } = req.file;
    const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;

    const newCaseStudy = new caseStudiesModel({
      image: baseUrl,
      title,
      subtitle,
      caseStudiesDescription,
      link,
      category,
      bg,
      titleTextColor
    });
    await newCaseStudy.save();
    res.status(200).json({ statusCode: 200, message: 'Case study added successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, statusCode: 500, success: false });
  }
};
//get
const getCaseStudies = async (req, res, next) => {
  try {
    const category = req.query.category ? req.query.category.toLowerCase() : null;

    // Fetch only necessary fields to reduce data transfer
    let selectFields = 'title description category'; // Customize fields as needed

    let query = {};
    if (category) {
      query.category = category;
    }

    let caseStudiesData = await caseStudiesModel.find(query)
    if (caseStudiesData.length === 0) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'No case studies found for the provided category.' });
    }

    return res.status(200).json({ statusCode: 200, success: true, caseStudies: caseStudiesData });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, success: false, message: err.message });
  }
};

//update
// const updateCaseStudies = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
//     }
//     const { title, subtitle, caseStudiesDescription, link, categories, bg, titleTextColor } = req.body;
//     const { category } = req.body;
//     const image = updateImage(req)
//     const update = {
//       image: image,
//       category: category,
//       title,
//       subtitle,
//       caseStudiesDescription,
//       link,
//       bg,
//       titleTextColor

//     };

//     const updatedCaseStudies = await caseStudiesModel.findOneAndUpdate(
//       { _id: id },
//       update,
//       { new: true }
//     );

//     if (!updatedCaseStudies) {
//       return res.status(404).json({ statusCode: 404, success: false, message: 'Case Studies not found' });
//     }

//     res.status(200).json({ statusCode: 200, success: true, message: 'Case studies updated successfully', updatedCaseStudies });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
//   }
// };

const updateCaseStudies = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check for valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
    }
    
    const { title, subtitle, caseStudiesDescription, link, bg, titleTextColor, category } = req.body;

    // Create update object
    let updateData = { title, subtitle, caseStudiesDescription, link, bg, titleTextColor, category };

    // Handle file upload
    if (req.file) {
      const image = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g,"/")}`;
      updateData.image = image;
    }

    // Update case study
    const updatedCaseStudies = await caseStudiesModel.findByIdAndUpdate(
      id,
      updateData, // Update data
      {
        new: true,
        runValidators: true
      }
    );

    // Check if case study exists
    if (!updatedCaseStudies) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'Case Studies not found' });
    }

    // Successful update
    res.status(200).json({ statusCode: 200, success: true, message: 'Case studies updated successfully', updatedCaseStudies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
  }
};



//delete
const deleteCaseStudy = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid Id', success: false });
    }
    await caseStudiesModel.findOneAndDelete({ _id: id });
    res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message })
  }
}


// post case-study hero
const addHeroCaseStudy = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    let image;
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
      // image = `${process.env.BACKEND_URL}/images/${req.file.originalname}`;
    } else if (req.body.image) {
      image = req.body.image;
    } else {
      image = 'default_image_url';
    }


    const heroCaseStudy = new HeroCaseStudy({
      image,
      title,
      subtitle,
    })

    await heroCaseStudy.save();
    res.status(200).json({ statusCode: 200, message: 'Case study added successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500, success: false });
  }
}


//get case study hero
const getHeroCaseStudy = async (req, res) => {
  try {
    const caseStudies = await HeroCaseStudy.find();
    res.status(200).json(caseStudies);
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500, success: false });
  }
}


//get single case study hero
const getSingleHeroCaseStudy = async (req, res) => {
  try {
    const caseStudies = await HeroCaseStudy.findById(req.params.id);
    if (caseStudies) {
      res.status(200).json(caseStudies);
    } else {
      res.status(404).json({ message: 'Case study not found', statusCode: 404, success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500, success: false });
  }
}

//edit case study hero 
const editHeroCaseStudy = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const { title, subtitle } = req.body;
    const newCaseStudy = { title, subtitle };

    let image;
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
      newCaseStudy.image = image;
    }

    const caseStudy = await HeroCaseStudy.findByIdAndUpdate(req.params.id, newCaseStudy, {
      new: true,
      runValidators: true
    });

    if (caseStudy) {
      res.status(200).json({
        statusCode: 200,
        message: 'Case study updated successfully',
        success: true,
        caseStudy
      });
    } else {
      res.status(404).json({
        message: 'Case study not found',
        statusCode: 404,
        success: false
      });
    }
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({
      message: error.message,
      statusCode: 500,
      success: false
    });
  }
};

//delete single case study hero
 const deleteSingleHeroCaseStudy = async (req, res) =>  {
  try {
    const response = await heroCaseStudy.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({
      message: error.message,
      statusCode: 500,
      success: false
    });
  }
}


module.exports = { addCaseStudies, getCaseStudies, updateCaseStudies, deleteCaseStudy, addHeroCaseStudy, getHeroCaseStudy, getSingleHeroCaseStudy, editHeroCaseStudy, deleteSingleHeroCaseStudy }
