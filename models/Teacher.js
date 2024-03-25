const mongoose = require('mongoose');
const teacherRegisterSchema = mongoose.Schema({
    name : {type:String, required:['Name is required']},
    email: {type:String, required:['Email is required']},
    contact:{type:String, required:['Contact is required']},
    state:{type:String, required:['State is required']},
    city:{type:String, required:['City is required']},
    location:{type:String, required:['Location is required']},
    qualification:{type:String, required:['Qualification is required']},
    teachingexp:{type:String, required:['Teaching Exp is required']},
    about:{type:String, required:['About is required']},
    modeofteaching:{type:String, required:['Mode of teaching is required']},
    timing:{type:String, required:['Timing is required']},
    vehicle:{type:String, required:['Vehicle is required']},
    preferredlocation:{type:String, required:['Preferred Location is required']},
    charge:{type:String, required:['Charge is required']},
    chargeType:{type:String, required:['Charge Type is required']},
    subjects:{type:String, required:['Subjects is required']},
    storageurl:{type:String, required:false}, 
    imageurl: {type:String, required:false},
    isActive:{type:Boolean, required:true},
    isVerified:{type:Boolean, required:false}, 
},{timestamps:true,versionKey:false})


module.exports = mongoose.model('RegisteredTeacher', teacherRegisterSchema)