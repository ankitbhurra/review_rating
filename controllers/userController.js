const bcrypt = require ("bcrypt");
let userSchema = require ("../models/userSchema")

let createUser = async (req ,res) => {
   // console.log('Data :',req.body)
    const userData = new userSchema(req.body);
    try{
        const isUserExists = await userSchema.findOne ({
            userEmail : req.body.userEmail
        });
        if(isUserExists){
            res.status (409).json ({
                sucess :false,
                message :" user is already registerd with this email"
            });

        } else {
            const salt = await bcrypt.genSalt(10);
            userData.userPassword = await bcrypt.hash(req.body.userPassword,salt);
            const user = await userData.save ();
            res.status (201).json ( {
                sucess : true ,
                message : "user registerd sucessfully",
                createUser : user,
            });
        }
    } catch (error) {
        res.status (500).json({
            sucess : false ,
            message : `error occure ${error.message}`,
        }) ;
    }
} ;
// for dicrption of password
const userLogIn = async (req ,res) => {
    try{
        const userData = await userSchema.findOne ({
            userEmail:req.body.userEmail,
        }) ;
        if (userData) {
            const hashPassword = await bcrypt.compare(
                req.body.userPassword,
                userData.userPassword
            ) ;
            if (userData && hashPassword) {
                res.status (200).json ({
                    success : true,
                    message : "user is login sucessfully"
                });
            } else {
                res.status(401).json({
                    success : false,
                    message : "invalid email or password",
                });
            }
        } else{
            res.status(403).json({
                sucess :false,
                message : "user is not recoganize with this email"
            });
        }
    } catch (error){
        res.status (500).json ({
            sucess:false,
            message : `Error occur ${error.message}`,
        }) ;
    }
} ;




module.exports = {
    createUser,
    userLogIn
};


