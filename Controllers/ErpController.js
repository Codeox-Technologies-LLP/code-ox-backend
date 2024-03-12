const erpModel =require('../Model/Erp');




//POST 

const addProjects=async(req,res)=>{
 try {
 console.log(req.body,req.file)
  const data ={
    image:req.file.path,
    name:req.body.name,
    description:req.body.description
  }

 const newData= await erpModel.findOneAndUpdate({},{$push:{projects:data}},{ new: true, upsert: true })

 res.status(200).json({statusCode:200,success:true,message:'erp projects added successfully'})

 } catch (error) {
    res.status(500).json({statusCode:500,success:false,message:error.message}) 
 }
}

//GET

const getProjects=async(req,res)=>{
  try { 
  const data= await erpModel.find({})
   console.log(data)
  res.status(200).json({statusCode:200,message:'erp projects fetched successfully',data:data})
  } catch (error) {
     res.status(500).json({statusCode:500,success:false,message:error.message}) 
  }
 }

 //UPDATE

 const updateProjects=async(req,res)=>{
  try { 
    const id = req.params.id;
  const data={
   'projects.$[elem].name': req.body.name,
        'projects.$[elem].image': req.file.path, 
        'projects.$[elem].description': req.body.description   
  }

  const response = await  erpModel.findOneAndUpdate({},{$set:data},{arrayFilters:[{'elem._id':id}], new: true })

  res.status(200).json({statusCode:200,message:'erp projects fetched successfully'})
  } catch (error) {
     res.status(500).json({statusCode:500,success:false,message:error.message}) 
  }
 }
 
 //DELETE

  const deleteProjects =async(req,res)=>{
   try {
      const id = req.params.id;
   const response = await erpModel.findOneAndUpdate({},{ $pull: {projects : { _id: id } } },{new:true});

   res.status(200).json({statusCode:200,success:true,message:"deleting successful"});
   
} catch (error) {
      res.status(500).json({statusCode:500,success:false,message:error.message}) 
   }
  }

module.exports={addProjects,getProjects,updateProjects,deleteProjects}