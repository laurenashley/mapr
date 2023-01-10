
-- SELECT * FROM categories
-- JOIN map_categories on map_categories.categories_id = categories.id
-- JOIN maps on maps.id = map_categories.map_id;

SELECT maps.* FROM maps
JOIN map_categories on maps.id = map_categories.map_id
JOIN categories on map_categories.categories_id = categories.id
WHERE categories.id = 1;
