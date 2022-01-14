import moment from "moment";
import mongodb from "mongodb";

let gateways;
let gatewaysRealm


export default class GatewayEndPoint {
  static async injectDB(conn) {
    if (gateways) {
      return;
    }

    try {
      gateways = conn.db(process.env.SRV_DB_NS).collection("gatewaylogs");
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
} // end of class
