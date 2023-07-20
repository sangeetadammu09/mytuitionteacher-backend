const mongoose = require('mongoose');
const parentSchema = mongoose.Schema({
    name : {type:String, required:true},
    email: {type:String, required:true},
    password:{type:String, required:true},
    cpass:{type:String, required:true},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('parentlogin', parentSchema)