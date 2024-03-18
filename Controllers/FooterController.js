const footerModel = require('../Model/Footer');

//ADD FOOTER DATA
const addFooterData=async(req,res)=>{
try {
  const { path: imagePath } = req.file; // Extract the path property from req.file
  const baseUrl = `${req.protocol}://${req.get('host')}/${imagePath.replace(/\\/g, "/")}`;
  if (!imagePath) {
      return res.status(400).json({ message: 'Image file is required' });
  }
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

//GET FOOTER DATA
const getFooterData=async(req,res)=>{
try {
    const response =await footerModel.find({})
    console.log(response);
    res.status(200).json({statusCode:200,success:true,message:'footer data fetching successful',data:response})
} catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})  
}
}


//UPDATE FOOTER DATA
const updateFooteData =async(req,res)=>{
  try {
    const id= req.params.id;
      
    const data={
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        'socialmedia.$[elem].name': req.body.name,
        'socialmedia.$[elem].icon': req.file.path, 
        'socialmedia.$[elem].link': req.body.link   
       }
       const response = await  footerModel.findOneAndUpdate({},{$set:data},{arrayFilters:[{'elem._id':id}], new: true }
       
       )
       res.status(200).json({statusCode:200,success:true,message:"updating successful"})
  } catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})  
  }
}

//DELETE FOOTER DATA
const deleteFooter =async(req,res)=>{
   try {
    const id = req.params.id;
    const data = await footerModel.findOneAndUpdate({}, { $pull: { socialmedia: { _id: id } } },{new:true})
    console.log(data);
    res.status(200).json({statusCode:200,success:true,message:"deleting successful"})
   } catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message})  
   }
}


module.exports={addFooterData,getFooterData ,updateFooteData,deleteFooter}