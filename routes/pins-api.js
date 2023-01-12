
const express = require('express');
const router  = express.Router();
const pinsQueries = require('../db/queries/pins');
// Keep - needed for api pages
const { json } = require('express');


router.get('/', (req, res) => {
  const pinData = pinsQueries.getPins();
  Promise.all([pinData]).then(data => {
    const pins = data[0];
    res.json({ pins: pins });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

/**
 * Show json data for pins
 * 
 * i.e. /pins-api/1
 */
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const pinData = pinsQueries.getSinglePin(req.params.id);
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