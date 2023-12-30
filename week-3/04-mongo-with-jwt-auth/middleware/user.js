const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
// Middleware for handling auth
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const username=req.headers.authorization;
    const words=username.split(" ");
    const token=words[1];

    try{
        const decodedValue=jwt.verify(token,JWT_SECRET);
        if(decodedValue.username){
            req.username=decodedValue.username;
            next();
        }else{
            res.status(403).json({
                msg: "Authentication Failed"
            })
        }
    }catch(e){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }

}
module.exports = userMiddleware;