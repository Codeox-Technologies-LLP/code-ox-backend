const keywebsitecollectionModel = require('../Model/Keywebsitecollection')

// keywebsitecollection

//post
const addkeywebsitecollection = async (req, res) => {
    try {
        const { path: imagePath } = req.file;
        const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;

        if (!imagePath) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const data = {
            image: baseUrl,
        };

        const response = await keywebsitecollectionModel.findOneAndUpdate({}, {
            $set: {
                KeyWebsiteCollectionsDescription: req.body.KeyWebsiteCollectionsDescription,
                KeyWebsiteCollectionsHeading: req.body.KeyWebsiteCollectionsHeading
            },
            $push: { keywebsitecollection: data }
        }, { new: true, upsert: true });

        console.log(response);

        return res.status(201).json({ statusCode: 201, success: true, message: "keywebsitecollection added successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, success: false, message: err.message });
    }
};



//get 

const getKeywebsitecollection = async (req, res) => {
    try {
        const data = await keywebsitecollectionModel.findOne({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'keywebsitecollection projects fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateKeywebsitecollection = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            'keywebsitecollection.$[elem].KeyWebsiteCollectionsHeading': req.body.KeyWebsiteCollectionsHeading,
            'keywebsitecollection.$[elem].image': req.file.path,
            'keywebsitecollection.$[elem].KeyWebsiteCollectionsDescription': req.body.KeyWebsiteCollectionsDescription
        }

        const response = await erpModel.findOneAndUpdate({}, { $set: data }, { arrayFilters: [{ 'elem._id': id }], new: true })

        res.status(200).json({ statusCode: 200, message: 'keywebsitecollection fetched successfully' })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//delete
const deleteKeyWebsiteCollection = async (req, res) => {
    try {
        const id = req.params.id;


        const response = await keywebsitecollectionModel.findOneAndUpdate(
            {},
            { $pull: { keywebsitecollection: { _id: id } } },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Key website collection project not found' });
        }

        res.status(200).json({ statusCode: 200, success: true, message: 'Key website collection project deleted successfully', data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}


module.exports = { addkeywebsitecollection, getKeywebsitecollection, updateKeywebsitecollection, deleteKeyWebsiteCollection }