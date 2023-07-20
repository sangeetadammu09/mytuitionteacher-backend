

// var ObjectId = require('mongoose').Types.ObjectId;

// router.get('/',(req,res) => {

//     Contact.find((err,docs)=>{
//         if(!err){res.send(docs);}
//         else {console.log('Error in Retriving Contact:'+ JSON.stringify(err, undefined,2));}

//     });
// });


// router.get('/:id',(req,res) => {

//     if(!ObjectId.isValid(req.params.id))
//      return res.status(400).send(`No record found with given id:${req.params.id}`);

//     Contact.findById(req.params.id,(err,docs)=>{
//         if(!err){res.send(docs);}
//         else {console.log('Error in Retriving Contact:'+ JSON.stringify(err, undefined,2));}

//     });
// });

// router.post('/',(req,res) => {
//     var contact = new Contact ({
//         name: req.body.name,
//         email:req.body.email,
//         phone:req.body.phone,
//         subject:req.body.subject,
//         message:req.body.message,
     

//     });
//     contact.save((err,docs)=> {
//         if(!err){res.send(docs)}
//         else {console.log('Error in Saving Contact:'+ JSON.stringify(err, undefined,2));}

//     });

// });

// router.put('/:id',(req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record found with given id:${req.params.id}`);

//     var contact = {
//         name: req.body.name,
//         email:req.body.email,
//         phone:req.body.phone,
//         subject:req.body.subject,
//         message:req.body.message,

//     };
//     Contact.findByIdAndUpdate(req.params.id, {$set:emp},{new:true}, (err,doc) => {
//         if(!err){res.send(doc);}
//         else {console.log('Error in Updating Contact:'+ JSON.stringify(err, undefined,2));}
//     })
    
// });

// router.put('/:id',(req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record found with given id:${req.params.id}`);

//     var contact = {
//         name: req.body.name,
//         email:req.body.email,
//         phone:req.body.phone,
//         subject:req.body.subject,
//         message:req.body.message,

//     };
//     Contact.findByIdAndUpdate(req.params.id, {$set:emp},{new:true}, (err,doc) => {
//         if(!err){res.send(doc);}
//         else {console.log('Error in Updating Contact:'+ JSON.stringify(err, undefined,2));}
//     });
    
// });

// router.delete('/:id',(req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record found with given id:${req.params.id}`);

    
//     Contact.findByIdAndRemove(req.params.id,(err,doc) => {
//         if(!err){res.send(doc);}
//         else {console.log('Error in deleting Contact:'+ JSON.stringify(err, undefined,2));}
//     });
    
// });



// module.exports = router;


const Joi = require('joi');
const express = require ('express');
var Contact = require ('../models/contactform')


exports.createContact = async(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required(),
        
    })
       try{
        await schema.validateAsync(req.body);
        await  Contact.create(req.body, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Contact created successfully', 'newContact': data, status : 200 });
          })
        

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}
