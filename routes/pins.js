/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');

const router  = express.Router();
const mapsQueries = require('../db/queries/pins');

router.get('/:id', (req, res, mapID) => {
  mapsQueries.getPins(mapID);
});

module.exports = router;
