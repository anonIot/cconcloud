import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let building;

export default class BuildingModel {
  static async injectDB(conn) {
    if (building) {
      return;
    }

    try {
      building = conn.db(process.env.SRV_DB_NS).collection("building");
    } catch (e) {
      console.log(`ERROR ${e}`);
    }
  } // end of injectDB

  static async getBuilding({ companyId }) {
    let query;
    if (companyId) {
      let response = [];

      query = [
        {
          $match: {
            company_id: new ObjectId(`${companyId}`),
          },
        },
        { $unwind: "$info" },
        { $project: { info: 1, _id: 1, building: "$title" } },
      ];

    //   query = [
    //     {
    //       $match: {
    //         company_id: ObjectId(`${companyId}`),
    //       },
    //     }]


      console.info(query)  


      
      try {
        response = await building.aggregate(query).toArray();
        // const buidingTotal = await building.countDocuments(query)


        // console.log(response)
        // return response

        return { buildingInfo: response };

      } catch (e) {
          console.log(e)
        return { buildingInfo: [], docTotal: 0 };
      }
    }
  } // end of getBuilding

  static async getBuildingById({ buildingId }) {
    if (buildingId) {
      let query = [];
    }
  } // end of getBuildingById
} // end of class
