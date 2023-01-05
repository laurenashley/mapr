const db = require('../connection');

const getSingleUser = (id) => {
  return db.query(`
    SELECT * 
    FROM users
    WHERE id = $1;
  `)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getSingleUser };
