import moment from "moment";
import userModel from "../Models/user.Model.js";

export default class UserController {
  static async apiGetUsers(req, res, next) {
    const userPerPage = req.query.userPerPage
      ? parseInt(req.query.userPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};

    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.email) {
      filters.email = req.query.email;
    } else if (req.query.company_id) {
      filters.company_id = req.query.company_id;
    }

    let response = {};

    try {
      const { userList, totalUser } = await userModel.getUsers({
        filters,
        page,
        userPerPage,
      });

      response = {
        users: userList,
        page: page,
        totalUser: totalUser,
        filters: filters,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  } // end of apiGetUsers dunc

  static async apiGetUserInfo(req, res, next) {


    let userId

    // console.log(req.user)

    if (req.user) {
        userId = req.user.user_id     
    }


    try {
          
      const userInfo = await userModel.getUserInfo(userId)


      res.status(200).json({user_Info:userInfo})

    } catch (error) {

      res.status(500).json(error)
      
    }





  }
// End of apiGetuserInfo func









} // end of class
