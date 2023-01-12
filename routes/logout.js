/*
 * All routes for Logout are defined here
 * Since this file is loaded in server.js into logout,
 *   these routes are mounted onto /logout
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Logout Endpoint
// User clicks on the logout link in the header and the cookie is cleared
router.get('/logout', (req, res) => {
  // Clear the logged in cookie (simulated)
  res.clearCookie('userid');

  // Redirect to main page
  res.redirect('/');
});

module.exports = router;
