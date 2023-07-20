const Joi = require('joi');
const RegisteredParents = require('../models/parentprofileModel');


exports.parentcreateprofile = async(req,res)=>{
    const schema = Joi.object({
        pname: Joi.string().required(),
        pemail: Joi.string().email().required(),
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
        document: Joi.optional()
    })
       try{
        const parentprofile = await schema.validateAsync(req.body);
        await  RegisteredParents.create(req.body, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Parent profile created successfully', 'newparent': data, 'status':200 });
          })
        

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

//list of parents
exports.listofparents = async(req,res)=>{
    try {
        await RegisteredParents.find((err, data)=>{
            if(err)throw err
            data.sort((a,b)=>{
                return new Date(b.creation_dt) - new Date(a.creation_dt);
              });
            return res.status(200).json({ 'message': 'Parents Fetched Successfully', 'listofparents': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//list of teaching jobs by page
exports.listofteachingjobsbypage = async(req,res)=>{
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
            await RegisteredParents.find({},{},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });
            
                RegisteredParents.count({},(count_error, count) => {
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
        await RegisteredParents.findById(req.params.id,(err, data)=>{
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
        await RegisteredParents.findByIdAndUpdate(req.params.id,{
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
        await RegisteredParents.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'parent deleted successfully', 'deletedparent':data})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}