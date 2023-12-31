const mongoose = require('mongoose');

const parentSchema = mongoose.Schema({
    name : {type:String, required:true},
    email: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    isActive:{type:Boolean, required:true},
},{timestamps:true, versionKey:false})


module.exports = mongoose.model('parentregister', parentSchema);
