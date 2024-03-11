const  adminModel = require('../Model/Admin');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken') 


const addAdmin =async(req,res)=>{
    try {
        const {username,password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
         
        const data = new adminModel({username,password:hashedPassword})
        const newdata = await  data.save()
        res.status(201).json({ statusCode: 201, success: true, message: 'Admin created successfully', data: newdata });
    } catch (error) {
        res.status(500).json({statusCode:500,success:false,message:error.message})  
    }
}

const adminLogin=async(req,res)=>{
    try {
        const {username,password} = req.body
         const user= await adminModel.findOne({username});
         if (!user){
            return res.status(404).json({ statusCode: 404, success: false, message: 'User not found' });
         }

         const login = await bcrypt.compare(password,user.password)
         if(!login){
            return res.status(401).json({ statusCode: 401, success: false, message: 'Invalid credentials' });
         }
        
         const token = jwt.sign({ userId: user._id, username: user.username },process.env.JWT, { expiresIn: '3d' });
         res.status(200).json({ statusCode: 200, success: true, message: 'Login successful', data: user,token:token });
    } catch (error) {
        res.status(500).json({statusCode:500,success:false,message:error.message}) 
    }
}


module.exports= {addAdmin,adminLogin}