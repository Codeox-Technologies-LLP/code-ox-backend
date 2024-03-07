const footerModel = require('../Model/Footer');

const addFooterData=async(req,res)=>{
try {
   console.log(req.file,req.body)
   const data={
    name:req.body.name,
    icon:req.file.path,
    link:req.body.link,
   }
      const responde = await footerModel.findOneAndUpdate({},
        {$set:{
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email
      },$push:{socialmedia:data}},{ new: true, upsert: true })

   res.status(200).json({statusCode:200,success:true,message:"footer data submitted successfully"})
} catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})
}   
}

const getFooterData=async(req,res)=>{
try {
    const response =await footerModel.find({})
    console.log(response);
    res.status(200).json({statusCode:200,success:true,message:'footer data fetching successful',data:response})
} catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})  
}
}



module.exports={addFooterData,getFooterData}