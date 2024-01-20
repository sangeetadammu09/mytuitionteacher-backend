
const Joi = require('joi');
const SubAdmin = require('../models/subadminModel');

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
