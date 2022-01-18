import express from "express";
import UserCtrl from "../Controllers/user.Controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: sting
 *          description: the auto generate id of  the user
 *        email:
 *          type: string
 *          description: The user email
 *        password:
 *          type: string
 *          desciption: The user password
 * 
 *      example:
 *        id: 23f6yrhdjdl980
 *        email: anon_de@saijodenki.co.th
 *        password: wpx7g4bvwr        
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User managing API 
 */

/**
 * @swagger
 * /api/v2.0/users:
 *   get:
 *     summary: Return the list of all the users
 *     tags: [User] 
 *     responses:
 *          200:
 *           description: The list of the users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/user'       
 *        
 *  
 */






const Router = express.Router();

Router.route("/").get(UserCtrl.apiGetUsers);

Router.route("/info").get(UserCtrl.apiGetUserInfo)

export default Router;
