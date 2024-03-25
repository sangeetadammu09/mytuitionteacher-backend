const Joi = require('joi');
const Parent = require('../models/Parent');
//const TeacherHistory = require('../models/teacherHistoryModel')

exports.parentcreate = async(req,res)=>{
    const schema = Joi.object({
        parentid: Joi.string().required(),
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
        isActive :Joi.boolean().required(),
        status: Joi.optional(),
        isTeacherAssigned: Joi.optional(),
        teachersApplied : Joi.optional(),
        storageurl: Joi.optional(),
        imageurl: Joi.optional()
    })
       try{
        await schema.validateAsync(req.body);
        let payload = req.body;
        //check if image included in payload
        if(req.file)     
        payload.storageurl =  `Storage/images/${req.file.filename}`;
        await  Parent.create(payload, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Parent created successfully', 'data': data, 'status':200 });
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


//list of parents by page
exports.listoftuitions = async(req,res)=>{
    var pageNo = parseInt(req.body.startNumber)
     var size = parseInt(req.body.pageSize)
     var query = {}
     if(pageNo < 0 || pageNo === 0) {
             response = {"error" : true,"message" : "invalid page number, should start with 1"};
             return res.json(response)
     }
     query.skip = size * (pageNo - 1)
     query.limit = size;

        try {
            await Parent.find({},{},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });

                data.forEach(x => {
                if(x.storageurl){
                var getImageName = x.storageurl.match(/\/([^\/?#]+)[^\/]*$/);
                let url = `http://localhost:8080/uploads/${getImageName[1]}`;
                x.imageurl = url;
                }
                })
            
                Parent.countDocuments({},(count_error, count) => {
                    if (err) {
                      return res.json(count_error);
                    }
                    return res.json({
                      'message': 'Parents Fetched Successfully',
                      total: count,
                      page: pageNo,
                      pageSize: data.length,
                      'data': data,
                      status: 200
                    });
                  });
                
            })
            
        }catch(err){
            return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
        }
}

//list of tutions by parent id
exports.tuitionlistbyid = async(req,res)=>{
    var pageNo = parseInt(req.body.startNumber)
     var size = parseInt(req.body.pageSize)
     var query = {}
     if(pageNo < 0 || pageNo === 0) {
             response = {"error" : true,"message" : "invalid page number, should start with 1"};
             return res.json(response)
     }
     query.skip = size * (pageNo - 1)
     query.limit = size;
     let reqparams = {parentid: req.params.id};
    // query.parentid = req.params.parentid;
        try {
            await Parent.find(reqparams, {},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });
                
                data.forEach(x => {
                if(x.storageurl){
                var getImageName = x.storageurl.match(/\/([^\/?#]+)[^\/]*$/);
                let url = `http://localhost:8080/uploads/${getImageName[1]}`;
                x.imageurl = url;
                }
                })
            
                Parent.countDocuments({},(count_error, count) => {
                    if (err) {
                      return res.json(count_error);
                    }
                    return res.json({
                      'message': 'Parents Fetched Successfully',
                      total: count,
                      page: pageNo,
                      pageSize: data.length,
                      'data': data,
                      status: 200
                    });
                  });
                
            })
            
        }catch(err){
            return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
        }
}

//filter registered teacher
exports.search = async(req,res)=>{
     // console.log('request',req.body);
        let payload = req.body.filterCondition;
        var pageNo = parseInt(req.body.startNumber)
        var size = parseInt(req.body.pageSize)
        var query = {}
        if(pageNo < 0 || pageNo === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
        }
        query.skip = size * (pageNo - 1)
        query.limit = size;

      let filterCond = {};
      let arr = [];
        arr.push(payload);
        for (let x in payload) {
                if (payload[x]) {
                    filterCond[x] = { $regex: payload[x] };
                }
        }
    
         try {
            await Parent.find({"$or":[filterCond]}, {},query,(err, data)=>{
                if(err)throw err
                data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                });
                
                data.forEach(x => {
                if(x.storageurl){
                var getImageName = x.storageurl.match(/\/([^\/?#]+)[^\/]*$/);
                let url = `http://localhost:8080/uploads/${getImageName[1]}`;
                x.imageurl = url;
                }
                })
            
                Parent.countDocuments({"$or":[filterCond]},(count_error, count) => {
                    if (err) {
                      return res.json(count_error);
                    }
                    return res.json({
                      total: count,
                      page: pageNo,
                      pageSize: data.length,
                      'data': data,
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

//update parent by parent id
exports.updateparent = async (req,res)=>{
    const schema = Joi.object({
        parentid: Joi.string().required(),
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
        isActive :Joi.boolean().required(),
        status: Joi.optional(),
        isTeacherAssigned: Joi.optional(),
        teachersApplied : Joi.optional(),
        storageurl: Joi.optional(),
        imageurl: Joi.optional()
    })

    await schema.validateAsync(req.body);
    
    const id = req.params.id;
    let payload = req.body;
    console.log(payload)
     
     //check if image included in payload
     var storageUrl = '';
     if(req.file){
       let storageUrl = `Storage/images/${req.file.filename}`;
       payload.storageurl = storageUrl;
     
        var getImageName = payload.storageurl.match(/\/([^\/?#]+)[^\/]*$/);
        let url = `http://localhost:8080/uploads/${getImageName[1]}`;
        payload.imageurl = url;
     
     }
    try{
        const pInfo = await Parent.findById(id);
        
        if(!pInfo){
               res.status(404);
               throw new Error('Parent not found')
        }
         else{
             const data = await Parent.findByIdAndUpdate( req.params.id,payload,{new:true})
             return res.status(200).json({ "status": 200, 'message': 'parent updated successfully', 'data':data});
         }
       

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete parent
exports.deleteparent = async(req,res)=>{
    try{
        await Parent.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({status : 200, 'message':'parent deleted successfully',})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//check Phone and Email Validation
exports.checkPhoneandEmailValidation = async(req,res)=>{
    // console.log(req.params.id)
     try {
         await Parent.findOne(req.params._id,(err, data)=>{
             if(err)throw err
             return res.status(200).json({ 'message': `Parent with ${req.params.id} already exists`});
             
         })
        
     } catch (err) {
         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
     }
 }