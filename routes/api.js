const express = require("express");
const router = express.Router(); 
const Pilot = require("../models/pilot"); 
const Drone = require("../models/drone");




//GET /pilots = Get ALL pilots 
router.get("/pilots", (req, res) => {
   Pilot.find({}, (err, pilots) => {
      res.json(pilots)
   });
});


//Get /pilots/:id = Get one pilot
router.get("/pilots/:id", (req, res) => {
   Pilot.findById(req.params.id).populate("drones").exec((err, pilot) => {
      res.json(pilot)
   });
});

//POST /pilots = Create a pilot 
router.post("/pilots", (req, res) => {
   let pilot = new Pilot ({
      name: req.body.name,
      callSign: req.body.callSign
   });
   pilot.save((err, doc) => {
      res.status(201).json(doc)
   });
}); 




//PUT /pilots/:id = Update one Pilot
// router.put("/pilots/:id", (req, res) => {
//    Pilot.findByIdAndUpdate(req.params.id, {$set: {
//       name:req.body.name,
//       callSign: req.body.callSign
//    }}, (err, pilot) => {
//       pilot.save( () => {
//          res.json(pilot)
//       })
//    })
// })


//PUT /pilots/:id = update one pilot
router.put("/pilots/:id", (req, res) => {
   Pilot.findByIdAndUpdate(req.params.id, {
      name:req.body.name,
      callSign:req.body.callSign
   },  {
      new: true
   }, (err, pilot) => {
      res.status(203).json(pilot)
   });
});


// req.body: holds your form Data
// req.params: holds your route data. 


//GET /pilots/:pid/drones = Get all drones asscoaited with a given pilot 
router.get("/pilots/:pid/drones", (req, res) => {
   Pilot.findById(req.params.pid).populate("drones").exec((err, pilot)=> {
      res.json(pilot.drones)
   });
});



//GET /pilots/:pid/drones/:did = Get ONE drone assoacited with a pilot 
router.get("./pilots/:pid/drones:/did", (req, res) => {
   Drone.findById(req.params.did, (err, drone) => {
      res.status(200).json(drone)
   });
}); 


//POST /pilots/:pid/drones = Create a new drone for that pilot 
router.post("/pilots/:pid/drones", (req, res) => {
   Pilot.findById(req.params.pid, (err, pilot) => {
      console.log(err)
      let newDrone = new Drone ({
         name: req.body.name,
         region: req.body.region
      });
      newDrone.save((err, drone) => {
         pilot.drones.push(drone);
         pilot.save((err, pilot) => {
            res.status(200).json(pilot)
         });
      });
   });
});





module.exports = router; 