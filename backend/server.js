import express from "express"
import cors from "cors"
import auth from "./middleware/auth.js"



/// Import Router
import gatewayRouter from "./routes/gateway.route.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

const app = express()

app.use((cors()))
app.use(express.json())


app.use("/api/v2.0/gateway",gatewayRouter)
app.use("/api/v2.0/users",userRouter)
app.use("/api/v2.0/auth",authRouter)
app.use("/api/v2.0/welcome",auth,(req,res)=>{
    let data = req.user
    let Users = req.userInfo
    res.json(data)
})


// Set default Route
app.use("*",(req,res)=> res.status(400).json({error:"not found"}))


export default app






