const express = require("express");
const reviewRouter = express.Router();

let { createReview } = require("../controllers/companyReviewController");
const { companyReviewValidation } = require("../validation/review/reviewDataValidation");

reviewRouter.post("/create",companyReviewValidation, createReview);

module.exports = reviewRouter;
