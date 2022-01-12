import moment from "moment";
import mongodb from "mongodb";

let gateways;
export default class GatewayEndPoint {
  static async injectDB(conn) {
    if (gateways) {
      return;
    }

    try {
      gateways = conn.db(process.env.SRV_DB_NS).collection("gatewaylogs");
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

      /*

            if(Array.isArray(gatewayInfo)){
                if(typeof(gatewayInfo)==="array"){
                    const response = await gateways.insertMany(gatewayInfo)
    
                    return response
                }
            } else if(!Array.isArray(gatewayInfo)){

                const response = await gateways.insertOne(gatewayInfo)
                return response

            }

            */
    } catch (e) {
      console.log(`Error Documents ${e}`);
    }
  }

  static async upsertGateway(dataInfo, date, device_no) {
    try {
      const gatewayInfo = {
        device_no: dataInfo.device_no,
        data_istat: dataInfo.data,
        updated_date: date,
      };

      const response = await gateways.update(
        { device_no: device_no },
        gatewayInfo
      );

      return response;
    } catch (e) {
      console.log(`Error Documents ${e}`);
    }
  }
} // end of class
