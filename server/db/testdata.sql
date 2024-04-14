INSERT INTO spots (spotname, surfline_id) VALUES 
('Rest bay', '584204204e65fad6a77090d2'),
('Saunton', '5842041f4e65fad6a7708e10'),
('Lynmouth', '5842041f4e65fad6a7708ca2');


SELECT spotname FROM ((user_spots
INNER JOIN spots ON user_spots.spot_id=spots.surfline_id)
INNER JOIN users ON user_spots.user_id=users.auth0_user_id)
WHERE auth0_user_id='google-oauth2|114388185724420';