-- Select favourtie map for a given user (id)
SELECT maps.id, maps.title AS favourite_maps
FROM favourite_maps
INNER JOIN maps ON maps.id = favourite_maps.map_id
JOIN users ON users.id = favourite_maps.user_id
WHERE favourite_maps.user_id = 1
;