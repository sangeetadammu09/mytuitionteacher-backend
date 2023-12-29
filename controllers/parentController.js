const Joi = require('joi');
const bcrypt = require ('bcryptjs');
const Parent = require('../models/Parent');
const ParentLogin = require('../models/Parentlogin');
const jwt = require ('jsonwebtoken');

exports.parentregister = async(req,res)=> {
    try{
         const schema = Joi.object({
             name: Joi.string().required(),
             email: Joi.string().email().required(),
             password: Joi.string().required(),
             cpass: Joi.string().required(),
             isActive :Joi.boolean()
         })
        
         const parentfields = await schema.validateAsync(req.body);
         const salt = await bcrypt.genSalt(10);
         parentfields.password = await bcrypt.hash (parentfields.password, salt);
         
         try{
            let parent= await ParentLogin.findOne({email:parentfields.email})
            console.log(parent,'parent')
            if(!parent){
                parent = new ParentLogin(parentfields);
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
        return res.status(400).json({
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
        let parent = await ParentLogin.findOne({email:parentFields.email});
        if(parent){
            const isMatch = await bcrypt.compare(parentFields.password, parent.password)
        
        if(isMatch){
            const payload = {
                parent: {
                    id :parent._id
                }
            }
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                if (err)
                    throw err;
                const loggedparent = { id: parent.id,name: parent.name, email: parent.email };

                return res.status(200).json({
                    message: "Logged In succesfully",
                    loggedparent: loggedparent,
                    token: token
                });

            })
            
        }else{
            return res.status (400).json({
                message: "wrong username/password",
                status: "failed",
                error: err.message
            })
        }

    }else{
        return res.status (500).json({
            message: "something wnet wrong",
            status: "failed",
            error: err.message
        })
    }
    
    
}catch(err){
    return res.status (400).json({
        message: "Validation error",
        error: err.message
    })
}
}

exports.parentcreate = async(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        location: Joi.string().required(),
        lookingfor: Joi.string().required(),
        grade: Joi.string().required(),
        board: Joi.string().required(),
        subjects: Joi.string().required(),
        details: Joi.optional(),
        modeofteaching: Joi.string().required(),
        days : Joi.string().required(),
        hours: Joi.string().required(),
        time: Joi.string().required(),
        gender: Joi.string().required(),
        budget: Joi.number().required(),
        budgettype: Joi.string().required(),
        document: Joi.optional(),
        //imageUrl: Joi.optional()
    })

    //  console.log(req.body,'request')
       try{
        await schema.validateAsync(req.body);
        let payload = req.body;
        //check if image included in payload
        if(req.file)     
        payload.document =  `Storage/images/${req.file.filename}`;
      //  const userCreate = await User(payload).save();
        await  Parent.create(payload, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Parent created successfully', 'parent': data, 'status':200 });
          })

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

//list of parents
// exports.listofparents = async(req,res)=>{
//     try {
//         await Parent.find((err, data)=>{
//             if(err)throw err
//             data.sort((a,b)=>{
//                 return new Date(b.creation_dt) - new Date(a.creation_dt);
//               });
//             return res.status(200).json({ 'message': 'Parents Fetched Successfully', 'listofparents': data });
            
//         })
       
//     } catch (err) {
//         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
//     }
// }

//list of [arents by page
exports.listofparentsbypage = async(req,res)=>{
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
            await Parent.find({},{},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });
            
                Parent.count({},(count_error, count) => {
                    if (err) {
                      return res.json(count_error);
                    }
                    return res.json({
                      'message': 'Parents Fetched Successfully',
                      total: count,
                      page: pageNo,
                      pageSize: data.length,
                      'listofparents': data,
                      status: 200
                    });
                  });
                
            })
            
        }catch(err){
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
                pemail: req.body.pemail ,
                contact: req.body.contact ,
                location: req.body.location ,
                lookingfor: req.body.lookingfor,
                grade: req.body.grade,
                board: req.body.board,
                subjects: req.body.subjects,
                details: req.body.details,
                modeofteaching: req.body.modeofteaching,
                gender: req.body.gender ,
                budget: req.body.budget,
                budgettype: req.body.budgettype,
                document:req.body.document ,
                idproof:req.body.idproof ,
            }
        })
        return res.status(200).json({ 'message': 'parent updated successfully', 'updatedparent':req.body})

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete single parent
exports.deleteparent = async(req,res)=>{
    try{
        await Parent.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'parent deleted successfully', 'deletedparent':data})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}