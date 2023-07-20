const mongoose = require('mongoose');

const subadminSchema = mongoose.Schema({
    name : {type:String, required:['Name is required']},
    email: {type:String, required:['Email is required']},
    password:{type:String, required:['Password is required']},
    cpass:{type:String, required:['Password is required']},
    isActive: {type:Boolean, required:['Status is required']}
    
},{timestamps:true})


module.exports = mongoose.model('SubAdmin', subadminSchema)