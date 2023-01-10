
const express = require('express');
const router  = express.Router();
const pinsQueries = require('../db/queries/pins');

// To DO - mode to routes/pins
router.get('/pins/:id', (req, res) => {
  console.log(req.params.id);
  const pinData = getSinglePin(req.params.id);
  Promise.all([pinData]).then(data => {
    res.json({ pin: data[0]});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;