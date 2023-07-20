const mongoose = require('mongoose');
const parentprofileSchema = mongoose.Schema({
    pname : {type:String, required:true},
    pemail: {type:String, required:true},
    contact:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    location:{type:String, required:true},
    lookingfor:{type:String, required:true},
    grade:{type:String, required:true},
    board:{type:String, required:true},
    subjects:{type:String, required:true},
    details:{type:String},
    modeofteaching:{type:String, required:true},
    days : {type:String, required:true},
    hours: {type:String, required:true},
    time: {type:String, required:true},
    gender:{type:String, required:true},
    budget:{type:String, required:true},
    budgettype:{type:String, required:true},
    document:{type:String},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('parentprofile', parentprofileSchema)