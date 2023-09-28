const mongoose = require ("mongoose");

const companyReviewSchema = mongoose.Schema ({
    //user id : { type : mongoose.types.objectid} , refrencing ke liye liyaa hai

    companyReviewSubject : {
        type : String ,
        Require : true , 
    },

    companyReview : {
        type : Number,
        require : true ,
    },

    companyReviewRating : {
        type : String ,
        require : true,
    },

    userID : {
        type : mongoose.Types.ObjectId ,
        ref : 'user',
        require : true,
    },
    companyID : {
        type: mongoose.Types.ObjectId,
        ref: "company",
        require : true,
    },
    isActive: {
       type : String,
       default : true,
    },

});
// user of create at and update at
companyReviewSchema.set("timestamps" , true);

module.exports=mongoose.model("review" , companyReviewSchema);
