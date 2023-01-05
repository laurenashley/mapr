const db = require('../connection');

const getMaps = () => {
  return db.query(`
    SELECT *
    FROM maps;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMaps };
