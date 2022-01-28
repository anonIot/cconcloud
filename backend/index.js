import app from "./server.js"
import dotenv from  "dotenv"
import mongodb from "mongodb"
import users from "./Models/user.Model.js"
import products from "./Models/product.Model.js"
import building from "./Models/building.Model.js"




import jwt from "jsonwebtoken"

import { Server } from "socket.io";
import http from "http"

const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: '*',
  }
})





dotenv.config()

const port = process.env.PORT 

const MongoClient = mongodb.MongoClient




io.use((socket,next)=>{

  const token = socket.handshake.query.token
  
  const decode = jwt.verify(token,process.env.SECRET_CODE)
  
  socket.userId = decode.user_id
  
  next()
  
  })




MongoClient.connect(process.env.SRV_DB_SERVER_URI,{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlparser:true
}).catch(err=>{
    console.log(err.stack)
}).then(async client =>{
    await users.injectDB(client)
    await products.injectDB(client)
    await building.injectDB(client)

    let device =  "283B96C3015B"
    let uid = "X2.803"

const productList = async ()=> {
  return await products.getProductRealm({device,uid})  
}  



console.log(productList)



// Express + Socket io
io.on('connection',(socket)=>{
  console.log("a user connected userID "+ socket.userId)

  socket.on('disconnect', () => {
      console.log('user disconnected');
    });


    // socket.emit("welcome", "Hello and Welcome to the Server");
   

    setInterval(async ()=>{
      let responseInfo = await productList()


      
      socket.emit("283B96C3015B/L2-803", JSON.stringify(responseInfo));
    },4000)


})


server.listen(port,()=>{
    console.log(`Listen  server on port http://localhost:${port}`)
})





/*    
    
const httpServer =  app.listen(port,()=>{
        console.log(`Listen  server on port http://localhost:${port}`)
    })


    const io = new Server(httpServer, {});
      

      io.on("connection", function (socket) {
        console.log("Made socket connection");

        socket.on("new user", function (data) {
            socket.userId = data;
            activeUsers.add(data);
            io.emit("new user", [...activeUsers]);
          });

          socket.on("disconnect", () => {
            activeUsers.delete(socket.userId);
            io.emit("user disconnected", socket.userId);
          });
        
          socket.on("chat message", function (data) {
            io.emit("chat message", data);
          });
          
          socket.on("typing", function (data) {
            socket.broadcast.emit("typing", data);
          });



      });

*/

})



