const nodemailer = require('nodemailer');
// const fs = require('fs');
module.exports = (router)=>{

//start of parent route
router.post('/parent',


  (req,res)=>{
    console.log(req.body);
    const output =`
    Name: ${req.body.name} 
    Email: ${req.body.email}
    Password: ${req.body.password}
    Contact:${req.contact}
    Location:${req.body.location}
    Looking for: ${req.body.lookingfor} 
    Grade: ${req.body.grade}
    Subjects: ${req.body.subjects}
    Details:${req.body.details}
    Mode of Teaching:${req.body.modeofteaching}
    Gender: ${req.body.gender} 
    Budget: ${req.body.budget}
    Budget1: ${req.body.budget1}
    Document:${req.body.document}
    `;

 var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'sangeetadammu12@gmail.com',
         pass: 'eshwar#0927'
       }
     });
     
     var mailOptions = { 
       from: 'sangeetadammu12@gmail.com',
       to:  'helpmetutors123@gmail.com',
      
       subject: `New Parent Registered: ${req.body.name}`,
        html:`<h3>Parent details</h3>
        <p>Name: ${req.body.name}</p> 
        <p>Email: ${req.body.email}</p>
        <p>Password: ${req.body.password}</p>
        <p>Contact:${req.body.contact}</p>
        <p>Location:${req.body.location}</p>
        <p>Looking for: ${req.body.lookingfor}</p>
        <p>Grade: ${req.body.grade}</p>
        <p>Subjects: ${req.body.subjects}</p>
        <p>Details:${req.body.details}</p>
        <p>Mode of Teaching:${req.body.modeofteaching}</p>
        <p>Gender: ${req.body.gender}</p>
        <p>Budget: ${req.body.budget}</p>
        <p>Budget1: ${req.body.budget1}</p>
        <p>Document:${req.body.document}</p>`
        
     };
     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
         res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
       }
     });
  

    })
//end of parent route

//start of teacher route

router.post('/teacher',


  (req,res)=>{
    console.log(req.body);
    const output =`
    Name: ${req.body.name} 
    Email: ${req.body.email}
    Password: ${req.body.password}
    Contact:${req.contact}
    Location:${req.body.location}
    About: ${req.body.about} 
    Teaching: ${req.body.teaching}
    Work: ${req.body.work}
    Mode of Teaching:${req.body.modeofteaching}
    Timing: ${req.body.timing} 
    Charge: ${req.body.charge}
    Upload: ${req.body.upload}
    
    `;

 var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'sangeetadammu12@gmail.com',
         pass: 'eshwar#0927'
       }
     });
     
     var mailOptions = { 
       from: 'sangeetadammu12@gmail.com',
       to:  'helpmetutors123@gmail.com',
      
       subject: `New Teacher Registered: ${req.body.name}`,
        html:`<h3>Teacher details</h3>
        <p>Name: ${req.body.name}</p> 
        <p>Email: ${req.body.email}</p>
        <p>Password: ${req.body.password}</p>
        <p>Contact:${req.body.contact}</p>
        <p>Location:${req.body.location}</p>
        <p>About: ${req.body.about}</p> 
        <p>Teaching: ${req.body.teaching}</p>
        <p>Work: ${req.body.work}</p>
        <p>Mode of Teaching:${req.body.modeofteaching}</p>
        <p>Timing: ${req.body.timing} </p>
        <p>Charge: ${req.body.charge}</p>
        <p>Upload: ${req.body.upload}</p>`
        
     };
     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
         res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
       }
     });
  

    })

//end of teacher route
//start of contact route

router.post('/contact',(req,res)=>{
    console.log(req.body);
    const output =`
    Name: ${req.body.name} 
    Email: ${req.body.email}
    Phone: ${req.body.mobile}
    Subject:${req.body.subject}
    Message:${req.body.message}
    
   
   `;

   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sangeetadammu12@gmail.com',
      pass: 'eshwar#0927'
    }
  });
  
        var mailOptions = { 
               from: 'sangeetadammu12@gmail.com',
               to:  'helpmetutors123@gmail.com',

       subject: `Contact details: ${req.body.name}`,
        html:`<h3>New Contact details</h3>
              <p> name:${req.body.name} </p><br>
              <p> email:${req.body.email} </p><br>
              <p> phonenumber:${req.body.phone} </p><br>
              <p>subject:${req.body.subject}</p><br>
              <p> message:${req.body.message} </p>`
     };
     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
         res.send('Sent Successfully')
       }
     });
  

    })


//end of contact route

      
return router;
}
