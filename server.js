const express = require("express");
const app = express(); 

const mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost/airforce", {useNewUrlParser: true})
const db = mongoose.connection; 
db.once("open", () => {
   console.log(`Connected To MongoDB at ${db.host}:${db.port}`);
});

db.on("error", (err) => {
   console.log(`database error:/n${err}`);
}); 

app.use(express.urlencoded({extended:false})); 


app.get("/", (req, res) => {
   res.send("☠️ API locationed at /api")
})

app.use("/api", require("./routes/api")); 









app.listen(3001, () => {
   console.log("server up and running 🇨🇦")
})