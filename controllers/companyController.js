const { model } = require("mongoose");
const companySchema = require("../models/companySchema");
const companyReviewSchema = require("../models/companyReviewSchema");
const { json } = require("express");

module.exports = {
  createCompany: async (req, res) => {
    try {
      const newCompany = new companySchema(req.body);
      newCompany.companyName = req.body.companyName
        .trim()
        .split(" ") // single string ko array me convert kr diya
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(""); // again string me chnge kr diya
      const checkCompany = await companySchema.findOne({
        companyName: req.body.companyName,
      });

      if (checkCompany != null) {
        req.file ? unlinkSync(req.file.path) : null; // agar same name ka user pic uplod krna h
        res.status(409).json({
          success: false,
          message: `This company already exists`,
        });
      } else {
        const filepath = `/uploads/company/${req.file.filename}`;
        newCompany.companyPic = filepath;
        const company = await newCompany.save();
        res.status(201).json({
          success: true,
          message: "Company created",
          addedCompany: company,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure : ${error.message}`,
      });
    }
  },

  companyDetail: async (req, res) => {
    companyID = req.params.id;
    userID = req.params.user;
    try {
      const companyData = await companySchema.findById(req.params.id);
      const reviewDataList = await companyReviewSchema

        .find({ companyID: req.params.id })
        .populate({ path: "userID", select: "userName profilePic" });
      res.status(200).json({
        success: true,
        message: "Review list fetch sucessfully",
        company: companyData,
        reviewList: reviewDataList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Review not found ${error.message}`,
      });
    }
  },

  companyList: async (req, res) => {
    try {
      const showAllCompanies = await companySchema
        .find
        // {},
        //  {companyName : 1,_id:0}
        ();
      const totalCompanies = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "All companies",
        count: totalCompanies,
        companyList: showAllCompanies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure: ${error.message}`,
      });
    }
  },

  serchCompany: async (req, res) => {
    const companyCity = req.body.companyCity;
    try {
      const company = await companySchema.find({
        companyCity: { $regex: `^${companyCity}`, $options: "i" },
      });
      if (company.length > 0) {
        res.status(200).json({
          success: true,
          message: "Company's from search city",
          company: company,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "No company found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure : ${error.message}`,
      });
    }
  },
};
