const founderModel = require('../Model/Founder')

//post 
const addFounder = async (req, res) => {
    try {
        const { path: imagePath } = req.file; 
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const data = {
            image: baseUrl,
            name: req.body.name,
            role: req.body.role
        };

        // Use founderModel.create() to add a new founder
        const newFounder = await founderModel.create(data);

        res.status(200).json({ statusCode: 200, success: true, message: 'Founder added successfully', data: newFounder });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};


//get
const getFounder = async (req, res) => {
    try {
        const data = await founderModel.find({})     
        res.status(200).json({ statusCode: 200, message: 'founder fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const baseUrl = `${req.protocol}://${req.get('host')}/`; 

        // Check if req.file exists before accessing its properties
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : '';

        const data = {
            image: req.file ? baseUrl + imagePath : undefined, 
            name: req.body.name,
            role: req.body.role
        };

        // Use findByIdAndUpdate to update the founder by its ID
        const response = await founderModel.findByIdAndUpdate(id, data, { new: true });

        // Check if no document was found and updated
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: true, message: "No founder found with the provided ID" });
        }

        res.status(200).json({ statusCode: 200, message: 'Founder updated successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};




///delete
const deleteFounder = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await founderModel.findOneAndUpdate({}, { $pull: { founder: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}
module.exports = { addFounder, getFounder, updateFounder, deleteFounder }