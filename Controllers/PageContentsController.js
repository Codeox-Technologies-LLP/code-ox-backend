const PagContentModel = require('../Model/PageContents');
const mongoose = require('mongoose');

const addPageContent = async (req, res) => {
    try {
        const pageContent = new PagContentModel(req.body);
        const newPageContent = await pageContent.save();
        res.status(201).json({ statusCode: 201, success: true, message: 'Page content Added Successfully' });
    } catch (error) {
        if (error.heading === 'validationError') {
            return res.status(400).json({ statusCode: 400, success: false, message: error.message });
        }
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}

const getPageContents = async (req,res) => {
    try {
        const pageContent = await PagContentModel.find().exec();
        res.status(200).json({statusCode:200,success:true,data:pageContent})
    } catch (error) {
        res.status(500).json({statusCode:500,success:false,message:error.message})
    }
}

const updatePageContent = async (req,res) => {
    try {
        const { id } = req.params;
        const { heading, heading1, description,key} = req.body;
        const data = {};

        if(heading) data.heading = heading.trim();
        if(heading1) data.heading1 = heading1.trim();

        if(description) data.description = description.trim();
        if(key) data.key = key.trim();


        const response = await PagContentModel.findByIdAndUpdate(id,{$set:data},{new:true});

        if(!response) {
            return res.status(404).json({status:200,success:false,message:'Page Content not Find'});
        }

        res.status(200).json({statusCode: 200,success:true,message:'Page Content updated Successfully'}) 
    } catch (error) {
            if(error.heading || error.key === "ValidationError"){
                return res.status(400).json({ statusCode:400,success:false,message:error.message})
            }
        res.status(500).json({ statusCode:500,success:false,message:error.message});
    }
}

const getPageContentByKey = async (req, res) => {
    try {
        const { key } = req.query; 
        if (!key) {
            return res.status(400).json({ statusCode: 400, success: false, message: 'Key is required' });
        }

        console.log(key);

        const pageContent = await PagContentModel.find({ "key": key });
        if (!pageContent) {
            return res.status(404).json({ statusCode: 404, success: false, message: 'Page content not found' });
        }
        res.status(200).json({ statusCode: 200, success: true, data: pageContent });
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message });
    }
}




module.exports = { addPageContent,getPageContents,updatePageContent,getPageContentByKey };