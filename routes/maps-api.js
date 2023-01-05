/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  mapsQueries.getMaps()
    .then(data => {
      const maps = data.rows;
      console.log('MAPS: ', maps);
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
