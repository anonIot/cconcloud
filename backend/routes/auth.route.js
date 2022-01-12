import express from "express"
import authCtrl from "../Controllers/auth.Controller.js"


const Router = express.Router()

Router.route('/').post(authCtrl.apiPostAuthLogin).get((req,res,next)=>{

  
        res.status(200).json("Register")

})






export default Router