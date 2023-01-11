/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookie  = require('cookie');

/**
 * Login Endpoint
 *
 * Description: Simulate login
 * When a user goes to /users/login using the login form, a cookie is set
*/
router.get('/login', (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('userid', 1, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  }));
  console.log('user cookie set!');
  res.redirect('/');
});

/**
 * Logout Endpoint
 *
 * Description: User clicks on the logout link in the header and the cookie is cleared
 */

router.get('/logout', (req, res) => {
  // Clear the logged in cookie (simulated)
  res.clearCookie('userid');

  // Redirect to main page
  res.redirect('/');
});

module.exports = router;
