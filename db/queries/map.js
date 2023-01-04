const db = require('../connection');

const getSingleMap = (id) => {
  return db.query(`
    SELECT *
    FROM maps
    WHERE id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMapsByUser };