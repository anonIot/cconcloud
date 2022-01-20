import mongodb from "mongodb";
import moment from "moment";
import { Router } from "express";

const ObjectId = mongodb.ObjectId;

let users;

export default class UserModel {
  static async injectDB(conn) {
    if (users) {
      return;
    }

    try {
      users = await conn.db(process.env.SRV_DB_NS).collection("user");
    } catch (e) {
      console.log(`Error ${e}`);
    }
  } // end of injectDB func

  static async getUsers({ filters = null, page = 0, userPerPage = 20 } = {}) {
    let query;

    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("email" in filters) {
        query = { email: filters["email"] };
      } else if ("company_id" in filters) {
        query = { company_id: ObjectId(filters["company_id"]) };
      }
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`error handle ${e}`);
      return { userList: [], totalUser: 0 };
    }

    const displayCursor = cursor.limit(userPerPage).skip(userPerPage * page);

    try {
      const usersList = await displayCursor.toArray();
      const totalUsers = await users.countDocuments(query);

      return { userList: usersList, totalUser: totalUsers };
    } catch (e) {
      return { userList: [], totalUser: 0 };
    }
  } // end of getUsers


  static async getUserInfo(user_id=null){

     let query = []

     if(user_id){
       query = [{$match:{_id:ObjectId(user_id)}},{$lookup:{
         from:"company",
         localField:"company_id",
         foreignField:"_id",
         as:"company_info"
       }},{$project:{password:0}}]
     }

     try {

      let userInfo = []

    if(query.length > 0){

     
      
      userInfo = await users.aggregate(query).toArray()

      

    }


    return userInfo
      


     } catch (error) {
       console.log(error)
       return false
     }





  }

  static async getUserByEmail({ email = null }) {
    let query;

    if (email) {
      query = { email: email };
    }

    const display = {
      projecttion: {
        _id: 0,
        email: 1,
      },
    };

    let cursor;

    try {
      //   cursor = await users.find(query).limit(1).toArray();
      cursor = await users.findOne(query);
      const totalUser = await users.countDocuments(query);

      return { userInfo: cursor, total: totalUser };
    } catch (e) {
      return { userInfo: [], total: 0 };
      console.log(`${e}`);
    }
  }

  static async postUserRegister(userInfo) {
    try {
      const userData = {
        email: userInfo.email,
        password: userInfo.password,
        full_name: userInfo.full_name,
        company_id: userInfo.company_id,
        role_id: userInfo.role_id,
        status: userInfo.status,
        created_date: userInfo.created_date || new Date(),
        updated_date: userInfo.updated_date || new Date(),
      };

      const response = await users.insertOne(userData);

      return response;
    } catch (error) {
      return false;
    }
  } // end of postUserRegister func
} // end of class
