const db = require('../connection');

const getSingleUser = function(id) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  ` , [id])
    .then(data => {
      return data.rows;
    });
};

const getFavourites = (id) => {
  const query = `
    SELECT DISTINCT map_id, maps.*
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

const getContributed = (id) => {
  const query = `
  SELECT DISTINCT map_id, maps.*
  FROM contributors
  INNER JOIN pins ON pins.id = contributors.pin_id
  JOIN maps ON maps.id = pins.map_id
  JOIN users ON users.id = contributors.user_id
  WHERE contributors.user_id = $1
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

const getMapsByUser = (mapID) => {
  return db.query(`
    SELECT * FROM maps
    WHERE user_id = $1;
  `, [mapID])
    .then(data => {
      if (!data.rows.length) {
        console.log("No user found with that id");
        return null;
      }
      return data.rows;
    });
};

const addMapToContributors = (mapid, userid) => {
  return db.query(`
    INSERT INTO contributors(map_id, user_id)
    VALUES($1, %2);
  `, [mapid, userid])
    .then(data => {
      if (!data.rows.length) {
        console.log("No user found with that id");
        return null;
      }
      return data.rows;
    });
};

const addFavourite = (mapid, userid) => {
  return db.query(`INSERT INTO favourite_maps(map_id, user_id)
  VALUES($1, $2)`, [mapid, userid])
  .then(data => {
    console.log('Favourite added to db now');
    return data.rows;
  });
};

module.exports = { getSingleUser,
  getFavourites,
  getMapsByUser,
  addMapToContributors,
  getContributed,
  addFavourite
};
