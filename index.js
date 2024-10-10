const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT; 

const routes = require("./routes/route.js");

require("./config/database").dbConnect();

// Background job
require('./jobs/fetchPrice.js'); 



//add middleware
app.use(express.json());


//Mounting
app.use("/api",routes);

//default route
app.get("/",(req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running........ "
    })
})
 
app.listen(PORT, () => {
    console.log(`App is listening at port no ${PORT}`);
})

