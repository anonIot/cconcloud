import UserModel from "../Models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthController {
  static async apiPostAuthLogin(req, res, next) {
    const email = req.body.email;

    const password = req.body.password;

    let errorMsg = {};

    if (!email) {
      errorMsg = {
        error: true,
        message: "email is require",
      };

      res.status(500).json(errorMsg);
      return;
    }
    if (!password) {
      errorMsg = {
        error: true,
        message: "email is require",
      };

      res.status(500).json(errorMsg);

      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    let response = {};
    let info = {};

    try {
      const { userInfo, total } = await UserModel.getUserByEmail({ email });

      if (userInfo && (await bcrypt.compare(password, userInfo.password))) {
        const token = jwt.sign(
          {
            user_id: userInfo._id,
            email,
            role: userInfo.role_id,
          },
          process.env.SECRET_CODE,
          { expiresIn: "2h" }
        );

        response = {
          Info: userInfo,
          totalUser: total,
          password: password,
          hashPasword: await bcrypt.compare(password, userInfo.password),
          token: token,
        };
      } else {
        response = {
          error: true,
          message: "email or password is wrong",
        };
      }

      res.status(200).json(response);
    } catch (error) {
      let response = {
        error: true,
        Info: [],
        totalUser: 0,
        message: "your are email or password is wrong!!",
      };

      res.status(400).json(response);
    }
  }

  static async apiPostAuthRegister(req, res, next) {
    const { email, password, name, lastname } = req.body;

    try {
      let userInfo = {};

      if (email) {
        userInfo.email = email.toLowerCase();
      }
      if (name && lastname) {
        userInfo.full_name = name.concat(" ", lastname);
      } 
      
      if (password) {
        userInfo.password = password;
      }

      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: `${error}`,
      });
      return;
    }

    return;
  }
} // end of class
