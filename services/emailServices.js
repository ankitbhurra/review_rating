var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ankitbhurra1@gmail.com",
    pass: "vkqibonmatoyiigw",
  },
});

//send out mail through nodemailer
var mailOption = {
  from: "ankitbhurra1@gmail.com",
  to: "parmarlaxmi260@gmail.com",
  subject: " hello laxmi how are you",
  text: " body part mail",
};

module.exports = {
  transport,
  mailOption,
};
