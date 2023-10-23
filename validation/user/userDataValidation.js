const { unlinkSync } = require("fs");
const userValSchema = require("./userValSchema");
const userLoginSchema = require("./userValSchema");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    let isValid = await userValSchema.registerUser.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      //req.file ? unlinkSync(req.file.path) : null ;
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  userLoginValidation: async (req, res, next) => {
    let isValid = await userLoginSchema.userLogin.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      //req.file ? unlinkSync(req.file.path) : null ;
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
