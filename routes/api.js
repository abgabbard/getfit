

const router = require("express").Router();
const Workouts = require("../models/workouts.js");

router.post("/api/workouts", ({ body }, res) => {
  Workouts.create(body)
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get("/api/workouts", (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.get('/api/workouts/range', (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workouts.findByIdAndUpdate(req.params.id, {$push:{exercises:req.body}}, {new:true}).then(dbWorkouts => {
    res.json(dbWorkouts);
  }).catch(err => {
    res.status(400).json(err);
  })
});



module.exports = router;
