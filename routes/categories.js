const express = require('express');

const router  = express.Router();

const mapsCategories = require('../db/queries/categories');

router.get('/', (req, res) => {
  mapsCategories.getCategories()
  .then(categories => res.send(categories))
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
  });
})

router.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  mapsCategories.getMapsFromCategory(categoryId)
  .then(maps => res.send(maps))
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
