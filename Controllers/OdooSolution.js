const { trusted } = require('mongoose');
const SolutionModel = require('../Model/Solution')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

//post

const addSolution = async (req, res) => {
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
        const newSolution =  new SolutionModel(data);
        const savedSolution = await newSolution.save();

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Solution added succesfully",
            data: savedSolution
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

const getSolution = async (req,res) => {
    try{
        const data = await SolutionModel.find({})
        res.status(200).json({ statusCode: 200, message: 'solution fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateSolution = async (req, res) => {
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
  
      const response = await SolutionModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
  
      if (!response) {
        return res.status(404).json({ statusCode: 404, success: false, message: 'solution not found' });
      }
  
      res.status(200).json({ statusCode: 200, success: true, message: 'Solution updated successfully' });
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
  };
  

//delete

const deleteSolution = async (req, res) => {
    try{
        const id = req.params.id;
        const response =await SolutionModel.findOneAndDelete({ _id: id });
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Solution not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Solution deleted succesfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addSolution, getSolution, updateSolution, deleteSolution }
 