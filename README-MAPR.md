## User Stories
- As an anonymous user I can see a list of the available maps, view an individual map and create a user account.
- As an anonymous user, I cannot view profiles, edit pins or create maps because I do not have a registered account.
- As a logged in user I can create my own map with many pins on it, each having a title, description and image.
- As a logged in user I can favourite available maps so I can find them to view them again easily, and I can add, edit, remove pins on any map as a contributor.
- As a logged in user my profile shows favourited maps and maps I’ve contributed to.
- As a logged in user, I can view other user profiles.
- As a logged in user, I cannot edit other users’ profiles.

## User Scenarios
- Given that I am not logged in, when I click on an available map I can view it and click on the map’s pins which display a tooltip box containing the title, description and image with a message to login/create an account.
- Given that I am logged in, when I click the favourite icon (heart outline) on a map, then it is added to my favourites on my profile and the heart icon changes to a filled in heart and displays a toast message that the map has been added to my favourites.
- Given that I am logged in, when I click the button to create a new map from the landing page, I am brought to a form that takes the map name, and sets the map location (I.e. longitude, latitude, zoom) (and many possible other data TBD). 
- Given that I am logged in, when I submit the create new map form, the map displays next to a form that allows me to add multiple pins.
- Given that I am logged in, when I click the ‘add pin’ button within my map a tooltip box appears containing form fields for coordinates, title, desc and thumbnail img.
- Given that I am logged in, when I view an available map I can click on an “add pin” button (or click on the map?) to open a form including fields for long/lat coordinates, title, description and thumbnail image url.
- Given that I am logged in, when I click on a pin icon, a tooltip box opens over the map displaying the title, description and thumbnail image associated with that pin as well as an edit icon (pencil) next to each field and a trash icon for deleting the pin.
- Given that I am logged in, when I click an edit icon in the pin tooltip box, then a field displays to edit that data and the edit icon turns to a submit icon (check). When I click the submit icon the data is then changed in the tooltip box and the icon turns back into a pencil icon. (Homework - find an example UI for editing map pins)

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
- map_id ** empty map user created should still be in contrib's 

## Routes to interact w the resources
* REST (Representational State Transfer) - naming convention

[routes.md](./routes.md)

## MVD Requirements
* user login GET request to set cookie
* seed database tables with dummy data
* create new map
* add, edit, delete own pins
* view map and pin details in sidebar
* view my profile

## Wireframes
[routes.md](./routes.md)

## Tech Choices
* back end - node, express, postgres
* front end - HTML, CSS, JS, jQuery

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
