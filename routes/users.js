/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/user');

// router.get('/', (req, res) => {
//   db.query(getSingleUser)
//     .then(data => {
//       const user = data.rows;
//       console.log(user);
//       res.json({ user });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.get('/:id', (req, res) => {
//   userQueries.getUser()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// router.get('/:id/maps', (req, res) => {
//   userQueries.getMapsByUser();
// });

module.exports = router;
