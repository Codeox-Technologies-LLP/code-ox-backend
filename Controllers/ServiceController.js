const servicesModel = require('../Model/Service')
//add service

const addService = async (req, res) => {
    try {
        const { servicesHeading, servicesDescripation } = req.body;
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const serviceItem = new servicesModel({
            services: [{
                image: baseUrl,
                servicesHeading,
                servicesDescripation,

            }]
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

        const services = await servicesModel.findOne();


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
        const { servicesHeading, servicesDescription } = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const serviceId = req.params.id;
        const service = await servicesModel.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await servicesModel.updateOne(
            { _id: serviceId, 'showreel._id': req.body.showreelId },
            {
                $set: {
                    ' services.$.image': image.path,
                    ' services.$.servicesHeading': servicesHeading,
                    ' services.$.servicesDescription': servicesDescription
                }
            }
        );
        const updatedService = await servicesModel.findById(serviceId);
        res.status(200).json(updatedService);
    } catch (error) {
        console.error('Error while updating service:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//delete servive
const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        if (!serviceId) {
            return res.status(400).json({ message: 'Service ID is required' });
        }
        const deletedService = await servicesModel.findByIdAndDelete(serviceId);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully', deletedService });
    } catch (error) {
        console.error('Error while deleting service:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = { addService, getServices, updateService, deleteService } 