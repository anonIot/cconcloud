import jwt from "jsonwebtoken"

const config = process.env

const verifyToken = (req,res,next)=>{
    
    //HTTP x-access-token   
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(400).send("A token is required for authentication")
    }



    try {
        const decode = jwt.verify(token,config.SECRET_CODE)

        req.user = decode

        // document.cookie = `token${decode}`


    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    return next();

}


export default verifyToken