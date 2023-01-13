UPDATE pins 
SET title = $1, description = $2, image_url = $3, longitude = $4, latitude = $5
WHERE id = $6;