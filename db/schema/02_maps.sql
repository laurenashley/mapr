-- Drop and recreate Maps table

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  latitude VARCHAR(255)  NOT NULL,
  zoom INTEGER NOT NULL DEFAULT 0
);
