const clientModel = require('../Model/Client')

// post
const addclient = async (req, res) => {
    try {
        console.log(req.body, req.file)
        const data = {
            image: req.file.path,
            categories: req.body.categories,

        }

        const newData = await clientModel.findOneAndUpdate({}, { $push: { Client: data } }, { new: true, upsert: true })

        res.status(200).json({ statusCode: 200, success: true, message: ' Client projects added successfully' })

    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//get

const getClient = async (req, res) => {
    try {
        const data = await clientModel.find({})
        console.log(data)
        res.status(200).json({ statusCode: 200, message: 'client  fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

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
const deleteClient =async(req,res)=>{
    try {
       const id = req.params.id;
    const response = await clientModel.findOneAndUpdate({},{ $pull: {Client : { _id: id } } },{new:true});
 
    res.status(200).json({statusCode:200,success:true,message:"deleting successful"});
    
 } catch (error) {
       res.status(500).json({statusCode:500,success:false,message:error.message}) 
    }
   }


module.exports = { addclient, getClient ,updateClient,deleteClient }
