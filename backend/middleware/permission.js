
const permission = (req,res,next)=>{

req.user.permission = "Super Admin"

next()

}



export default permission