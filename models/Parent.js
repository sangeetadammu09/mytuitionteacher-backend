const mongoose = require('mongoose');

const parentRegisteredSchema = mongoose.Schema({
    parentid: {type:String},
    name : {type:String, required:['Name is required']},
    email: {type:String, required:['Email is required']},
    contact:{type:String, required:['Contact is required']},
    state:{type:String, required:['State is required']},
    city:{type:String, required:['City is required']},
    location:{type:String, required:['Location is required']},
    lookingfor:{type:String, required:['LookingFor is required']},
    grade:{type:String, required:['Grade is required']},
    board:{type:String, required:['Board is required']},
    subjects:{type:String, required:['Subject is required']},
    details:{type:String},
    modeofteaching:{type:String, required:['Modeofteaching is required']},
    days : {type:String, required:['Days is required']},
    hours: {type:String, required:['Hours is required']},
    time: {type:String, required:['Time is required']},
    gender:{type:String, required:['Gender is required']},
    budget:{type:String, required:['Budget is required']},
    budgettype:{type:String, required:['Budget Type is required']},
    storageurl:{type:String, required:false},
    imageurl: {type:String, required:false},
    isActive:{type:Boolean, required:true}
},{timestamps:true, versionKey:false})


module.exports = mongoose.model('RegisteredParent', parentRegisteredSchema);

