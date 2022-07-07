const { taskSchema } = require("../models/task.model");

module.exports.AddTask = async (req,res,next)=>{
    try {

        const {token,type,description,deadline} = req.body;
        
        const allowedTypes = [
            "work",
            "home",
            "school",
            "learning",
            "personal",
            "other"
        ];

        //Validations

        if(!token || !type || !description || !deadline) return res.status(400).json({message: "all fields are required"});
        //validate type,description,deadline

        if(description.length > 100) return res.status(400).json({message: "description must be less than 100 characters"});
        if(type.length < 6) return res.status(400).json({message: "type must be more than 10 characters"});

        //verify type

        if(!allowedTypes.includes(type)) return res.status(400).json({message: "type must be one of the following: " + allowedTypes.join(", ")});

        //Verify token

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(!decoded) return res.status(401).json({message: "Invalid token"});

        //Create task

        const task = taskSchema({
            owner: decoded.uniqueId,
            type,
            description,
            deadline
        });

        //Save task

        await task.save();

        //Return task

        res.status(201).json({message: "Task created successfully",task:task});


        
    } catch (err) {
        return res.status(500)
    }
}