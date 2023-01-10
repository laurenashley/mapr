/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');

router.get('/:id', (req, res) => {
  const mapData = mapsQueries.getSingleMap(req.params.id);  
  const pinData = mapsQueries.getMapWithPins(req.params.id);
  Promise.all([mapData, pinData])
    .then(data => {
      const map = data[0];
      const pins = data[1];
      res.json({ map, pins });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;