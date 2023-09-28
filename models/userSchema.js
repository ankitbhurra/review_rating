const mongoose = require ("mongoose");

const userSchema = mongoose.Schema ({
    //user id : { type : mongoose.types.objectid} , refrencing ke liye liyaa hai

    userName : {
        type : String,
        require : true,
    },

    userPhone : {
        type : Number,
        require : true ,
    },

    userEmail : {
        type : String ,
        require : true,
    },

    userPassword : {
        type : String ,
        require : true,
    },
    userCity : {
        type: String,
        require : true,
    },

    userState : {
        type : String,
        require : true,
    },

    userRoal: {
        type : String,
        require : true,
    },

//     profilePic: {
// type : String,
// require : true,
//     },

    isActive: {
       type : String,
       default : true,
    },

});
// user of create at and update at
userSchema.set("timestamps" , true);

module.exports=mongoose.model("user" , userSchema);
