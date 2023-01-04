const db = require('../connection');

const getSinglePin = (id) => {
  return db.query(`
    SELECT * FROM pins
    WHERE pin_id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getSinglePin };
