/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');

const router  = express.Router();
const mapsQueries = require('../db/queries/pins');

// To Do is this being used?
router.get('/', (req, res) => {
  mapsQueries.getpins();
});

module.exports = router;
