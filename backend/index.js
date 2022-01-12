import app from "./server.js"
import dotenv from  "dotenv"
import mongodb from "mongodb"
import users from "./Models/user.Model.js"



dotenv.config()

const port = process.env.PORT 

const MongoClient = mongodb.MongoClient

MongoClient.connect(process.env.SRV_DB_SERVER_URI,{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlparser:true
}).catch(err=>{
    console.log(err.stack)
}).then(async client =>{
    await users.injectDB(client)


    app.listen(port,()=>{
        console.log(`Listen server on port http://localhost:${port}`)
    })
})



