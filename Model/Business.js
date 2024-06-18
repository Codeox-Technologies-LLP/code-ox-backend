const countModel = require("../Controllers/BusinessCounts")


//post
const addBusiness = async (req, res) => {
    try {
        const newData = await countModel.create(req.body)
        res.status(200).json({ statusCode: 200, success: true, message: 'added successfully' })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get
const getBusiness = async (req, res) => {
    try {
        const data = await countModel.find({})

        res.status(200).json({ statusCode: 200, message: ' fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update
const updateBusiness = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const response = await countModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ statusCode: 404, success: false, message: " ID not found" });
        }
        res.status(200).json({ statusCode: 200, sucess: true, message: ' updated successfully', success: true, data: response });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
};


module.exports = {addBusiness,getBusiness,updateBusiness }