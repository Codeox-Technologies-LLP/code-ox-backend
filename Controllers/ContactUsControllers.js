const mongoose = require("mongoose");
const querymodel = require("../Model/queries");
const countryModel= require('../Model/country')
const axios = require("axios");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const addQuery = async (req, res) => {
  try {
    const { email, name, phone, message, countryCode } = req.body;
    if (validateEmail(email)) {
      const newquery = new querymodel({
        email,
        name,
        phone,
        message,
        countryCode,
      });
      await newquery.save();
      res
        .status(201)
        .json({
          statusCode: 201,
          success: true,
          message: "Query submitted successfully",
        });
    } else {
      console.log("Email is invalid");
      res
        .status(400)
        .json({
          statusCode: 400,
          success: false,
          error: "Internal server error",
          message: "Invalid email",
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        statusCode: 500,
        success: false,
        error: "Internal server error",
        message: "Query submission failed",
      });
  }
};

const getQuery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await querymodel.find().skip(skip).limit(limit);
    const totalCount = await querymodel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Query listing successfull",
      data,
      metaData: {
        totalpages: totalCount,
        totalPages,
        currentpage: page,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        statusCode: 500,
        success: false,
        error: "Internal server error",
        message: "Query listing failed",
      });
  }
};

const getCountry = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://country-info.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Key": "7b9f17d9f7msh6921d6a7eb959a1p1ae313jsn675b7c579702",
      "X-RapidAPI-Host": "country-info.p.rapidapi.com",
    },
  };
  try {
   
     
        const data =  await countryModel.find({}) 
        
        res.status(200).json( {statusCode:200,success:true,message:'country list fetching successfull ',countryList:data} );
   
      
    
  } catch (error) {
    res.status(500).json({statusCode:500,success:false,message:'country list fetching faild '});
  }
};

module.exports = { addQuery, getQuery, getCountry };