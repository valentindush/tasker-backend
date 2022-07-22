const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { userSchema } = require('../models/user.model');
const jwt = require('jsonwebtoken');
module.exports.Signup = async (req,res,next)=>{

    try {

        const {names,email,password} = req.body;

        //Validations

        if(!names || !email || !password) return res.status(400).json({message:"Please fill all the fields"});
        //validate name
        if(!names.match(/^[a-zA-Z ]{2,30}$/)) return res.status(400).json({message:"Name must be between 2 and 30 characters"});
        //Validate email
        const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!mailRegex.test(email)) return res.status(400).json({message:"Invalid email address"});
        //Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passwordRegex.test(password)) return res.status(400).json({message:"a password with at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)"});

        //Check if email already exists

        const user  = await userSchema.findOne({email: email});
        if(user) return res.status(400).json({message:"Someone else is using this email"});

        //Hash password
        const hashedPassword   = await bcrypt.hash(password,10);
   
        //Create user
        const newUser = userSchema({
            uniqueId: uuid.v4(), //generate unique id
            names: names,
            email: email,
            password: hashedPassword
        })

        if(!await newUser.save()) return res.status(500)
        const token = jwt.sign({
            uniqueId: newUser.uniqueId,
            names: newUser.names,
            email: newUser.email,
        },process.env.JWT_KEY,{expiresIn:'1d'});

        return res.status(200).json({message:"User created successfully",status:true,token:token});
        
    } catch (err) {
        
        return res.status(500)
    }
}

module.exports.Login = async (req,res,next)=>{

    try {

        const {email,password} = req.body;

        //Validations

        if(!email || !password) return res.status(400).json({message:"Incorrect email or password"});

        const user  = await userSchema.findOne({email:email});
        if(!user) return res.status(400).json({message:"Incorrect email or password"});

        //Check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Incorrect email or password"});
        
        const token = jwt.sign({
            uniqueId: user.uniqueId,
            names: user.names,
            email: user.email,
        },process.env.JWT_KEY,{expiresIn:'1d'});

        if(user) return res.status(200).json({message:"User logged in successfully",status:true,token:token});
        else return res.status(500)

        
        
    } catch (err) {
        next(err)
    }
}

module.exports.UpdateUser = async (req,res,next)=>{
    try {

        const {names,email,profileImg} = req.body;

        //Validations

        if(!names || !email || !profileImg) return res.status(400).json({message:"Please fill all the fields"});
        //validate name
        if(!names.match(/^[a-zA-Z ]{2,30}$/)) return res.status(400).json({message:"Name must be between 2 and 30 characters"});
        //Validate email
        
        
    } catch (err) {
        return res.status(500)
    }
}