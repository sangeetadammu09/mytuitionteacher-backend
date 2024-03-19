const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstname : {type:String, required:['First Name is required']},
    lastname : {type:String, required:['Last Name is required']},
    email: {type:String, required:['Email is required']},
    mobile: {type:String, required:['Mobile is required']},
    location: {type:String, required:['Location is required']},
    password:{type:String, required:['Password is required']},
    cpass:{type:String, required:['Confirm Password is required']},
    role: {type:String, required:['Role is required']},
    sociallinks: {type:String, required:['Social Link is required']},
    storageurl:{type:String, required:false}, 
    imageurl: {type:String, required:false},
    islocationassigned : {type:Boolean, required:true},
    locationassignednames : {type:String},
    isActive:{type:Boolean, required:true},
    
},{timestamps:true})


module.exports = mongoose.model('admin', adminSchema)