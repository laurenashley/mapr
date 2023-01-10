// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookie = require('cookie');

const PORT = process.env.PORT || 8080;
const app = express();


app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const mapsRoutes = require('./routes/maps');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/maps', mapsRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
const { getMaps } = require('./db/queries/maps');
const { json } = require('express');
const { getSingleUser, getMapsByUser, getFavourites } = require('./db/queries/user');

app.get('/', (req, res) => {
  // Store the cookie in a variable and pass to the template
  const userid = cookie.parse(req.headers.cookie || '').userid;

  if (userid) {
    const promiseUser = getSingleUser(userid);
    const prmoiseUserMaps = getMapsByUser(userid);
    const promiseGetFavourites = getFavourites(userid);
    const promiseMaps = getMaps();

    Promise.all([userid, promiseMaps, promiseUser, prmoiseUserMaps, promiseGetFavourites]).then(data => {
      const pins = null;
      const maps = data[1];
      const user = data[2];
      const userMaps = data[3];
      const userFavs = data[4];
      res.render('index', { user, maps, userMaps, userFavs, userid, pins });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  } else {
    const promiseMaps = getMaps();

    Promise.all([userid, promiseMaps]).then(data => {
        const maps = data[1];
        res.render('index', { maps, userid });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
