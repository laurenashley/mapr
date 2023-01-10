/* eslint-disable arrow-body-style */
const db = require('../connection');

const getCategories = () => {
  return db.query(`SELECT * FROM categories;`)
    .then(data => {

      console.log(data.rows);
      return data.rows;
    });
};

const getMapsFromCategory = (id) => {
  console.log(getMapsFromCategory);

  return db.query(`
      SELECT maps.* FROM maps
      JOIN map_categories on maps.id = map_categories.map_id
      JOIN categories on map_categories.categories_id = categories.id
      WHERE categories.id = $1;
    `, [id])
    .then(data => {
      console.log(getMapsFromCategory, data.rows);
      return data.rows;
    });
};


module.exports = {
  getMapsFromCategory,
  getCategories
}
