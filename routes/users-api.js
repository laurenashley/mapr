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
      const userFavs = data[0];

      res.json({ userFavs });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/contributions', (req, res) => {
  const contribsData = userQueries.getContributed(req.params.id);
  Promise.all([contribsData])
    .then(data => {
      const contributions = data[0];

      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
