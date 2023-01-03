-- Drop and recreate Favourite Maps table

DROP TABLE IF EXISTS favourite_maps CASCADE;
CREATE TABLE favourite_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
