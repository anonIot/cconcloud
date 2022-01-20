import mongodb from "mongodb";
import moment from "moment";
import { Router } from "express";

const ObjectId = mongodb.ObjectId;


let products

export default class ProductModel {
    static async injectDB(conn) {
        if (products) {
          return;
        }
    
        try {
          products = await conn.db(process.env.SRV_DB_NS).collection("gatewayreal");
        } catch (e) {
          console.log(`Error ${e}`);
        }
      } // end of injectDB func



   static async getProductRealm({device,uid}){

    if(device && uid){

        let query = [{
            $match:{device_sn: device}
        },
        {$unwind: "$datainfo"},
        {$match: {
            "datainfo.unit_id": uid,
            
        }},{$project:{device_sn:"$device_sn",unit_id:"$datainfo.unit_id",info:"$datainfo.istat",connection:"$connected"}}]

        let response =[]
         try {
             response = await products.aggregate(query).toArray()

             return response
         } catch (error) {
             return error
         }   



    }
 
   } // end of func   



}
