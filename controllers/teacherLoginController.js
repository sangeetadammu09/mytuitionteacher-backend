const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const Teacher = require('../models/teacherLoginModel');
const config = require ('config');
const jwt = require ('jsonwebtoken');

exports.teacherregister = async(req,res)=> {
    try{
         const schema = Joi.object({
             name: Joi.string().required(),
             email: Joi.string().email().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             isActive :Joi.string()
         })
         const teacherfields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         teacherfields.password = await bcrypt.hash (teacherfields.password, salt);

         try{
            let teacher= await Teacher.findOne({email:teacherfields.email})
            if(!teacher){
                teacher = new Teacher(teacherfields);
                await teacher.save();
                return res.status(200).json({
                    message: "Teacher registered successfully",
                    regteacher: teacher,
                    status: 'success'

                })
            }else {
                return res.status(400).json({
                  message: "Teacher Already exists",
                  status : "failed"
                })
            }
         }catch(err){
            return res.status(500).json({
                message: "something went wrong",
                error: err.message,
              })

         }
    }catch(err){
        return res.status(500).json({
            message: "Validation problem occured",
            error: err.message,
          })
    }
}

exports.teacherlogin= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          email: Joi.required(),
          password: Joi.required()
        })

        const teacherfields = await schema.validateAsync(req.body);
        let teacher = await Teacher.findOne({temail:teacherfields.email});
        if(teacher){
            const isMatch = await bcrypt.compare(teacherfields.password, teacher.password)
        
        if(isMatch){
            const payload = {
                teacher: {
                    id :teacher._id
                }
            }
            jwt.sign(payload, config.get('secretKey'), (err, token) => {
                if (err)
                    throw err;
                const loggedteacher = { teacherid: teacher.id,teachername: teacher.name, teacheremail: teacher.email };

                return res.status(200).json({
                    message: "Teacher Logged In succesfully",
                    loggedteacher: loggedteacher,
                    token: token
                });

            })
            
        }else{
            return res.status (401).json({
                message: "wrong username/password",
                status: "failed"
            })
        }

    }else{
        return res.status (401).json({
            message: "wrong username/password",
            status: "failed"
        })
    }
    
    
}catch(err){
    return res.status (400).json({
        message: "Validation error",
        error: err.message
    })
}
}

