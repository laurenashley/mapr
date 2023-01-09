-- Select single map by map id
SELECT * FROM pins
  JOIN maps ON maps.id = map_id
  WHERE map_id = 1;
