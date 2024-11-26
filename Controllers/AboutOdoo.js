const AboutodooModel = require('../Model/AboutOdoo')
const mongoose = require('mongoose');


//POST

const addAboutOdoo = async (req, res) => {
    try {
      // Get the new description from the request body
      const newDescription = req.body.description;
  
      // Check if newDescription exists (optional, based on your validation needs)
      if (!newDescription) {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "Description is required",
        });
      }
  
      // Update the existing AboutOdoo document
      const updatedAboutOdoo = await AboutodooModel.findOneAndUpdate(
        {}, // Empty query selector to update any document
        { $push: { list: { description: newDescription } } },
        { new: true } // Return the updated document
      );
  
      // Check if document was found and updated
      if (!updatedAboutOdoo) {
        return res.status(404).json({
          statusCode: 404,
          success: false,
          message: "AboutOdoo not found",
        });
      }
  
      // Return success response with the updated data
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "AboutOdoo description added successfully",
        data: updatedAboutOdoo,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: "Error adding AboutOdoo description",
      });
    }
  };
  
  
  
  
//get
const getAboutOdoo = async (req,res) => {
    try {
        const data = await AboutodooModel.findOne({})
        res.status(200).json({ statusCode: 200, message: 'AboutOdoo fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ statusCode: 500, success: false, message: error.message })
    }
}

//update

const updateAboutOdoo = async (req, res) => {
  try {

    const id = req.params.id

    // 2. Validation (optional)
    if (!req.params.id) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Missing required field (ID)",
      });
    } else {
      console.log("Step 2: Validation passed (ID provided)");
    }

    // 3. Validate for mutually exclusive updates (optional)
    if (req.body.description && req.body.title) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Cannot update both title and description in the same request",
      });
    } else {
      console.log("Step 3: Validation passed (mutually exclusive updates)");
    }

    // 4. Update logic
    const updateData = {};
    if (req.body.title) {
      updateData['title'] = req.body.title;
      console.log("Step 4: Update logic - update title");
    } else if (req.body.description && req.body.index !== undefined) {
      updateData[`list.${req.body.index}.description`] = req.body.description;
      console.log("Step 4: Update logic - update description");
    }

    // Handle empty update scenario
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "No changes requested for AboutOdoo",
      });
    }

    const updatedAboutOdoo = await AboutodooModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true, // Ensure validators are run on update (optional)
      }
    );

    // 5. Handle update success/failure
    if (!updatedAboutOdoo) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "AboutOdoo or description not found",
      });
    } else {
      console.log("Step 5: Update successful");
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "AboutOdoo updated successfully",
        data: updatedAboutOdoo,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Error updating AboutOdoo description",
    });
  }
};
  
  

//DELETE

const deleteAboutodoo = async (req, res) => {
  try {
    const id = req.params.id;
    const elemid = req.query.elemid;
   
    // Adjust for Mongoose version
   
    const data = await AboutodooModel.findOne({_id:id})
   
    let lists = data?.list 
    const index = lists?.findIndex(item => item._id.toString() === elemid);
        
    console.log("mongoose ID:",index );
    if (index !== -1) {
      lists?.splice(index, 1);
       const response = await AboutodooModel.findByIdAndUpdate(
        id,
        {   list:lists}
      );
      
      
  } else {
      console.log(`Object with id ${elemid} not found.`);
  }
   

    // if (!response) {
    //   return res.status(404).json({ statusCode: 404, success: false, message: 'AboutOdoo not found' });
    // }

    res.status(200).json({ statusCode: 200, success: true, message: 'AboutOdoo list item deleted successfully' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};



module.exports = { addAboutOdoo, getAboutOdoo, updateAboutOdoo, deleteAboutodoo }



    
    
