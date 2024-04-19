INSERT INTO spots (spotname, surfline_id) VALUES 
('Rest bay', '584204204e65fad6a77090d2'),
('Saunton', '5842041f4e65fad6a7708e10'),
('Lynmouth', '5842041f4e65fad6a7708ca2');

SELECT spotname FROM ((user_spots
INNER JOIN spots ON user_spots.spot_id=spots.surfline_id)
INNER JOIN users ON user_spots.user_id=users.auth0_user_id)
WHERE auth0_user_id='google-oauth2|114388185724420054893';

SELECT * FROM 
(spots  LEFT JOIN user_spots ON spots.surfline_id=user_spots.spot_id)
WHERE surfline_id NOT IN 
    (SELECT surfline_id FROM 
    spots  INNER JOIN user_spots ON spots.surfline_id=user_spots.spot_id 
    WHERE user_id = 'google-oauth2|114388185724420054893');


SELECT surfline_id, spotname, user_id FROM 
spots 
LEFT JOIN user_spots ON spots.surfline_id=user_spots.spot_id;


SELECT
    spots.surfline_id,
    spots.spotname,
    user_spots.user_id
FROM 
    spots 
LEFT JOIN 
    user_spots ON spots.surfline_id = user_spots.spot_id
               AND user_spots.user_id = 'google-oauth2|114388185724420054893';