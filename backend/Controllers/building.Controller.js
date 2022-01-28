import buildingModel from "../Models/building.Model.js";

export default class BuildingController {
  static async apiGetBuilding(req, res, next) {
    const buildingPerPage = req.query.perPage
      ? parseInt(req.query.perPage, 10)
      : 20;
     
    const companyId = req.user.companyId
    

      console.log(req.user)
    
    let response = {}


    try {
      
      if(companyId){

        const {buildingInfo} = await buildingModel.getBuilding({companyId})

        response = {
          message:"Success",
          data:buildingInfo

        }

      }




      res.status(200).json(response)

    } catch (e) {
      res.status(500).json({error:error})
    }

  
  
    }



} // end of class
