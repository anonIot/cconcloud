import moment from "moment";
import mongodb, { ObjectId } from "mongodb";

let gateways;
let gatewaysRealm
let gateway;


export default class GatewayEndPoint {
  static async injectDB(conn) {
    if (gateways) {
      return;
    }

    try {
      gateways = conn.db(process.env.SRV_DB_NS).collection("gatewaylogs");
      gateway = conn.db(process.env.SRV_db_NS).collection("gateway");
      gatewaysRealm = conn.db(process.env.SRV_DB_NS).collection("gatewayreal");
    } catch (e) {
      console.log(`Error Handle ${e}`);
    }
  }

  static async insertGateway(dataInfo) {
    try {
      const gatewayInfo = dataInfo;

      // const response = await gateways.insertMany(gatewayInfo)

      // return response

      if (Array.isArray(gatewayInfo)) {
        const response = await gateways.insertMany(gatewayInfo);

        return response;
      }

      return false;

    } catch (e) {
      console.log(`Error Documents ${e}`);
    }
  }

  static async upsertGateway(filter,dataInfo) {
    try {
      // const gatewayInfo = {
      //   device_no: dataInfo.device_sn,
      //   unit_id: dataInfo.unit_id,
      //   updated_date: new Date(),
      // };

      const response = await gatewaysRealm.updateMany(filter,dataInfo, { upsert: true }
      
      );

      return (response);
    } catch (e) {
      console.log(`Error Documents ${e}`);
    }
  }


  static async gatewayListByCompanyId(company_id=null){

    let query = {
        customer_id:ObjectId(company_id)
    } 


    try {

      const response = await gateway.find(query).toArray()

      return response;

      
    } catch (e) {
      console.log(`Error Documents ${e}`);
      return
    }


  }




} // end of class
