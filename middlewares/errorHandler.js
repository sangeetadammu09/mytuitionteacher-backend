const { constants} = require('../constants');
const errorHandler = (err,req,res,next) => {
   const statusCode = res.statusCode ? res.statusCode : 500;
   switch(statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation Error", message: err.message, stackTrace : err.stack})
    
    case constants.NOT_FOUND:
        res.json({title:"Not found", message: err.message, stackTrace : err.stack})

    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized Error", message: err.message, stackTrace : err.stack})
    
    case constants.FORBIDDEN:
        res.json({title:"Forbidden", message: err.message, stackTrace : err.stack})
    
    case constants.SERVER_ERROR:
        res.json({title:"Serve Error", message: err.message, stackTrace : err.stack})
    default:
        console.log('All Good, No error found')
    break;

   }
   

}

module.exports = errorHandler;