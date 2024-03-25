const { default: mongoose } = require("mongoose");
const webModel = require("../model/Keywebsitecollection");

module.exports = {
    addKeyWebsiteCollection: async (req, res) => {
    try {
      const baseUrl =
        req.protocol + "://" + req.hostname + ":" + req.socket.localPort + "/";
      const image = req.files["image"][0].path.replace(/\\/g, "/");

     
      const data = {
        heroImage: baseUrl + image,
        KeyWebsiteCollectionsHeading: req.body.KeyWebsiteCollectionsHeading,
        KeyWebsiteCollectionsDescription: req.body.KeyWebsiteCollectionsDescription,

      };
      const newData = webModel(data);
      const response = await newData.save();

      res
        .status(201)
        .json({
          statusCode: 201,
          success: true,
          message: "Key website created successfully",
        });
    } catch (error) {
      res
        .status(500)
        .json({
          statusCode: 500,
          success: false,
          message: "keywebsite creation failed",
        });
    }
  },
  getKeyWebsiteCollection: async (req, res) => {
    try {
      const id = req.query.id;
      if (id ) {
        if (id && mongoose.Types.ObjectId.isValid(id)) {
          const data = await webModel.findOne({ _id: id });
          if (data === null) {
            res
              .status(404)
              .json({
                statusCode: 404,
                success: false,
                message: "no keywebsite found",
              });
          } else {
            res
              .status(200)
              .json({
                statusCode: 200,
                success: true,
                message: "keywebsite fetching successfull",
                data,
              });
          }
        } else {
            res
            .status(400)
            .json({
              statusCode: 400,
              success: false,
              message: "Invalid ID provided",
            });
        }
      } else {
        const data = await webModel.find({});
        res
          .status(200)
          .json({
            statusCode: 200,
            success: true,
            message: "keywebsite fetching successfull",
            data,
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          statusCode: 500,
          success: false,
          message: "keywebsite fetching failed",
        });
    }
  },
  updateKeyWebsiteCollection: async (req, res) => {
    try {
      const id = req.params.id;
      const baseUrl =
        req.protocol + "://" + req.hostname + ":" + req.socket.localPort + "/";
      const image = req.files?.["heroImage"]?.[0]?.path.replace(/\\/g, "/");
    
    
     

      const payload = {
        
        KeyWebsiteCollectionsDescription: req.body.KeyWebsiteCollectionsDescription,
        KeyWebsiteCollectionsHeading: req.body. KeyWebsiteCollectionsHeading
     
      };

      if (image) { 
        payload.image = baseUrl + image
    }

      if (id && mongoose.Types.ObjectId.isValid(id)) {
        const data = await webModel.findByIdAndUpdate(id, payload, {
          new: true,
        });
        if (data === null) {
          res
            .status(404)
            .json({
              statusCode: 400,
              success: false,
              message: "no keywebsite found",
            });
        } else {
          res
            .status(200)
            .json({
              statusCode: 200,
              success: true,
              message: "keywebsite updating successfull",
              data,
            });
        }
      } else {
        res
          .status(400)
          .json({
            statusCode: 400,
            success: false,
            message: "Invalid ID provided",
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          statusCode: 500,
          success: false,
          message: "keywebsite updating failed",msg:error.message,
        });
    }
  },
  deleteKeyWebsiteCollection: async (req, res) => {
    try {
      const id = req.params.id;
      
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        const data = await webModel.findByIdAndDelete(id);
       if(!data){
        res
        .status(404)
        .json({
          statusCode: 404,
          success: true,
          message: "no programs  found",
          
        });
       }else{
        res
        .status(200)
        .json({
          statusCode: 200,
          success: true,
          message: "programs deleting successfull",
          
        });
       }
      } else {
        res
          .status(400)
          .json({
            statusCode: 400,
            success: false,
            message: "Invalid ID provided",
          });
      }
    } catch (error) {
        res
        .status(500)
        .json({
          statusCode: 500,
          success: false,
          message: "programs deleting failed",
        });
    }
  },
};
