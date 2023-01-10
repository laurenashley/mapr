DROP TABLE IF EXISTS map_categories CASCADE;

CREATE TABLE map_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  categories_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
