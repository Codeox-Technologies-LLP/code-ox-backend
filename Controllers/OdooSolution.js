const { trusted } = require('mongoose');
const SolutionModel = require('../Model/Solution')
const { addImage, updateImage, deleteImage } = require('../middlewares/image')

//post

const addSolution = async (req, res) => {
    try{
       let imageData = addImage(req);
        if (req.file) {
           imageData = req.file.path;
        } else if (req.files && req.files['image']) {
            imageData =req.files['image'].map(file => file.path)
        } else {
            return res.status(400).json({ message: "Error adding image: No file uploaded"});
        }

        const cards = Array.isArray(req.body.cards) ? req.body.cards : [];

        const data = {
            heading: req.body.heading,
            description: req.body.description,
            image: imageData,
            cards: cards.map(card => ({
                cardHeading: card.cardHeading,
                cardDescription: card.cardDescription,
                cardImage: imageData
            }))
        }; 
        const newSolution =  new SolutionModel(data);
        const savedSolution = await newSolution.save();

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Solution card added succesfully",
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
    try{
        const id = req.params.id;
        let data = {};

        if (req.body.heading) data['heading'] = req.body.heading;

        if (req.body.description) data['description'] = req.body.description;

        const image = req.file || (req.files && re.files['image']);
        if (image) {
            data['image'] = image.path;
        }

        const response = await SolutionModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        if(!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'solution not found'})
        }
        res.status(200).json({ statusCode: 200, success: true, message: 'Soltion nadded succesfully' })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
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
 