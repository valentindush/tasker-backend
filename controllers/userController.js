

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

    
        
    } catch (err) {
        
        return res.status(500)
    }
}