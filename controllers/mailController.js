var Contact = require ('../models/contactform')
const nodemailer = require('nodemailer');

exports.mailContact = async(req,res)=>{
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: true,
          port: 465,
          auth: {
            user: 'helpmetutors27@gmail.com',
            pass: 'xyhrovwrydfoq'
          }
          });

        var mailOptions = { 
                    from: 'helpmetutors27@gmail.com',
                    to:  'helpmetutors123@gmail.com',

            subject: `Contact details: ${req.body.name}`,
            html:`<h3>New Contact details</h3>
                    <p> Name:${req.body.name} </p><br>
                    <p> Email:${req.body.email} </p><br>
                    <p> Contact:${req.body.contact} </p><br>
                    <p> Subject:${req.body.subject}</p><br>
                    <p> Message:${req.body.message} </p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Sent Successfully')
            }
          });
       try{
        await  Contact.create(req.body, (err,data)=>{
             if(err)throw err
              return res.status(200).json({ 'message': 'Contact mail sent successfully', 'newContact': data, status : 200 });
          })
        

       }catch(err){
        return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
       }
}

// mail parent
exports.mailParent = async(req,res)=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: 'helpmetutors27@gmail.com',
        pass: 'xyhrovwrydfoq'
      }
      });

    var mailOptions = { 
                from: 'helpmetutors27@gmail.com',
                to:  'helpmetutors123@gmail.com',

               subject: `New Parent Registered: ${req.body.pname}`,
                html:`<h3>Parent details</h3>
                <p>Name: ${req.body.pname}</p> 
                <p>Email: ${req.body.pemail}</p>
                <p>Contact:${req.body.contact}</p>
                <p>State:${req.body.state}</p>
                <p>City:${req.body.city}</p>
                <p>Location:${req.body.location}</p>
                <p>Looking for: ${req.body.lookingfor}</p>
                <p>Grade: ${req.body.grade}</p>
                <p>Board: ${req.body.board}</p>
                <p>Subjects: ${req.body.subjects}</p>
                <p>Details:${req.body.details}</p>
                <p>No of days/weekly:${req.body.days}</p>
                <p>No of hours/daily:${req.body.time}</p>
                <p>Mode of Teaching:${req.body.modeofteaching}</p>
                <p>Gender: ${req.body.gender}</p>
                <p>Budget: ${req.body.budget} ${req.body.budgettype}</p>
                <p>Document:${req.body.document}</p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Sent Successfully')
        }
      });
   try{
    await  Contact.create(req.body, (err,data)=>{
         if(err)throw err
          return res.status(200).json({ 'message': 'Parent mail sent successfully', 'newParent': data, status : 200 });
      })
    

   }catch(err){
    return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
   }
}

//mail teacher
exports.mailTeacher = async(req,res)=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: 'helpmetutors27@gmail.com',
        pass: 'xyhrovwrydfoq'
      }
      });
    var mailOptions = { 
                from: 'helpmetutors27@gmail.com',
                to:  'helpmetutors123@gmail.com',

                     subject: `New Teacher Registered: ${req.body.tname}`,
                        html:`<h3>Teacher details</h3>
                        <p>Name: ${req.body.tname}</p> 
                        <p>Email: ${req.body.temail}</p>
                        <p>Contact:${req.body.contact}</p>
                        <p>State:${req.body.state}</p>
                        <p>City:${req.body.city}</p>
                        <p>Location:${req.body.location}</p>
                        <p>Qualification: ${req.body.qualification}</p>
                        <p>Teaching Experience: ${req.body.teachingexp}</p>
                        <p>Mode of Teaching:${req.body.modeofteaching}</p>
                        <p>Specialization:${req.body.subjects}</p>
                        <p>Timing: ${req.body.timing} </p>
                        <p>Have Vehicle: ${req.body.vehicle} </p>
                        <p>Five Preferred Locations: ${req.body.preferredlocation} </p>
                        <p>About: ${req.body.about}</p> 
                        <p>Charge: ${req.body.charge} ${req.body.chargeType}</p>
                        <p>ID Proof: ${req.body.document}</p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Sent Successfully')
        }
      });
   try{
    await  Contact.create(req.body, (err,data)=>{
         if(err)throw err
          return res.status(200).json({ 'message': 'Teacher mail sent successfully', 'newTeacher': data, status : 200 });
      })
    

   }catch(err){
    return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
   }
}

//applied Teacher
exports.appliedTeacher = async(req,res)=>{
 // console.log('applied', req.body)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: 'helpmetutors27@gmail.com',
      pass: 'xyhrovwrydfoq'
    }
    });
  var mailOptions = { 
              from: 'helpmetutors27@gmail.com',
              to:  'helpmetutors123@gmail.com',

                   subject: `Interested Teacher: ${req.body.teacherDetails.tname} interested in ${req.body.appliedFor}`,
                      html:`<h3>Teacher details</h3>
                      <p>Email: ${req.body.teacherDetails.temail}</p>
                      <p>Contact:${req.body.teacherDetails.contact}</p>
                      <p>Location:${req.body.teacherDetails.location}</p>
                      <p>Qualification: ${req.body.teacherDetails.qualification}</p>
                      <p>Teaching Experience: ${req.body.teacherDetails.teachingexp}</p>
                      <p>Mode of Teaching:${req.body.teacherDetails.modeofteaching}</p>
                      <p>Specialization:${req.body.teacherDetails.subjects}</p>
                      <p>Timing: ${req.body.teacherDetails.timing} </p>
                      <p>About: ${req.body.teacherDetails.about}</p> 
                      <p>Charge: ${req.body.teacherDetails.charge} ${req.body.teacherDetails.chargeType}</p>
                      <p>ID Proof: ${req.body.teacherDetails.document}</p>
                      <hr/> 
                      <h5>Respective Parent Details are : ${req.body.parentDetails}</h5>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully')
      }
    });
 try{
  await  Contact.create(req.body, (err,data)=>{
       if(err)throw err
        return res.status(200).json({ 'message': 'Teacher mail sent successfully', 'newTeacher': data, status : 200 });
    })
  

 }catch(err){
  return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
 }
}

