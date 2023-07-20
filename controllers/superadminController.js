const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const SuperAdmin = require('../models/superadminModel');
const config = require ('config');
const jwt = require ('jsonwebtoken');

exports.adminregister = async(req,res)=> {
    try{
         const schema = Joi.object({
             name: Joi.string().required(),
             email: Joi.string().email().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             isActive :Joi.boolean()
         })
         const adminfields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         adminfields.password = await bcrypt.hash (adminfields.password, salt);

         try{
            let admin= await SuperAdmin.findOne({email:adminfields.aemail})
            if(!admin){
                admin = new SuperAdmin(adminfields);
                await admin.save();
                return res.status(200).json({
                    message: "SuperAdmin registered successfully",
                    regadmin: {id : admin._id,name: admin.name,email:admin.email,isActive:admin.isActive},
                    status: '200'

                })
            }else {
                return res.status(400).json({
                  message: "SuperAdmin Already exists",
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

exports.adminlogin= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          email: Joi.required(),
          password: Joi.required()
        })

        const adminFields = await schema.validateAsync(req.body);
        let admin = await SuperAdmin.findOne({email:adminFields.email});
        if(admin){
            const isMatch = await bcrypt.compare(adminFields.password, admin.password)
        
        if(isMatch){
            const payload = {
                admin: {
                    id :admin._id,name:admin.name, email:admin.email, role: "Admin"
                }
            }
            jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: process.env.JWT_EXPIRE}, (err, token) => {
                if (err)
                    throw err;
               // const loggedadmin = { adminid: admin.id,adminname: admin.name, adminemail: admin.email };

                return res.status(200).json({
                    message: "Logged In succesfully",
                    token: token,
                    status: 200
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