## User Stories

## User Scenarios

## Pick Out Nouns
* nouns === resources
* nouns are tables
* build the ERD

### User
- id
- name
- email
- password

### Maps
- id
- title
- user_id
- latitude
- longitude
- zoom

### Pins
- id
- map_id
- user_id
- title
- description
- img_url
- latitude
- longitude

### Favourites
- map_id
- user_id

### Contributors
- pin_id
- user_id

## Routes to interact w the resources
* REST (Representational State Transfer) - naming convention

[routes.md](./routes.md)

## MVP (for startups)
* Minimum Viable Product
- Min feature set that user will find useful

## MVD Minimum Viable Demo
* what can we effectively show off in 5 minutes
* if you're not going to show it, don't build it
* Project Killer: "Wouldn't it be cool if...."

## Wireframe & Mockup
* design front end
* anyone on team can implement design

## User Registration and Login
* Don't do it for demo
* use GET request to set cookie
* still users table seeded with users data

## Tech Choices
* back end - node, express, postgres
* front end - HTML, CSS, JS, jQuery


