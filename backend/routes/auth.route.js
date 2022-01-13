import express from "express";
import authCtrl from "../Controllers/auth.Controller.js";


const Router = express.Router();

Router.route("/signin")
  .post(authCtrl.apiPostAuthLogin)

  .put((req, res, next) => {
    res.status(200).json("Update");
  })
  .delete((req, res, next) => {
    res.status(200).json("Delete");
  });

Router.route("/signup").post(authCtrl.apiPostAuthRegister);




export default Router;


/**
 * @swagger
 * components:
 *   schemas:
 *     auth:
 *      type: object
 *      required:
 *       - email
 *       - password
 *       - name
 *       - lastname
 *       - company_id
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generate id of user
 *        email:
 *          type: string
 *          description: The user email
 *        password:
 *          type: tring
 *          description: the user password
 *        name:
 *          type: string
 *          description: The user name
 *        lastname: 
 *          type: string
 *          description: the user lastname
 *        company_id:
 *          type: sting
 *          description: the auto genarate id of company collection
 *      example:
 *        id: 12e5t42FGH5
 *        email: user@examole.com
 *        password: wpx7g4bvwr
 *        name: Anon
 *        lastname: Dechpala
 *        company_id: 25e454Pg9r93l8E456
 * 
 *     signin:
 *      type: object
 *      required:
 *       - email
 *       - password
 *      properties:
 *        email:
 *          type: string
 *          description: The user email
 *        password:
 *          type: tring
 *          description: the user password
 *      example:
 *        email: user@examole.com
 *        password: wpx7g4bvwr
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth managing API 
 */

/**
 * @swagger
 * /api/v2.0/auth/signon:   
 *   post:
 *    summary: Register new user for authentication
 *    tags: [Auth]
 *    responses:
 *        200:
 *         description: new user information for authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/auth'
 *
 * /api/v2.0/auth/signin:
 *   post:
 *     summary:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/signin'  
 * 
 *     responses:
 *         200:
 *          description: user login
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/signin'  
 */
