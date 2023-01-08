/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
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

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> f181ddf9fa75705712b637574fcbdb0b5d6f7f59
