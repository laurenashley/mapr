const db = require('../connection');

const getSingleUser = function(id) {
  const query = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;

  const value = [`${id}`];

  return db.query(query, value)
    .then( (data) => {
      const user = data.rows[0];

      if (!data.rows.length) {
        console.log("No user found with that id");
        return null;
      }
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getMapsByUser = (id) => {
  const query = `
    SELECT DISTINCT maps.* FROM maps
    JOIN pins on maps.id = map_id
    JOIN users on users.id = pins.user_id
    WHERE pins.user_id = $1;
  `;

  const value = [`${id}`];
  return db.query(query, value)
    .then(data => {
      if (!data.rows.length) {
        console.log("No user found with that id");
        return null;
      }
      return data.rows;
    });
};

const getFavourites = (id) => {
  const query = `
    SELECT DISTINCT maps.*
    FROM favourite_maps
    INNER JOIN maps ON maps.id = favourite_maps.map_id
    JOIN users ON users.id = favourite_maps.user_id
    WHERE favourite_maps.user_id = $1
    ;
  `;
  const value = [`${id}`];
  return db.query(query, value)
    .then(data => {
      if (!data.rows.length) {
        console.log("No user found with that id");
        return null;
      }
      return data.rows;
    });
};

module.exports = { getSingleUser, getMapsByUser, getFavourites };
