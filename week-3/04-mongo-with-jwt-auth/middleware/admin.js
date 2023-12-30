const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.authorization;
    const words=username.split(" ");
    const token=words[1];

    try{
        const decodedValue=jwt.verify(token,JWT_SECRET);
        if(decodedValue.username){
            next();
        }else{
            res.status(403).json({
                msg: "Authenticated Failed"
            })
        }
    }catch(e){
        res.status(403).json({
            msg:"Incorrect Inputs"
        })
    }

}

module.exports = adminMiddleware;