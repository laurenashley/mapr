SELECT title FROM maps
JOIN pins on maps.id = map_id
JOIN users on users.id = user_id
WHERE user_id = $1;
