const { taskSchema } = require("../models/task.model");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
module.exports.AddTask = async (req,res,next)=>{
    try {

        const {token,type,description,deadline,id} = req.body;

        //Validations

        if(!token || !type || !id || !description || !deadline) return res.status(400).json({message: "all fields are required"});

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

        const {token,type,description,deadline,completed} = req.body;

        //Validations

        if(!token || !type || !description || !deadline || !completed) return res.status(400).json({message: "all fields are required"});
        
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