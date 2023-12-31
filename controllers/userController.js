const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let userSchema = require("../models/userSchema");
const { transport } = require("../services/emailServices");

let createUser = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(409).json({
        sucess: false,
        message: " User is already registerd with this email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      const filepath = `/uploads/user/${req.file.filename}`;
      userData.profilePic = filepath;
      const user = await userData.save();
      res.status(201).json({
        sucess: true,
        message: "User registerd sucessfully",
        createUser: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: `Error occure ${error.message}`,
    });
  }
};
// for dicrption of password
const userLogIn = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        }); // !jwt = user data ko object me convert krta h
        res.status(200).json({
          success: true,
          message: "User is login sucessfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        sucess: false,
        message: "User is not recoganize with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: `Error occur ${error.message}`,
    });
  }
};
//user send email for password reset API
const sendUserPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset.password/${userData._id}/${token}`;
      let info = await transport.sendMail({
        from: "ankitbhurra1@gmail.com",
        to: userEmail,
        subject: "Email for user reset password",
        html: `<a href=${link}>click to reset`,
      });
      return res.status(200).json({
        success: true,
        message: "Email send sucessfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Please enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Erorr occure ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password update sucessfully",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Password and confirm password dosn't match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Please enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occure : $(error.message)`,
    });
  }
};

module.exports = {
  createUser,
  userLogIn,
  sendUserPasswordEmail,
  resetPassword,
};
