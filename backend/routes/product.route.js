import express from "express"


const Router = express.Router()





Router.route("/").get((req,res,next)=>{

    res.send("Get product All")

})
Router.route("/:id").get((req,res,next)=>{

    res.send("Get product by Id"+ req.query._id)
})
Router.route("/").post((req,res,next)=>{

    res.send("Post new product")
})
Router.route("/:id").put((req,res,next)=>{
    res.send("Put Update product by Id")
})
Router.route("/:id").delete((req,res,next)=>{
    
    res.send("Delete product by Id")
})




export default Router