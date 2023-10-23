const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error ", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
