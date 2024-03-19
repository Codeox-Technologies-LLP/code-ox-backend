const clientModel = require('../Model/Client')

// post
const addclient = async (req, res) => {
    try {
        const { path: imagePath } = req.file; // Extract the path property from req.file
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        console.log(req.body, req.file)
        console.log(req.body, req.file)
        const data = {
            image: baseUrl,
            categories: req.body.categories,

        }

        const newData = await clientModel.findOneAndUpdate({}, { $push: { Client: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: ' Client projects added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get

const getClient = async (req, res, next) => {
    try {
        const category = req.query.categories ? req.query.categories.toLowerCase() : null;
        let clientData = await clientModel.findOne();

        if (!clientData) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'No client found.' });
        }

        if (category) {
            clientData.Client = clientData.Client.filter(caseStudy =>
                caseStudy.categories.toLowerCase() === category
            );
            if (clientData.Client.length === 0) {
                return res.status(404).json({ statusCode: 404, success: false, message: 'No case studies found for the provided category.' });
            }
        }

        return res.status(200).json({ statusCode: 200, success: true, client: clientData });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, success: false, message: err.message });
    }
};



//update
const updateClient = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'Client.$[elem].categories': req.body.categories,
            'Client.$[elem].image': req.file.path,
        };

        const response = await clientModel.findOneAndUpdate(
            { 'Client._id': id },
            { $set: data },
            { arrayFilters: [{ 'elem._id': id }], new: true } // Options
        );

        res.status(200).json({ statusCode: 200, message: 'Client project updated successfully', updatedData: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};
///delete
const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await clientModel.findOneAndUpdate({}, { $pull: { Client: { _id: id } } }, { new: true });

        res.status(200).json({ statusCode: 200, success: true, message: "deleting successful" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}


module.exports = { addclient, getClient, updateClient, deleteClient }
