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
    SELECT maps.*, favourite_maps.map_id AS fav
    FROM maps
    LEFT JOIN favourite_maps ON maps.id = favourite_maps.map_id
    WHERE maps.id = $1
    GROUP BY fav, maps.id;
  `;
  const value = [`${id}`];
  return db.query(query, value)
    .then(data => {
      return data.rows;
    });
};

const getMapWithPins = (mapID) => {
  return db.query(`
  SELECT * FROM pins
  WHERE map_id = $1
  ORDER BY title
  ;`, [mapID])
    .then(data => {
      return data.rows;
    });
};

const updateMap = (title, lat, long, zoom, mapid) => {
  const query = `
    UPDATE maps SET title = $1, latitude = $2, longitude = $3, zoom = $4
    WHERE id = $5
    ;
  `;
  const values = [`${title}`, `${lat}`, `${long}`, `${zoom}`, `${mapid}`];
  return db.query(query, values)
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
