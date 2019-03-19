const mongoose = require("mongoose"); 
const Schema = mongoose.Schema
const pilotSchema = new Schema({
   name: String, 
   callSign: String, 
   drones: [{type: Schema.Types.ObjectId, ref: "Drone"}]
})


module.exports = mongoose.model("Pilot", pilotSchema)