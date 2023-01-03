-- Drop and recreate Contributors table

DROP TABLE IF EXISTS contributors CASCADE;
CREATE TABLE contributors (
  id SERIAL PRIMARY KEY NOT NULL,
  pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
