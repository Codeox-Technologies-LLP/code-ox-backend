const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

const authenticate = (req,res,next)=>{
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1];
    if(!token){
        return res.status(401).json({ statusCode: 401, success: false, message: 'No token provided' });
    }

    jwt.verify(token,process.env.JWT,(err,decode)=>{
     
         if(err){
            return res.status(403).json({ statusCode: 403, success: false, message: 'Invalid token' });
         }
         req.user=decode;
         next()
    })
}

module.exports={authenticate}