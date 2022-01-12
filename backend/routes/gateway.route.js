import express from "express"


const Router = express.Router()


Router.get("/",(req,res,next)=>{
    res.json("gateway Route")
})


export default Router