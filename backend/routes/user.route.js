import express from "express"
import UserCtrl from "../Controllers/user.Controller.js"


const Router = express.Router()

Router.route("/").get(UserCtrl.apiGetUsers)


export default Router