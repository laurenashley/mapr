/* eslint-disable arrow-body-style */
const db = require('../connection');

const getPins = (mapID) => {
  return db.query(`SELECT * FROM pins WHERE map_id = $1;`, [mapID])
    .then(data => {
      return data.rows;
    });
};

const getSinglePin = async (id) => {
  const data = await db.query(`SELECT * FROM pins WHERE id = $1;`, [id]);
  return data.rows;
};


const updatePin = (user_id, title, long, lat, zoom) => {
  return db.query(`
  INSERT INTO pins(user_id, title, longitude, latitude, zoom)
  VALUES($1, $2, $3, $4, $5);
  `,
  [user_id, name, long, lat, zoom])
    .then(data => {
      return data.rows;
    });
};

const addNewPin = (map_id, user_id, title, desc, image_url, long, lat) => {
  return db.query(`
  INSERT INTO pins(map_id, user_id, title, description, image_url, longitude, latitude)
  VALUES($1, $2, $3, $4, $5, $6, $7);
  `,
  [user_id, map_id, title, desc, image_url, long, lat])
    .then(data => {
      return data.rows;
    });
};

const deletePin = (id) => {
  return db.query(`DELETE FROM pins WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getPins,
  getSinglePin,
  addNewPin,
  updatePin,
  deletePin
};
