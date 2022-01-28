import express from "express"
import buildingCtrl from "../Controllers/building.Controller.js"

const Router = express.Router()

Router.route("/").get(buildingCtrl.apiGetBuilding)

Router.route("/").post((res,req,next)=>{

})

Router.route("/").put((res,req,next)=>{
    
})

Router.route("/").delete((res,req,next)=>{
    
})


export default Router



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token   
 *   schemas:
 *     building:
 *      type: object
 *      required:
 *        - x-access-token     
 *      properties:
 *        _id:
 *          type: sting
 *          description: the auto generate id of  the building
 *        building:
 *          type: string
 *          description: The name a building
 *        info:
 *          type: object
 *          desciption: Floor and room a building
 * 
 *      example:
 *        _id: 23f6yrhdjdl980
 *        building: อาคาร 1
 *        info: {"fl":"1","room":["ห้อง 1","ห้อง 2","ห้อง 3"]}   
 * security:
 *   - ApiKeyAuth: []   
 */

/**
 * @swagger
 * tags:
 *   name: Building
 *   description: Building managing API 
 */

/**
 * @swagger
 * /api/v2.0/building:
 *   get:
 *     security:
*        - ApiKeyAuth: []
 *     summary: Return the list of all the building info
 *     tags: [Building] 
 *     responses:
 *          200:
 *           description: The list of the users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/building'       
 *        
 *  
 */