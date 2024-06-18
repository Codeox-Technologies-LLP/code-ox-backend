const { trusted } =  require('mongoose');
const OdooaboutusModel = require('../Model/OdooAboutus')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

//post
const addOdooaboutus =  async (req, res) => {
    try{
        const imageData = addImage(req);
        if (!ImageData) {
            return res.status(400).json({ message: "Error adding image "})
        }
        const data = {
            heading: req.body.Heading,
            paraContent: req.body.paraContent,
            buttonText: req.body.buttonText,
            buttonLink: req.body.buttonLink,
            image: ImageData,
        }
        const newOdooaboutus = new OdooaboutusModel(data);
        const savedOdooaboutus = await newOdooaboutus.save();
        return res.status(201).json({
            statuscode: 201,
            success: true,
            message: "About Us added succesfully",
            data: savedOdooaboutus

        });
    } catch (err) {
        res.status(500).json({
        statusCode: 500,
        success: false,
        meassge: err.message
        });
    }
};

///get
const getOdooaboutus = async (req, res) => {
    try{
        const data =  await OdooaboutusModel.find({})
        res.status(200).json({ statusCode: 200, message: 'Aboutus fetched succesfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateOdooAboutus = async (req, res) => { 
    try{
        const id = req.params.id;
        if (req.body.heading) data['heading'] = req.body.title;

        if (req.body.paraContent) data['paraContent'] = req.body.paraContent;
        if (req.body.buttonText) data['buttonText'] = req.body.buttonText;
        if (req.body.buttonLink) data['buttonLink'] = req.body.buttonLink;
        const image = updateImage(req)
        let data = {};
        if (image) {
            data['image'] = image;
        }
    

        const response = await OdooaboutusModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'About us not found'});
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Aboutus updated succesfully', updateOdooAboutus })
    }catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }

};

///delete
const deleteOdooaboutus = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await OdooaboutusModel.findOneAndDelete({_id: id })
        deleteImage(response, req);
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Aboutus not found'})
        }
        res.status(200).json({ statusCode: 500, success: false, message: error.message })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

module.exports = { addOdooaboutus, getOdooaboutus, updateOdooAboutus, deleteOdooaboutus }


