const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const SubAdmin = require('../models/subadminModel');
const jwt = require ('jsonwebtoken');

exports.register = async(req,res)=> {
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
            let admin= await SubAdmin.findOne({email:adminfields.aemail})
            if(!admin){
                admin = new SubAdmin(adminfields);
                await admin.save();
                return res.status(200).json({
                    message: "SubAdmin registered successfully",
                    regadmin: {id : admin._id,name: admin.name,email:admin.email,isActive:admin.isActive},
                    status: '200'

                })
            }else {
                return res.status(400).json({
                  message: "SubAdmin Already exists",
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

exports.login= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          email: Joi.required(),
          password: Joi.required()
        })

        const adminFields = await schema.validateAsync(req.body);
        let admin = await SubAdmin.findOne({email:adminFields.email});
        if(admin){
            const isMatch = await bcrypt.compare(adminFields.password, admin.password)
        
        if(isMatch){
            const payload = {
                admin: {
                    id :admin._id,name:admin.name, email:admin.email, role: "SubAdmin"
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

//list of sub admins
exports.listofsubAdmin = async(req,res)=>{
    var pageNo = parseInt(req.body.startNumber)
     var size = parseInt(req.body.pageSize)
     var query = {}
     if(pageNo < 0 || pageNo === 0) {
             response = {"error" : true,"message" : "invalid page number, should start with 1"};
             return res.json(response)
     }
     query.skip = size * (pageNo - 1)
     query.limit = size
        try {
            await SubAdmin.find({},{},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });
            
                SubAdmin.count({},(count_error, count) => {
                    if (err) {
                      return res.json(count_error);
                    }
                    return res.json({
                      'message': 'SubAdmins Fetched Successfully',
                      total: count,
                      page: pageNo,
                      pageSize: data.length,
                      'listofsubadmins': data,
                      status: 200
                    });
                  });
                
            })
            
        }catch(err){
            return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
        }
}


exports.updatesubadmin = async (req,res)=>{
    try{
        await SubAdmin.findByIdAndUpdate(req.params.id,{
            $set:{
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpass: req.body.cpass,
                isActive: req.body.isActive
                
            }
        })
        return res.status(200).json({ 'message': 'SubAdmin updated successfully', 'status':200, "subadmin": req.body})

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete single subadmin
exports.deletesubadmin = async(req,res)=>{
    try{
        await SubAdmin.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'SubAdmin deleted successfully', 'status':200})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}
