import express from "express"
import cors from "cors"



/// Import Router
import gatewayRouter from "./routes/gateway.route.js"
import userRouter from "./routes/user.route.js"


const app = express()

app.use((cors()))
app.use(express.json())


app.use("/api/v2.0/gateway",gatewayRouter)
app.use("/api/v2.0/users",userRouter)


// Set default Route
app.use("*",(req,res)=> res.status(400).json({error:"not found"}))


export default app






