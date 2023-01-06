## Routes to interact w the resources
* REST (Representational State Transfer) - naming convention

From these nouns decide which need routes:
- users
- maps
- pins
- favourites
- contributors

### Users
** Use Promise.all() for 3 AJAX req's here?
Show a list of maps that a user has contributed to
- B GET /users/:id/maps (Promise 3)
Show list of user's favourite maps
- B GET /users/:id/favourites (Promise 2)
Display user profile
- R GET /users/:id (Promise 1)

### Maps
- B GET  /maps
- R GET  /maps/:id (Object with map and associated pins)
- E POST /maps/:id/edit
- A POST /maps/new
- D POST /maps/:id/delete

### Pins
- R GET  /pins/:id
- E POST /pins/:id/edit
- A POST /pins/new
- D POST /pins/:id/delete
