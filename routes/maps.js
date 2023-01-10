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
  mapsQueries.getMapWithPins(req.params.id)
    .then(map => {
      res.json({ pins: map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/update', (req, res) => {
  mapsQueries.updateMap(
    1, // To Do change to login cookie
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );
});

router.post('/new', (req, res) => {
  mapsQueries.addNewMap(
    1, // To Do change to login cookie
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );
});

router.post('/:id/delete', (req, res) => {
  mapsQueries.deleteMap(req.params.id)
    .then(data => {
      console.log('data after delete: ', data);
      // To Do refresh list of maps
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
