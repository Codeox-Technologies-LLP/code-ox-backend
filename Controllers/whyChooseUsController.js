const WhyChooseUsModel = require('../Model/OdooWhyChooseUs')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

//post

const addwhyChooseUs = async (req, res) => {
    try{
        const imagePath = req.file ? req.file.path : null;
      
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;




        const data = {
                heading: req.body.heading,
                description: req.body.description,
                image: baseUrl
           
        }; 
        const newWhyChooseUs =  new WhyChooseUsModel(data);
        const savedWhyChooseUs = await newWhyChooseUs.save();

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "whychoosesUs added succesfully",
            data: savedWhyChooseUs
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: err.message

        })
    } 
};

///get

const getWhyChooseUs = async (req,res) => {
    try{
        const data = await WhyChooseUsModel.find({})
        res.status(200).json({ statusCode: 200, message: 'whyChooseUs fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateWhyChooseUs = async (req, res) => {
    try {
      const id = req.params.id;
      let data = {};
  
      // Update data even if value is the same (avoids empty $set)
      if (req.body.heading) data['heading'] = req.body.heading;
      if (req.body.description) data['description'] = req.body.description;
  
      if (req.file) {
        // Construct the complete file URL with protocol, host, and file path
        const filePath = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
        data['image'] = filePath;
      }
  
      const response = await WhyChooseUsModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'WhyChooseUs not found' });
      }
  
      res.status(200).json({ statusCode: 200, success: true, message: 'WhyChooseUs updated successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
  };
  

//delete

const deleteWhyChooseUs = async (req, res) => {
    try{
        const id = req.params.id;
        const response =await WhyChooseUsModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'WhyChooseUs not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'WhyChooseUs deleted succesfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addwhyChooseUs, getWhyChooseUs,updateWhyChooseUs,deleteWhyChooseUs }