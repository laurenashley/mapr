/* eslint-disable arrow-body-style */
const db = require('../connection');

const getMaps = () => {
  return db.query(`SELECT * FROM maps;`)
    .then(data => {
      console.log("getMaps");
      console.log(data.rows);
      return data.rows;
    });
};

const getSingleMap = (id) => {
  const query = `
    SELECT * FROM maps
     WHERE id = $1;
  `;
  const value = [`${id}`];
  return db.query(query, value)
    .then(data => {
      return data.rows;
    });
};

const getMapWithPins = (mapID) => {
  return db.query(`SELECT * FROM pins
  WHERE map_id = $1;`, [mapID])
    .then(data => {
      return data.rows;
    });
};

const addFavourite = (mapid, userid) => {
  return db.query(`INSERT INTO favourite_maps(map_id, user_id)
  VALUES($1, $2)`, [mapid, userid])
  .then(data => {
    return data.rows;
  });
};

const updateMap = (user_id, name, long, lat, zoom) => {
  return db.query(`
  INSERT INTO maps(user_id, title, longitude, latitude, zoom)
  VALUES($1, $2, $3, $4, $5);
  `,
  [user_id, name, long, lat, zoom])
    .then(data => {
      return data.rows;
    });
};

const addNewMap = (user_id, name, long, lat, zoom) => {
  return db.query(`
  INSERT INTO maps(user_id, title, longitude, latitude, zoom)
  VALUES($1, $2, $3, $4, $5);
  `,
  [user_id, name, long, lat, zoom])
    .then(data => {
      return data.rows;
    });
};

const deleteMap = (id) => {
  return db.query(`DELETE FROM maps WHERE id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getSingleMap,
  getMaps,
  getMapWithPins,
  updateMap,
  addNewMap,
  deleteMap
};
