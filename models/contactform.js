const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    contact:{type:Number},
    subject:{type:String},
    message:{type:String},
    creation_dt:{type:Date,default: Date.now}
})


module.exports = mongoose.model('contactModel', contactSchema)