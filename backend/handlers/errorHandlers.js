const catchError = (fn)=>{

    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            if(typeof err==="string"){
                res.status(400).json({
                    message:err
                })
            }else{
                next(err)
            }
        })
    }


}

export default catchError