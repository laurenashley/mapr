## Routes to interact w the resources
* REST (Representational State Transfer) - naming convention

From these nouns decide which need routes:
- users
- maps
- pins
- favourites
- contributors

<!-- B (browse) GET  /users -->
R (read)   GET  /users/:id
<!-- E (edit)   POST /users/:id -->
<!-- A (add)    POST /users -->
<!-- D (delete) POST /users/:id/delete -->

B GET  /maps
R GET  /maps/:id
E POST /maps/:id
A POST /maps
D POST /maps/:id/delete

<!-- B GET  /pins -->
<!-- R GET  /pins/:id -->
<!-- E POST /pins/:id -->
<!-- A POST /pins -->
<!-- D POST /pins/:id/delete -->