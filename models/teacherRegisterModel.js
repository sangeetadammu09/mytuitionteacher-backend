const mongoose = require('mongoose');
const teacherRegisterSchema = mongoose.Schema({
    tname : {type:String, required:['Name is required']},
    temail: {type:String, required:['Email is required']},
    contact:{type:String, required:['Contact is required']},
    state:{type:String, required:['State is required']},
    city:{type:String, required:['City is required']},
    location:{type:String, required:['Location is required']},
    qualification:{type:String, required:['Qualification is required']},
    teachingexp:{type:String, required:['Teaching Exp is required']},
    about:{type:String, required:['About is required']},
    modeofteaching:{type:Array, required:['Mode of teaching is required']},
    timing:{type:String, required:['Timing is required']},
    vehicle:{type:String, required:['Vehicle is required']},
    preferredlocation:{type:String, required:['Preferred Location is required']},
    charge:{type:String, required:['Charge is required']},
    chargeType:{type:String, required:['Charge Type is required']},
    subjects:{type:String, required:['Subjects is required']},
    image:{type:String},
    document:{type:String},
},{timestamps:true})


module.exports = mongoose.model('TeacherProfiles', teacherRegisterSchema)