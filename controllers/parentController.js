const bcrypt = require ('bcryptjs');
const Joi = require('joi');
const Parent = require('../models/parentModel');
const config = require ('config');
const jwt = require ('jsonwebtoken');
//const { json } = require('express');

exports.parentregister = async(req,res)=> {
    try{
         const schema = Joi.object({
             name: Joi.string().required(),
             email: Joi.string().email().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             isActive :Joi.string()
         })
         const parentfields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         parentfields.password = await bcrypt.hash (parentfields.password, salt);

         try{
            let parent= await Parent.findOne({pemail:parentfields.pemail})
            if(!parent){
                parent = new Parent(parentfields);
                await parent.save();
                return res.status(200).json({
                    message: "Parent registered successfully",
                    regparent: parent,
                    status: 'success'

                })
            }else {
                return res.status(400).json({
                  message: "Parent Already exists",
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


exports.parentlogin= async(req,res)=> {
  
    try{
        const schema = Joi.object({
          email: Joi.required(),
          password: Joi.required()
        })

        const parentFields = await schema.validateAsync(req.body);
        let parent = await Parent.findOne({pemail:parentFields.pemail});
        if(parent){
            const isMatch = await bcrypt.compare(parentFields.password, parent.password)
        
        if(isMatch){
            const payload = {
                parent: {
                    id :parent._id
                }
            }
            jwt.sign(payload, config.get('secretKey'), (err, token) => {
                if (err)
                    throw err;
                const loggedparent = { parentid: parent.id,parentname: parent.pname, parentemail: parent.email };

                return res.status(200).json({
                    message: "Logged In succesfully",
                    loggedparent: loggedparent,
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

//list of parents
exports.listofparents = async(req,res)=>{
    try {
        await Parent.find((err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': 'Parent Fetched Successfully', 'listofparents': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//get single parent

exports.singleparent = async(req,res)=>{
   // console.log(req.params.id)
    try {
        await Parent.findById(req.params.id,(err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': `Parent with ${req.params.id} fetched successfully`, 'singleparent': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//update single parent by parent id

exports.updateparent = async (req,res)=>{
    try{
        await Parent.findByIdAndUpdate(req.params.id,{
            $set:{
                pname: req.body.pname,
                pemail:req.body.pemail,
                password:req.body.password,
                cpass:req.body.cpass
            }
        })
        return res.status(200).json({ 'message': 'Parent updated successfully', 'updatedparent':req.body})

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}


exports.deleteparent = async(req,res)=>{
    try{
        await Parent.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'Parent deleted successfully', 'deletedteacher':data})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}