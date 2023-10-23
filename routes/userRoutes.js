const express = require ("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const { userUpload } = require("../middlewares/userImageStored");
const { registerUserValidation,userLoginValidation,} = require("../validation/user/userDataValidation");

userRouter.post("/reset", userController.sendUserPasswordEmail);
userRouter.post("/login", userLoginValidation, userController.userLogIn);
userRouter.post("/resetpassword/:id/:token", userController.resetPassword);
userRouter.post("/create",userUpload.single("profilePic"),registerUserValidation,userController.createUser);

module.exports = userRouter;
