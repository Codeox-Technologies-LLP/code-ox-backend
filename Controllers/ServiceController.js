const servicesModel = require('../Model/Service')
const mongoose = require('mongoose');
//add service

const addService = async (req, res) => {
    try {
        const { servicesHeading, servicesDescription} = req.body;
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const serviceItem = new servicesModel({

            image: baseUrl,
            servicesHeading,
            servicesDescription,


        });
        const savedserviceItem = await serviceItem.save();
        res.status(201).json(savedserviceItem);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// get service
const getServices = async (req, res) => {
    try {

        const services = await servicesModel.find();


        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }


        res.status(200).json(services);
    } catch (error) {
        console.error('Error while fetching services:', error);


        res.status(500).json({ message: 'Server Error' });
    }
};

//update service
const updateService = async (req, res) => {
    try {
        const id = req.params.id;  
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid Id' });
        }
        const { servicesHeading, servicesDescription } = req.body;

        const image = req.file?.path;
        const baseUrl = image ? `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, "/")}` : null;
        const update = {
            ...(baseUrl && { image: baseUrl }), 
            servicesHeading,
            servicesDescription,
        };
        const updatedService = await servicesModel.findByIdAndUpdate(id, update, { new: true });
        if (!updatedService) {
            return res.status(404).json({ statusCode: 404, message: 'Service not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Service updated successfully', updatedService });
    } catch (error) {
        console.error('Error while updating service:', error);
        res.status(500).json({ statusCode: 500, success: false, message: 'Internal server error' });
    }
};


//delete servive
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the showreel item by its ID and delete it
        const deletedService = await servicesModel.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service item not found' });
        }

        res.status(200).json({ message: 'Service item deleted successfully', deletedItem: deletedService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = { addService, getServices, updateService, deleteService } 