import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";
import mongodb from "mongodb";
import gatewayModel from "../Models/gateway.enpoint.Model.js";

dotenv.config();

const port = process.env.PORT;

console.log(port);
console.log(process.env.SRV_DB_SERVER_URI);

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.SRV_DB_SERVER_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log(err.stack);
  })
  .then(async (client) => {
    await gatewayModel.injectDB(client);

    setInterval(async () => {
      await gatewayEndPoint();
    }, 4000);
  });

const gatewayEndPoint = async () => {
  try {
    const url = "http://192.168.11.88:10103/v2.0/device/283B96C3015B";
    const device_sn = "283B96C3015B";

    const data = await endpoint(url);

    if (data.rc === "OK") {
      const acInfo = data.data;

      // acInfo.map(item=>{
      //     console.log(item)
      // })

      // console.log(acInfo)

      const acData = [];
      let filterUpdate = [];

      acInfo.forEach((element) => {
        // console.log(element)
        const filter = {
          unit_id: element.uid,
        };

        const dataInfo = {
          device_sn: device_sn,
          unit_id: element.uid,
          istat: element,
          online: data.rc,
          updated_date: new Date(),
        };

        filterUpdate.push(filter);

        acData.push(dataInfo);
      });
      const query = {
        device_sn: device_sn,
      };

      let AcInfo = {
        $set: {
          datainfo: acData,
          connected: data.rc,
          update_date: new Date(),
        },
      };

      const display = await gatewayModel.insertGateway(acData);

      const gatewayRealm = await gatewayModel.upsertGateway(query, AcInfo);

      console.log(display);
      console.log(gatewayRealm);
      console.log(new Date(Date.now()).toISOString());
      console.log(moment.utc().format());
      console.log(new Date());
    } else {
      console.info("This block FAIL");
      console.log(data);

      const query = {
        device_sn: device_sn,
      };

      let failInfo = { $set: { connected: data.rc, update_date: new Date() } };

      const gatewayRealm = await gatewayModel.upsertGateway(query, failInfo);

      console.log(gatewayRealm);
    }

    
  } catch (e) {
    console.log(`Error is ${e}`);
  }
};

const endpoint = async (url) => {
  try {
    const response = await axios
      .get(url + "/istat")
      .then((res) => {
        // console.log(res.data)
        return res.data;
      })
      .catch((err) => {
        // console.log(err.errno)
        // console.log(err.code)

        let error_res = {
          err_no: err.errno,
          err_code: err.code,
          rc: "FAIL",
        };

        // console.log(error_res)

        return error_res;
      });

    return response;
  } catch (e) {
    console.log(`Handle error ${e.message}`);
  }
};

