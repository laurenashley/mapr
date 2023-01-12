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

router.get('/:id/update', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  const pin = pinsQueries.getSinglePin(req.params.id);

  Promise.all([pin])
  .then(data => {
    const pin = data[0];
    console.log(pin);
    res.render('./pins/form-update', {pin, userid});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// router.get(':id/delete', (req, res) => {
//   res.status('200');
// });

// Post
// (map_id, user_id, title, description, image_url, longitude, latitude)
router.post('/new', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;

  pinsQueries.addNewPin(
    req.body.mapid,
    req.body.userid,
    req.body.pinName,
    req.body.pinDesc,
    req.body.pinImageUrl,
    req.body.pinLat,
    req.body.pinLong
  );

  res.redirect('/');
});

router.post('/:id/update', (req, res) => {
  const userid = cookie.parse(req.headers.cookie || '').userid;
  pinsQueries.updatePin(
    req.body.mapid,
    req.body.userid,
    req.body.pinName,
    req.body.pinDesc,
    req.body.pinImageUrl,
    req.body.pinLat,
    req.body.pinLong
  );
});

router.post('/:id/delete', (req, res) => {
  pinsQueries.deletePin(req.params.id)
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  res.redirect('/');
});

module.exports = router;
