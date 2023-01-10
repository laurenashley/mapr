const db = require('../connection');

const getPinsPerMap = (id) => {
  const query = `
    SELECT * FROM pins
    WHERE map_id = $1;
  `;
  const value = [`${id}`];
  return db.query(query, value)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPinsPerMap };
