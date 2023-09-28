const express = require ("express");
require("./config/modelconfig")
const app = express();
let userRouter = require ("./routes/userRoutes");
const port = 9000 ;

app.use(express.json())
app.use("/", userRouter);



app.listen(port, () => {
console.log("server is running on port no 9000")
})

