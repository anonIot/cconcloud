import express from "express"
import cors from "cors"
import auth from "./middleware/auth.js"

//Swagger
// import someObject from './swagger.json'
import { readFile } from "fs/promises";
const swaggerDocument = JSON.parse(await readFile("./swagger.json"));
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"


const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Library API",
            version:"2.0.0",
            description:"Saijo Denki SRV Centralized Control Open API"
        },
        servers:[{
            url:`http://localhost:5000`
        }]
    },      // <-----
    apis: ['./routes/*.js'],
  };


const space = swaggerJsDoc(options)


/// Import Router
import gatewayRouter from "./routes/gateway.route.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import productRouter from "./routes/product.route.js"

const app = express()


const optionsCors = {

}
app.use(cors())
app.options('*', cors())

app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"))

app.use("/api/v2.0/gateway",gatewayRouter)
app.use("/api/v2.0/users",auth,userRouter)
app.use("/api/v2.0/auth",authRouter)
app.use("/api/v2.0/welcome",auth,(req,res)=>{
    let data = req.user
    let Users = req.userInfo
    res.json(data)
})
app.use("/api/v2.0/product",productRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(space));

// Set default Route
// app.use("*",(req,res)=> res.status(400).json({error:"not found"}))

app.use("/",(req,res)=>{
    res.send({response:"i am alive"}).status(200)
})



export default app






