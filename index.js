require("dotenv").config();
const express = require("express");
require("./config/modelconfig");
const app = express();

//importing require library for cron job
const cron = require("node-cron");
const port = 9000;
// email token sending ( const {transport, mailOption} = require("./services/emailServices"))
const { transport, mailOption } = require("./services/emailServices");
const commonRouter = require("./routes/mainRoutes");

const PORT = process.env.PORT || 9000;
const HOST = "localhost";

app.use(express.json());
app.use("/", commonRouter);

//below api for email sending
app.get("/send", async (req, res) => {
  transport.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent succesfully" + info.response);
    }
  });
});
//above api for email sending
// // below API for shedule cron job (automated massage)
//  cron.schedule("*/1 * * * * *" , function(){
//    console.log("running a task in every 10second")
// });
// // above API for shedule cron job (automated massage)

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : http://${HOST}:${PORT}`);
});
