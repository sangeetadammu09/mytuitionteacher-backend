const mongoose = require('mongoose');

const feedbacSchema = mongoose.Schema({
    parentid: {type:String, required:['Parent Id is required']},
    firstname : {type:String, required:['First Name is required']},
    lastname : {type:String, required:['Last Name is required']},
    email: {type:String, required:['Email is required']},
    contact:{type:String, required:['Contact is required']},
    tuition:{type:String, required:['Tuition is required']},
    teacherid:{type:String, required:['Teacher Id is required']},
    teacher:{type:Object},
    rating:{type:String, required:['Rating is required']},
    comment:{type:String, required:['Comment is required']},
    isActive:{type:Boolean, required:true}
},{timestamps:true, versionKey:false})


module.exports = mongoose.model('Feedback', feedbacSchema);