const footerModel = require('../Model/Footer');

const addFooterData=(req,res)=>{
try {
   console.log(req.file,req.body)
} catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})
}   
}

module.exports={addFooterData}