const mongoose = require ("mongoose");

const companySchema = mongoose.Schema ({
    //user id : { type : mongoose.types.objectid} , refrencing ke liye liyaa hai

    companyName : {
        type : String ,
        Require : true ,
    },

    comapanyCity : {
        type: String,
        require : true,
    },

    companyLocation : {
        type : String,
        require : true,
    },

    companyPic: {
type : String,
require : true,
    },

    isActive: {
       type : String,
       default : true,
    },

});
// user of create at and update at
companySchema.set("timestamps" , true);

module.exports=mongoose.model("company" , companySchema);
