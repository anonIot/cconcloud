import axios from "axios";
import dotenv from  "dotenv"
import moment from "moment";
import mongodb from "mongodb"
import gatewayModel from "../Models/gateway.enpoint.Model.js"


dotenv.config()

const port = process.env.PORT 

console.log(port)
console.log(process.env.SRV_DB_SERVER_URI)

const MongoClient = mongodb.MongoClient



MongoClient.connect(process.env.SRV_DB_SERVER_URI,{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
}).catch(err=>{
    console.log(err.stack)
}).then( async client=>{
    await gatewayModel.injectDB(client)


    setInterval( async ()=>{
        await gatewayEndPoint()
    },4000)
    
})


const gatewayEndPoint = async ()=>{

    try {

        const url = "http://192.168.11.88:10103/v2.0/device/283B96C3015B"
        const device_sn = "283B96C3015B"



        const data = await endpoint(url)

        /*
        const dataInfo = {
            device_sn:device_sn,
            istat: data.data,
            online:data.rc,
            updated_date: moment().format()
        }
        */



        

        if(data.rc==="OK"){
            const acInfo = data.data
           
            
                // acInfo.map(item=>{
                //     console.log(item)
                // })  
                
            // console.log(acInfo)    


            const acData = []

            acInfo.forEach(element => {
                    // console.log(element)
                    const dataInfo = {
                        device_sn:device_sn,
                        unit_id:element.uid,
                        istat: element,
                        online:data.rc,
                        updated_date: moment().format()
                    }

                    acData.push(dataInfo)
                  
            });

            const display = await gatewayModel.insertGateway(acData)
            console.log(display);


        }    





       

/*
        const deisplay = await gatewayModel.insertGateway(dataInfo)

        console.log(deisplay)
*/


        
    } catch (e) {
        console.log(`Error is ${e}`)
    }

}




const endpoint = async (url) =>{


    try {

        const reponse = await axios.get(url+"/istat").then(res=>{

            // console.log(res.data)
            return res.data
        
        }).catch(err=>{
            console.log(err)
        })
    
        return reponse

        
    } catch (e) {
        console.log(`Handle error ${e.message}`)
    }

    

}



// setInterval(()=>{
//     endpoint()
// },4000)
