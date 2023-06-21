
import jwt from 'jsonwebtoken'; //jsonwebtoken module


//function to authenticate incoming request from client
export default function verify (req, res, next) {
    
    //retrieving access token from header
     let Token = req.headers.authorization;
     if (!Token) {
        return res.status(403).send("<h1>Unauthorized Access!</h1><h2>Access token not found</h2>");
    }

     var accessToken;
     if (Token.startsWith("Bearer ")){
        accessToken = Token.substring(7, Token.length);
   } else {
      res.status(403).send();
   }


     let payload;
     //verifying access token 
     try {
         payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
         next(); //middleware function
     }
     catch (e) {
         //catching error
         if(e.name == "TokenExpiredError"){
             res.status(401).send("Access Token Expired");
         } else {
             res.status(403).send("Error. Unauthorized access")
         }
        
     }
}
