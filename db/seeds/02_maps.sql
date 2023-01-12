-- Maps table seeds here
-- INSERT INTO maps (user_id, title, description, image_url, longitude, latitude, zoom)
-- VALUES
--   (1, 'Antojitos y Cantina', 'Best Mexican Food in Metro Vancouver', 'https://www.vmcdn.ca/f/files/via/images/mexican-food-table-spread.jpg', '49.278797', '-123.124006', 6),
--   (1, 'Brookside Inn', 'Best Boutique Hotels in Metro Vancouver', 'https://images.trvl-media.com/hotels/10000000/9700000/9691400/9691345/776fb45d.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium', '49.24619905', '-122.89826898646102', 6),
--   (2, 'Chosun BBQ', 'Korean BBQ in Metro Vancouver', 'https://media-cdn.tripadvisor.com/media/photo-s/16/87/95/21/korean-style-set-meal.jpg', '49.2590457', '-123.1389288', 6),
--   (2, 'Cineplex Marine Gateway', 'IMAX Theatres in Metro Vancouver', 'https://lh3.googleusercontent.com/p/AF1QipNAapyo3kjAoK6y9BpKvg8mvFmHgy3NzeYl8kdV=s680-w680-h510', '49.2098186', '-123.115712', 6);

INSERT INTO maps (user_id, title, latitude, longitude, zoom)
VALUES (1, 'Best Mexican Food in Metro Vancouver', '49.2578262', '-123.1941153', '10');
INSERT INTO maps (user_id, title, latitude, longitude, zoom)
VALUES (1, 'Best Boutique Hotels in Metro Vancouver', '49.2576508', '-123.2639868', '10');
INSERT INTO maps (user_id, title, latitude, longitude, zoom)
VALUES (2, 'Korean BBQ in Metro Vancouver', '49.2576508', '-123.2639868', '10');
INSERT INTO maps (user_id, title, latitude, longitude, zoom)
VALUES (2, 'IMAX Theatres in Metro Vancouver', '49.2576508', '-123.2639868','10');
INSERT INTO maps (user_id, title, latitude, longitude, zoom)
VALUES (1, 'Best hiking in British Columbia', '55.7710031', '-130.5665253', '5.1');
