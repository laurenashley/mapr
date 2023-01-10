/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookie = require('cookie');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');


router.get('/', (req, res) => {
  const query = `SELECT * FROM maps`;
  console.log(query);
  db.query(query)
    .then(data => {
      const maps = data.rows;
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const mapData = mapsQueries.getSingleMap(req.params.id);  
  const pinData = mapsQueries.getMapWithPins(req.params.id);
  Promise.all([mapData, pinData])
    .then(data => {
      // res.json({ pins: map });
      const maps = data[0];
      const pins = data[1];
      res.render('./maps/map', { maps, pins, userid });
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
  const userid = cookie.parse(req.headers.cookie || '').userid;
  mapsQueries.addNewMap(
    userid, // To Do change to login cookie
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );
});

router.post('/:id/delete', (req, res) => {
  // To Do prompt use to confirm map deletion
  // To Do pass map_id below
  const mapId = $('#mapsList li').attr('id');
  console.log('map id: ', mapId);
  mapsQueries.deleteMap();
});


module.exports = router;
