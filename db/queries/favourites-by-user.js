// To Do is this file being used?

const db = require('../connection');

const getFavourties = (id) => {
  return db.query(`
    SELECT maps.id, maps.title AS favourite_maps
    FROM favourite_maps
    INNER JOIN maps ON maps.id = favourite_maps.map_id
    JOIN users ON users.id = favourite_maps.user_id
    WHERE favourite_maps.user_id = $1
    ;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavourties };
