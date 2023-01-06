/* eslint-disable arrow-body-style */
const db = require('../connection');

const getMaps = () => {
  return db.query(`SELECT * FROM maps;`)
    .then(data => {
      return data.rows;
    });
};

const getSingleMap = (id) => {
  return db.query(`SELECT * FROM maps WHERE id = $1;`)
    .then(data => {
      return data.rows;
    });
};

const updateMap = (id) => {
  return db.query(``)
    .then(data => {
      return data.rows;
    });
};

const addNewMap = () => {
  return db.query(``)
    .then(data => {
      return data.rows;
    });
};

const deleteMap = (id) => {
  return db.query(`DELETE FROM maps WHERE id = $1;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getMaps,
  getSingleMap,
  updateMap,
  addNewMap,
  deleteMap
};
