const erpModel = require('../Model/Erp');

const mongoose = require('mongoose');


//POST 

const addProjects = async (req, res) => {
   try {
      const { path: imagePath } = req.file; // Extract the path property from req.file
      const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
      if (!imagePath) {
         return res.status(400).json({ message: 'Image file is required' });
      }
   
      const data = {
         image: baseUrl,
         name: req.body.name,
         description: req.body.description
      };

      const newData =  erpModel(data);
      const savedData= await newData.save()

      res.status(200).json({ statusCode: 200, success: true, message: 'erp projects added successfully' });

   } catch (error) {
      res.status(500).json({ statusCode: 500, success: false, message: error.message });
   }
};

//GET

const getProjects = async (req, res) => {
   try {

      const data = await erpModel.find({})

      res.status(200).json({ statusCode: 200, message: 'erp projects fetched successfully', data: data })
   } catch (error) {
      res.status(500).json({ statusCode: 500, success: false, message: error.message })
   }
}

//UPDATE

const updateProjects = async (req, res) => {
   try {
     const id = req.params.id;
     if (!mongoose.isValidObjectId(id)) {
       return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
     }
     const { name,description } = req.body;
   
     const image = req.file ? req.file.path : undefined; // Check if req.file exists
     const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : undefined;
     const update = {
       image: baseUrl,
       name,
       description
      
     };
 
     const updatedProject = await erpModel.findOneAndUpdate(
       { _id: id },
       update,
       { new: true }
     );
 
     if (!updatedProject) {
       return res.status(404).json({ statusCode: 404, success:false, message: 'project not found' });
     }
 
     res.status(200).json({ statusCode: 200, success: true, message: 'project updated successfully', updatedProject});
   } catch (error) {
     console.error(error);
     res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
   }
 };




//DELETE

const deleteProjects = async (req, res) => {
   try {
     const id = req.params.id;
     if (!mongoose.isValidObjectId(id)) {
       return res.status(400).json({ statusCode: 400, message: 'Invalid Id' ,success:false});
     }
 
     await erpModel.findOneAndDelete({ _id: id });
 
     res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });
 
   } catch (error) {
     res.status(500).json({ statusCode: 500, success: false, message: error.message })
   }
 }

module.exports = { addProjects, getProjects, updateProjects, deleteProjects }