const config = require ("config");
const mongoose = require ("mongoose");
//console.log(config.get('url'));
const connectDB =async()=>{
    // try{
    //     await mongoose.connect(config.get('url'),{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false},()=>{
    //         console.log('Database Connected Successfully');
            
    //     })

    // }catch(err){
    //           console.log(err.message);
    // }
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
        console.log('DB connected successfully', connect.connection.host, connect.connection.name)
     }catch(err){
         console.error(err);
         process.exit(1);
     }
}


module.exports = connectDB;