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
