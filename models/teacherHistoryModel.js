const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    teacherDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RegisteredTeacher'
      },
    tId:{type:String},
    appliedJobs : {type:Array},
},{timestamps:true})


module.exports = mongoose.model('TeacherHistory', teacherSchema)