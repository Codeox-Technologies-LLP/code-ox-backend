const mongoose = require("mongoose");
const querymodel = require("../Model/queries");
const countryModel = require('../Model/country')
const axios = require("axios");
const contactSubmitResponse = require("../tools/mail");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const addQuery = async (req, res) => {
  try {
    const { email, name, phone, message, countryCode } = req.body;

    if (!validateEmail(email)) {
      console.log("Invalid Email Provided");
      return res.status(400).json({
        statusCode: 400,
        success: false,
        error: "Invalid email",
        message: "Please provide a valid email address.",
      });
    }

    const newQuery = new querymodel({ email, name, phone, message, countryCode });

    await newQuery.save(); // Save to DB first

    // Send email and handle errors properly
    try {
      await contactSubmitResponse(name, email);
      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Query submitted successfully",
    });
  } catch (error) {
    console.error("Error in addQuery:", error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: "Internal server error",
      message: "Query submission failed",
    });
  }
};


//get Query


// const getQuery = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const data = await querymodel.find().skip(skip).limit(limit);
//     const totalCount = await querymodel.countDocuments();
//     const totalPages = Math.ceil(totalCount / limit);

//     res.status(200).json({
//       statusCode: 200,
//       success: true,
//       message: "Query listing successful",
//       data,
//       Pagination: {
//         totalItems: totalCount,
//         totalPages: totalPages,
//         currentPage: page,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       statusCode: 500,
//       success: false,
//       error: "Internal server error",
//       message: "Query listing failed",
//     });
//   }
// };

const getQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query.limit) || 10; // Items per page, default to 10
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    // Fetch data for the current page
    const data = await querymodel.find().skip(skip).limit(limit);

    // Total count of all items
    const totalCount = await querymodel.countDocuments();

    // Total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    // Calculate nextPage and prevPage
    const nextPage = (page < totalPages) ? page + 1 : null;
    const prevPage = (page > 1) ? page - 1 : null;

    // Send response
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Query listing successful",
      data,
      pagination: {
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      statusCode: 500,
      success: false,
      error: "Internal server error",
      message: "Query listing failed",
    });
  }
};





const getCountry = async (req, res) => {

  try {
    const data = await countryModel.findOne()

    res.status(200).json({ statusCode: 200, success: true, message: 'country list fetching successfull ', data });

  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: error.message });
  }
};


// const getCountry = async (req, res) => {
//   try {


//         const data =  await countryModel.find({}) 

//         res.status(200).json( {statusCode:200,success:true,message:'country list fetching successfull ',countryList:data} );



//   } catch (error) {
//     res.status(500).json({statusCode:500,success:false,message:'country list fetching faild '});
//   }
// };

module.exports = { addQuery, getQuery, getCountry };
