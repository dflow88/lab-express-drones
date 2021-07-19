const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone          = require("./../models/Drone.model")

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find({})
    .then((dronesFound) => {
      res.render("drones/list", {
        drones: dronesFound
      })
    })
    .catch(e => console.log(e))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
    res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body
  Drone.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones')
    })
    .catch(() => {
      res.redirect('/drones/create')
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  Drone.findById(req.params.id)
    .then((droneSelected) => {
      res.render('drones/update-form', {
        drone: droneSelected
      })
    })
    .catch(e => console.log(`Error`))
})

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body
  const id = req.params.id
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones')
    })
    .catch(() => {
      console.log('Prueba actualizar de nuevo')
      res.redirect(`/drones/${id}/edit`)
    })
  
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const id = req.params.id
  Drone.findByIdAndDelete(id)
    .then(() => {
      console.log('Deleted drone')
      res.redirect('/drones')
    })
    .catch(e => console.log(e))
});

module.exports = router;
