const mongoose = require('mongoose');

const commonSchema = mongoose.Schema({
    firstname : {type:String, required:true},
    lastname : {type:String, required:true},
    email: {type:String, required:true},
    mobile: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    role: {type:String, required:true},
    isActive:{type:Boolean, required:true},
},{timestamps:true, versionKey:false})


module.exports = mongoose.model('Common', commonSchema);