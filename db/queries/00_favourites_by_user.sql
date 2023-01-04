SELECT title FROM maps
JOIN users on users.id = user_id
WHERE user_id = $1;
