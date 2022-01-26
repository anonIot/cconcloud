import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let building;

export default class BuildingModel {
    static async injectDB(conn){
        if(building){
            return;
        }

    try {
        building = conn.db(process.env.SRV_DB_NS).collection("building")
    } catch (e) {
        console.log(`ERROR ${e}`)
        
    }

    } // end of injectDB


    static async getBuilding({companyId}){

        if(companyId){
            

        }

    } // end of getBuilding

    static async getBuildingById({buildingId}){

        if(buildingId){
                let query = []
        }

    } // end of getBuildingById


    
} // end of class
