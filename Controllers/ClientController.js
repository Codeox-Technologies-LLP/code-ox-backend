const clientModel = require('../Model/Client')
const mongoose = require('mongoose');

// post
const addclient = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
      
       
        const data = {
            image: baseUrl,
            category: req.body.category,

        }

        const newData = clientModel(data)
        const response= await newData.save()

        res.status(200).json({ statusCode: 200, success: true, message: ' Client projects added successfully' ,response})

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get

const getClient = async (req, res, next) => {
    try {
        const category = req.query.category ? req.query.category.toLowerCase() : null;
        let Data = await clientModel.find({});

        if (!Data) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'No client found.' });
        }

        if (category) {
            let Data = await clientModel.find({category:category});

            if (Data.length === 0) {
                return res.status(404).json({ statusCode: 404, success: false, message: 'No case studies found for the provided category.' });
            }
            return res.status(200).json({ statusCode: 200, success: true, client: Data })
        }

        return res.status(200).json({ statusCode: 200, success: true, client: Data });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, success: false, message: err.message });
    }
};



//update
const updateClient = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }

        const {  category } = req.body;
        const  image  = req.file?.path;
        const baseUrl = `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}`;
        const update = {
            image:baseUrl,
            category:category
        };
      
        
        const updatedClient = await clientModel.findOneAndUpdate(
            { _id: id }, 
            update, 
            { new: true } 
        );

   
        if (!updatedClient) {
            return res.status(404).json({ statusCode: 404, message: 'Client not found' });
        }

        res.status(200).json({ statusCode: 200,success: true, message: 'Client updated successfully', updatedClient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ statusCode: 500,success: false, message: 'Internal server error' });
    }
};
///delete
const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }
         
        const response = await clientModel.findOneAndDelete({_id:id});
        if (!response){
            res.status(200).json({ statusCode: 200, success: true, message: "no documents were deleted" });
         }
        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addclient, getClient, updateClient, deleteClient }
