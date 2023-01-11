/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookie = require('cookie');
const router = express.Router();
const pinsQueries = require('../db/queries/pins');

router.get('/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  res.render('./pins/form-new', { userid });
});

router.get('/:id', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const pin = pinsQueries.getSinglePin(req.params.id);

  Promise.all([pin])
    .then(data => {
      const pin = data[0];
      console.log(pin);
      res.render('./pins/pin', { pin });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Post
// (map_id, user_id, title, description, image_url, longitude, latitude)
router.post('/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;

  pinsQueries.addNewPin(
    userid,
    req.body.mapid,
    req.body.userid,
    req.body.pinName,
    req.body.pinImageUrl,
    req.body.pinLat,
    req.body.pinLong
  );

  res.redirect('/');
});

router.post('/:id/update', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  pinsQueries.updatePin(
    1, // To Do change to login cookie
    req.body.mapName,
    req.body.mapLong,
    req.body.mapLat,
    req.body.mapZoom
  );
});

router.post('/:id/delete', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const pinID = $('#mapsList li').attr('id');
  console.log('PinID: ', pinID);
  pinsQueries.deletePin();
});

module.exports = router;
