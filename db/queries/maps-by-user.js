const db = require('../connection');

const getMapsByUser = (id) => {
  return db.query(`
    SELECT *
    FROM maps
    WHERE user_id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMapsByUser };
