SELECT maps.title FROM maps
JOIN pins on maps.id = map_id
JOIN users on users.id = pins.user_id
WHERE pins.user_id = 1;
