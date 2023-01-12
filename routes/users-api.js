/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookie = require('cookie');
const userQueries = require('../db/queries/user');

router.get('/:id/favourites', (req, res) => {
  const favsData = userQueries.getFavourites(req.params.id);
  Promise.all([favsData])
    .then(data => {
      const favourites = data[0];
      console.log(data);
      res.json({ favourites });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/contributions', (req, res) => {
  const userMapsData = userQueries.getMapsByUser(req.params.id);
  Promise.all([userMapsData])
    .then(data => {
      const contributions = data[0];
      console.log(data);
      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
