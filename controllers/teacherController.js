const Joi = require('joi');
const RegisteredTeacher = require('../models/Teacher');
const TeacherHistory = require('../models/teacherHistoryModel')


exports.createteacher = async(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        location: Joi.string().required(),
        about: Joi.string().required(),
        teachingexp: Joi.string().required(),
        subjects: Joi.string().required(),
        qualification: Joi.string().required(),
        modeofteaching: Joi.string().required(),
        timing: Joi.string().required(),
        vehicle: Joi.string().required(),
        preferredlocation: Joi.optional(),
        charge: Joi.string().required(),
        chargeType: Joi.string().required(),
        isActive :Joi.boolean().required(),
        storageurl: Joi.optional(), 
        imageurl:  Joi.optional(),
    })
       try{
        await schema.validateAsync(req.body);
        let payload = req.body;
        //check if image included in payload
        if(req.file)     
        payload.storageurl =  `Storage/images/${req.file.filename}`;
        await  RegisteredTeacher.create(payload, (err,data)=>{
            if(err)throw err
             return res.status(200).json({ 'Status':200, 'message': 'Teacher profile created successfully', 'newteacher': data , status : 200});
         })
       
       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

//list of teachers
// exports.listofteachers = async(req,res)=>{
//     try {
//         await RegisteredTeacher.find((err, data)=>{
//             if(err)throw err
//             data.sort((a,b)=>{
//                 return new Date(b.creation_dt) - new Date(a.creation_dt);
//               });
//             return res.status(200).json({ 'message': 'Teachers Fetched Successfully', 'listofteachers': data, status : 200});
            
//         })
       
//     } catch (err) {
//         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
//     }
// }

//list of teachers by page
exports.listofteachersbypage = async(req,res)=>{
       var pageNo = parseInt(req.body.startNumber)
        var size = parseInt(req.body.pageSize)
        var query = {}
        if(pageNo < 0 || pageNo === 0) {
                response = {"error" : true,"message" : "invalid page number, should start with 1"};
                return res.json(response)
        }
        query.skip = size * (pageNo - 1)
        query.limit = size
        console.log(query,'query')
    try {
        await RegisteredTeacher.find({},{},query,(err, data)=>{
            if(err)throw err
            data.sort((a,b)=>{
                return new Date(b.creation_dt) - new Date(a.creation_dt);
            });
            data.forEach(x => {
                if(x.storageurl !== ''){
                var getImageName = x.storageurl.match(/\/([^\/?#]+)[^\/]*$/);
                let url = `http://localhost:8080/uploads/${getImageName[1]}`;
                x.imageurl = url;
                }
            })

            RegisteredTeacher.count({},(count_error, count) => {
                if (err) {
                  return res.json(count_error);
                }
                return res.json({
                  'message': 'Teachers Fetched Successfully',
                  total: count,
                  page: pageNo,
                  pageSize: data.length,
                  'listofteachers': data,
                  status : 200
                });
              });
            // return res.status(200).json({ 'message': 'Teachers Fetched Successfully By Pagination',
            //  'listofteachers': data, totalCount: data.length, status : 200});
            
        })
       
    }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//get single teacher
exports.singleteacher = async(req,res)=>{
   // console.log(req.params.id)
    try {
        await RegisteredTeacher.findById(req.params._id,(err, data)=>{
            if(err)throw err
            return res.status(200).json({ 'message': `Teacher with ${req.params.id} fetched successfully`, 'singleteacher': data });
            
        })
       
    } catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//update single teacher by teacher id
exports.updateteacher = async (req,res)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        location: Joi.string().required(),
        about: Joi.string().required(),
        teachingexp: Joi.string().required(),
        subjects: Joi.string().required(),
        qualification: Joi.string().required(),
        modeofteaching: Joi.string().required(),
        timing: Joi.string().required(),
        vehicle: Joi.string().required(),
        preferredlocation: Joi.optional(),
        charge: Joi.string().required(),
        chargeType: Joi.string().required(),
        isActive :Joi.boolean().required(),
        storageurl: Joi.optional(), 
        imageurl:  Joi.optional(),
    })

    await schema.validateAsync(req.body);
    
    const id = req.params.id;
    let payload = req.body;
     
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
        const tInfo = await RegisteredTeacher.findById(id);
        
        if(!tInfo){
               res.status(422);
               throw new Error('Teacher not found')
        }
         else{
             const data = await RegisteredTeacher.findByIdAndUpdate( req.params.id,payload,{new:true})
             return res.status(200).json({ 'message': 'Teacher updated successfully', 'updatedteacher':data});
         }
        

    }catch (err) {
        console.log(err,'error')
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//delete single teacher
exports.deleteteacher = async(req,res)=>{
    try{
        await RegisteredTeacher.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err)throw err
            return res.status(200).json({'message':'Teacher deleted successfully', 'deletedteacher':data, status:200})
        })

    }catch (err) {
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
    }
}

//find teacher
exports.appliedteacher = async(req,res)=>{
     try {
         await RegisteredTeacher.findOne({ temail: req.body.email },(err, data)=>{
             if(err)throw err
             //if a user was not found
             if(!data){
                return res.status(201).json({ 'message': `${req.body.email} is not found.`, status:204 });
              //  return next(err);
               
           }else{
                //teacher found
                //console.log('teacher found',data)
                var teacherApplied ={};
                teacherApplied.teacherDetails = data;
                teacherApplied.tId = data._id;
                teacherApplied.appliedJobs = [];
                teacherApplied.appliedJobs.push({'jobId':req.body.jobId});
            //    console.log("Teacher applied", teacherApplied);
                TeacherHistory.findOne({ tId : data._id },(err,data)=>{
                   console.log(data,'data')
                   if(err)throw err
                   if(!data){
                      TeacherHistory.create(teacherApplied, (err,data)=>{
                       if(err)throw err
                       console.log('appliedteachernew',data)
                       return res.status(200).json({ 'message': `Teacher with ${req.body.email} applied successfully`,'appliedteacher':data, status:200 });
                        })
                   }else{
                    console.log('appliedteacherold',data)
                       data.appliedJobs.push({'jobId':req.body.jobId});
                       data.save();
                       console.log('appliedteacherold',data)
                       return res.status(200).json({ 'message': `Teacher with ${req.body.email} applied  successfully`,'appliedteacher':data, status:200 });           
                   }
                   
                })
           }
             
         })
        
     }catch(err) {
         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
     }
}

//check Phone and Email Validation
exports.checkPhoneandEmailValidation = async(req,res)=>{
    console.log(req.params.value)
     try {
        let value = req.params.value;
         await RegisteredTeacher.find(value.includes('@') ? {email: value} : {contact : value},(err, data)=>{
             if(err)throw err
             return res.status(409).json({ 'message': `Teacher with ${req.params.val} already exists`});
             
         })
        
     } catch (err) {
         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
     }
 }


//filter registered teacher
exports.searchTeacher = async(req,res)=>{
   //  console.log('request',req.body)// tname,qualification,state,city,subjects,modeofteaching
     let filterCond = {};

        if (req.body.tname) {
            filterCond.tname = { $regex: req.body.tname };
        }
        if (req.body.qualification) {
            filterCond.qualification = { $regex: req.body.qualification };
        }
        if(req.body.state) {
            filterCond.state =  { $regex: req.body.state};
        }
        if(req.body.city) {
            filterCond.city =  { $regex: req.body.city};
        }
        if(req.body.subjects) {
            filterCond.subjects =  { $regex: req.body.subjects};
        }
        if(req.body.modeofteaching) {
            filterCond.modeofteaching =  { $regex: req.body.modeofteaching};
        }

     try {
         await RegisteredTeacher.find({"$or":[filterCond]},(err, data)=>{
           // console.log(data,'data')
             if(err)throw err
            data.sort((a,b)=>{
                    return new Date(b.creation_dt) - new Date(a.creation_dt);
                  });
             //if no teacher found
             if (!data) {
                  return res.status(201).json({ 'message': `No data found`, 'filteredteachers': data, status:201 });
                //  return next(err);
                 
             } else {
                 //teachers found
                 return res.status(200).json({ 'message': `Teachers are filtered successfully`, 'filteredteachers': data, status:200 });
             }
         })
        
     } catch (err) {
         return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
     }
 }
