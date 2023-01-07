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
  mapsQueries.getSingleMap();
});

router.post('/:id/edit', (req, res) => {
  mapsQueries.updateMap();
});

router.post('/new', (req, res) => {
  const data = req.body;
  console.log('new map submitted: ', req.body.mapName);
  mapsQueries.addNewMap(
    data.user_id,
    data.mapName,
    data.mapLong,
    data.mapLat,
    data.mapZoom
  );
});

router.post('/:id/delete', (req, res) => {
  mapsQueries.deleteMap();
});

module.exports = router;
