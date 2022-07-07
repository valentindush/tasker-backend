const { taskSchema } = require("../models/task.model");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
module.exports.AddTask = async (req,res,next)=>{
    try {

        const {token,type,description,deadline} = req.body;

        //Validations

        if(!token || !type  || !description || !deadline) return res.status(400).json({message: "all fields are required"});

        //Verify token

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) return res.status(401).json({message: "Invalid token"});

        console.log(decoded);
        //Create task

        const task =  taskSchema({
            owner: decoded.uniqueId,
            type,
            description,
            deadline
        })

        //Save task
        //Return task

       if(await task.save()) res.status(201).json({message: "Task created successfully"});
         else res.status(500).json({message: "Error creating task"});

        
    } catch (err) {
        next(err);
    }
}

module.exports.UpdateTask = async (req,res,next)=>{
    try {

        const {token,type,description,deadline,completed,id} = req.body;

        //Validations

        if(!token || !type || !id || !description || !deadline || !completed) return res.status(400).json({message: "all fields are required"});
        
        //Verify token

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) return res.status(401).json({message: "Invalid token"});

        //update

        const task = await taskSchema.findOneAndUpdate({_id: id}, {description,deadline,completed}, {new: true});
        if(!task) return res.status(404).json({message: "Task not found"});
        //Return task

        return res.json({message: "Task updated successfully", status:true});

    } catch (err) {
        next(err)
    }
}

module.exports.GetTasks  = async(req,res,next)=>{
    try {

        const {token} = req.body;
        if(!token) return res.status(402).json({message: "Token is required"});

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) return res.status(401).json({message: "Invalid token"});

        const tasks = await taskSchema.find({owner: decoded.uniqueId});
        if(!tasks) return res.status(404).json({message: "No tasks found"});
        return res.json({tasks,status:false});

        
    } catch (err) {
        next(err)
    }
}

module.exports.getRecentlyAddedTasks = async(req,res,next)=>{
    try {
        const {token} = req.body
        if(!token) return res.status(402).json({message: "Token is required"})
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) return res.status(401).json({message: "Invalid token"})
        const tasks = await taskSchema.find({owner: decoded.uniqueId}).sort({_id: -1}).limit(8)
        if(!tasks) return res.status(404).json({message: "No tasks found"})

        return res.json({tasks,status:true})
        
    } catch (err) {
        next(err)
    }
}

module.exports.deleteTask = async(req,res,next)=>{

    try{

        const {token,id} = req.body;
        if(!token || !id) return res.status(400).json({message: "all fields are required"});
        if(!token) return res.status(402).json({message: "Token is required"});

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) return res.status(401).json({message: "Invalid token"});

        const task = await taskSchema.findOneAndDelete({_id: id});
        if(!task) return res.status(404).json({message: "Task not found"});
        return res.json({message: "Task deleted successfully", status:true});

    }catch(err){
        next(err)
    }
}
