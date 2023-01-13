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
  const maps = mapsQueries.getMaps();
  console.log(maps);
  Promise.all([maps])
    .then(data => {
      const maps = data[0];
      res.render('./maps/list', { maps });
    });
});

router.get('/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;

  res.render('./maps/form-new', { userid });
});

router.get('/:id/update', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const mapData = mapsQueries.getSingleMap(req.params.id);

  Promise.all([mapData])
    .then(data => {
      const map = data[0][0]; // Renders as an object, why?
      console.log(map);
      res.render('./maps/form-update', { userid, map });
    });
});

router.get('/:id', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const mapData = mapsQueries.getSingleMap(req.params.id);
  const pinData = mapsQueries.getMapWithPins(req.params.id);
  Promise.all([mapData, pinData])
    .then(data => {
      const map = data[0];
      const pins = data[1];
      console.log(data);
      res.render('./maps/map', { map, pins, userid });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Pins new - must be associated to parent map id
router.get('/:id/pins/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const mapid = req.params.id;
  res.render('./pins/form-new', { userid, mapid });
});

// POST
router.post('/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  mapsQueries.addNewMap(
    userid,
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );

  // To Do add row to contributors table

  res.redirect('/');
});

router.post('/users/:id/favourites', (req, res) => {
  console.log('router starting');
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const mapid = req.params.id;

  mapsQueries.addFavourite(mapid, userid)
    .then(data => {
      console.log('Router: Favourite row added to favourites table');
    });
});

router.post('/:id/update', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;

  mapsQueries.updateMap(
    userid,
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );

  res.redirect('/');
});

router.post('/:id/delete', (req, res) => {
  mapsQueries.deleteMap(req.params.id)
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  res.redirect('/');
});

module.exports = router;
