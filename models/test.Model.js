const mongoose = require('mongoose');
const testSchema = mongoose.Schema({
    name : {type:String, required:true},
    address: {type:String, required:true},
    age:{type:String, required:true},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('test', testSchema)