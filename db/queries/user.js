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

const getFavourites = (id) => {
  return db.query(`
    SELECT maps.id, maps.title AS favourite_maps
    FROM favourite_maps
    INNER JOIN maps ON maps.id = favourite_maps.map_id
    JOIN users ON users.id = favourite_maps.user_id
    WHERE favourite_maps.user_id = $1
    ;
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

module.exports = { getSingleUser, getFavourites, getMapsByUser };
