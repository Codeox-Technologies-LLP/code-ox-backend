const casestudyModel = require('../Model/OdooCasestudy')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

// post
const addOdooCaseStudy = async (req, res) => {
    try{
       let imageData = addImage(req);
        if (req.file) {
           imageData = req.file.path;
        } else if (req.files && req.files['image']) {
            imageData =req.files['image'].map(file => file.path)
        } else {
            return res.status(400).json({ message: "Error adding image: No file uploaded"});
        }


        const data = {
            title: req.body.title,
                description: req.body.description,
                image: imageData
           
        }; 
        const newCaseStudy =  new casestudyModel(data);
        const savedData = await newCaseStudy.save();

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "CaseStudy added succesfully",
            data: savedData
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: err.message

        })
    } 
};

/// get
const getOdooCaseStudy = async (req,res) => {
    try{
        const data = await casestudyModel.find({})
        res.status(200).json({ statusCode: 200, message: 'odoo CaseStudy fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateOdooCaseStudy = async (req, res) => {
    try {
      const id = req.params.id;
      let data = {};
  
      // Update data even if value is the same (avoids empty $set)
      if (req.body.title) data['title'] = req.body.title;
      if (req.body.description) data['description'] = req.body.description;
  
      const image = req.file || (req.files && req.files['image']);
      if (image) {
        data['image'] = image.path;
      }
  
      const response = await casestudyModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'odooCaseStudy not found' });
      }
  
      res.status(200).json({ statusCode: 200, success: true, message: 'odooCaseStudy updated successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
  };


  //delete
  const deleteOdooCaseStudy = async (req, res) => {
    try{
        const id = req.params.id;
        const response =await casestudyModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'odooCaseStudy not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'odooCaseStudy deleted succesfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addOdooCaseStudy,getOdooCaseStudy, updateOdooCaseStudy,deleteOdooCaseStudy }