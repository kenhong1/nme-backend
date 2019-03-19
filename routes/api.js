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
   Pilot.findById(req.params.id, (err, pilot) => {
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
router.put("/pilots/:id", (req, res) => {
   Pilot.findByIdAndUpdate(req.params.id, {$set: {
      name:req.body.name,
      callSign: req.body.callSign
   }}, (err, pilot) => {
      pilot.save( () => {
         res.json(pilot)
      })
   })
})


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
router.get("/pilots/:pid/drones/:did", (req, res) => {
   Pilot.findById(req.params.pid).populate("drones").exec((err, drone) => {
      res.json(drone.name)
   });
});


//POST /pilots/:pid/drones = Create a new drone for that pilot 
router.post("/pilots/:pid/drones", (req, res) => {
   let drone = new Drone ({
      name:req.body.name,
      region:req.body.region
   });
   drone.save((err, drone) => {
      Pilot.findById(req.params.pid, (err, pilot) => {
         pilot.drones.push(drone)
         res.json(pilot)
      });
   });
}); 


router.post("/pilots/:pid/drones", (req, res) => {
   Pilot.findById(req.params.pid).populate("drones").exec((err, pilot) => {
      let drone = new Drone ({
         name: req.body.name,
         region: req.body.region
      })
      drone.save((err, newDrone) => {
         pilot.drones.push(newDrone)
         pilot.save((err, pilot) => {
            res.status(201).json(newDrone);
         });
      });
   });
});








module.exports = router; 