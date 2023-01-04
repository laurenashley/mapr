const db = require('../connection');

const getPinsPerMap = (id) => {
  return db.query(`
    SELECT * FROM pins
    WHERE map_id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPinsPerMap };
