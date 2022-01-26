import buildingModel from "../Models/building.Model.js";

export default class BuildingController {
  static async apiGetBuilding(req, res, next) {
    const buildingPerPage = req.query.perPage
      ? parseInt(req.query.perPage, 10)
      : 20;
     
    const companyId = req.query.companyId
    
    
    let response = {}

  
  
    }



} // end of class
