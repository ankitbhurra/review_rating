const joi = require("joi");

const reviewCreateValSchema = {
  createReview: joi
    .object({
      companyReviewSubject: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#lable} should contain at least {#limit} character",
        })
        .required(),
      companyReview: joi
        .string()
        .min(10)
        .max(100)
        .message({
          "string.min": " {#lable} should contain at least {#limit} character ",
        })
        .required(),
      companyReviewRating: joi.number().required(),
    })
    .unknown(true),
};
module.exports = reviewCreateValSchema;
