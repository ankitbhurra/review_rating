const companyCreateValSchema = require("../company/companyCreateValSchema");

module.exports = {
  createComapanyValidation: async (req, res, next) => {
    let isValid = await companyCreateValSchema.createCompany.validate(
      req.body,
      {
        isEarly: false,
      }
    );
    if (isValid.error) {
      res.status(403).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
