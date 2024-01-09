//const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {

  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //console.log(token)
    jwt.verify(token, process.env.SECRET_KEY,(err) => {
      
      if (err) {
        res.status(401).json({ error:'User is not authorized'})
      }
      next();
    });

    if (!token){
      res.status(401).json({ error:'User is not authorized or token is missing'})
    }
  }
  if (token == undefined) {
    res.status(401);
   // throw new Error("User is not authorized or token is missing");
   res.json({ error:'Token is missing'})
  }
};

module.exports = validateToken;
