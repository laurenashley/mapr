-- Select all pins
SELECT * FROM pins
WHERE map_id = $1;
