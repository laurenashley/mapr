## Routes to interact w the resources
* REST (Representational State Transfer) - naming convention

From these nouns decide which need routes:
- users
- maps
- pins
- favourites
- contributors

### Users
Show a list of maps that a user has contributed to
- B GET /users/:id/maps
Show list of user's favourite maps
- B GET /users/:id/favourites
Display user profile
- R GET /users/:id

### Maps
- B GET  /maps
- R GET  /maps/:id (Object with map and associated pins)
- E POST /maps/:id
- A POST /maps
- D POST /maps/:id/delete

### Pins
- R GET  /pins/:id
- E POST /pins/:id
- A POST /pins
- D POST /pins/:id/delete
