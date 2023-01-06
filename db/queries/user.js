const db = require('../connection');

const getSingleUser = (id) => {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

const getMapsByUser = (id) => {
  return db.query(`
    SELECT maps.title FROM maps
    JOIN pins on maps.id = map_id
    JOIN users on users.id = pins.user_id
    WHERE pins.user_id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getSingleUser, getMapsByUser };
