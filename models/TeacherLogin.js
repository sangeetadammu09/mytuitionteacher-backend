const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    name : {type:String, required:['Name is required']},
    email: {type:String, required:['Email is required']},
    password:{type:String, required:['Password is required']},
    cpass:{type:String, required:['Confirm Password is required']},
    isActive:{type:Boolean, required:true},
},{timestamps:true, versionKey:false})


module.exports = mongoose.model('TeacherLogin', teacherSchema)
