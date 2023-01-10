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

module.exports = {
  getPins,
  getSinglePin
};
