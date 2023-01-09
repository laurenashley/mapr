const db = require('../connection');

const getSingleUser = (id) => {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [id])
    .then(data => {
      return data.rows;
    });
};

const getMapsByUser = (mapID) => {
  return db.query(`
    SELECT maps.title FROM maps
    WHERE user_id = $1;
  `, [mapID])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getSingleUser, getMapsByUser };
