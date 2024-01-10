const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const Common = require('../models/common');
const jwt = require ('jsonwebtoken');


exports.register = async(req,res)=> {

    try{
         const schema = Joi.object({
             firstname: Joi.string().required(),
             lastname: Joi.string().required(),
             email: Joi.string().email().required(),
             mobile: Joi.string().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             role : Joi.string().required(),
             isActive :Joi.boolean()
         })
       
         const commonFields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         commonFields.password = await bcrypt.hash ( commonFields.password, salt);
         
         try{
            let common= await Common.findOne({email: commonFields.email})
            //console.log(common,'user')
            if(!common){
                common = new Common(commonFields);
                await common.save();
                return res.status(200).json({
                    message: "User registered successfully",
                    regcommon: common,
                    status: 200

                })
            }else {
                return res.status(400).json({
                  message: "User Already exists",
                  status : 400
                })
            }
         }catch(err){
            return res.status(500).json({
                message: "Something went wrong",
                error: err.message,
                status : 500
              })

         }
    }
    catch(err){
        return res.status(401).json({
            message: "Validation problem occured",
            error: err.message,
            status : 401
          })
    }
}

exports.login= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          email: Joi.required(),
          password: Joi.required()
        })

        const commonFields = await schema.validateAsync(req.body);
        let common = await Common.findOne({email:commonFields.email});
        if(common){
            const isMatch = await bcrypt.compare(commonFields.password, common.password)
        
        if(isMatch){
            const payload = {
                common: {
                    id :common._id
                }
            }
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                if (err)
                    throw err;
                const loggedcommon = { id: common.id,name: common.firstname+ ' ' +common.lastname,
                                       email: common.email, contact : common.contact, role: common.role };

                return res.status(200).json({
                    message: "Logged In succesfully",
                    loggedcommon: loggedcommon,
                    token: token,
                    status : 200
                });

            })
            
        }else{
            return res.status (400).json({
                message: "Wrong username/password",
                status: 400,
                error: err.message,

            })
        }

    }else{
        return res.status (500).json({
            message: "Something went wrong",
            status: 500,
            error: err.message
        })
    }
    
    
}catch(err){
    return res.status (401).json({
        message: "Validation error",
        error: err.message,
        status : 401
    })
}
}