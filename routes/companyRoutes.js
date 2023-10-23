const express = require("express");
const companyRouter = express.Router();

const { companyUpload } = require("../middlewares/companyImage");
const { tokenAuthentication, userAuthentication } = require("../middlewares/authToken");
const { authorizeAdmin } = require("../middlewares/authorization");
const companyController = require("../controllers/companyController");
const {createComapanyValidation} = require("../validation/company/companyDataValidation");

companyRouter.post(
  "/create",
  companyUpload.single("companyPic"),
  tokenAuthentication,
  authorizeAdmin,
  createComapanyValidation,
  companyController.createCompany
);
companyRouter.get("/list", companyController.companyList);
companyRouter.post("/city", companyController.serchCompany);
companyRouter.get("/detail/:id", companyController.companyDetail);

module.exports = companyRouter;
