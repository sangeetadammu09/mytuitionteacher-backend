const connectDb = require("./config/db");
const express = require('express');
const dotenv = require('dotenv').config();
//const connection = require('./config/mysqldb')
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 8080;
var app = express();
const errorHandler = require('./middlewares/errorHandler')

const path = require('path');

//routes
var contactRoute = require ('./routes/contactRoute');
const mailRoute = require('./routes/mailRoute')
const parentRoute = require('./routes/parentRoute')
const teacherRoute = require('./routes/teacherRoute')
const superAdminRoute = require('./routes/superadminRoute')
const subAdminRoute = require('./routes/subadminRoute')

//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocs = require("./swagger.json")

//middlewares
app.use(errorHandler)
app.use(express.static('public'));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
})
app.use('/api-docs/helpmetutors',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000, extended:true }));
app.use(cors({origin:'*',credentials:true}));
app.use('/mail', mailRoute);
app.use('/contact', contactRoute);
app.use('/parent',parentRoute)
app.use('/teacher',teacherRoute)
app.use('/superadmin',superAdminRoute)
app.use('/subadmin',subAdminRoute)



//connection to db
connectDb();

//connection to server
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
  //   connection.connect(function(err){
  //     if(err) throw err;
  //     console.log('Database connected!');
  // })
});
