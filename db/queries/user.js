const db = require('../connection');

const getSingleUser = function(id) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  ` , [id])
    .then(data => {

      console.log(getMapsByUser);
      console.log(data.rows);



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

const getMapsByUser = (mapID) => {
  return db.query(`
    SELECT maps.title FROM maps
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

module.exports = { getSingleUser, getFavourites, getMapsByUser };
