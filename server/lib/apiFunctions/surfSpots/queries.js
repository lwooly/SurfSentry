import * as db from "../../../db/index.js";

export const getSurfSpotsFromDB = async () => {
  const text = `SELECT * FROM spots;`
  const data = await db.query(text);
  return data.rows;
};

export const getUserSurfSpotsFromDB = async (userId) => {
  const text = `SELECT spotname, surfline_id FROM ((user_spots
        INNER JOIN spots ON user_spots.spot_id=spots.surfline_id)
        INNER JOIN users ON user_spots.user_id=users.auth0_user_id)
        WHERE auth0_user_id='${userId}';`;
  const data = await db.query(text);
  return data.rows;
};

export const getSpotsAndSubscriptionsFromDB = async (userId) => {

  const text = `SELECT
                  spots.surfline_id,
                  spots.spotname,
                  user_spots.user_id
                  FROM 
                    spots 
                  LEFT JOIN 
                    user_spots ON spots.surfline_id = user_spots.spot_id
                              AND user_spots.user_id = '${userId}';`;
  const data = await db.query(text);
  return data.rows;
};

// surf spots not selected by user
export const getNonUserSurfSpotsFromDB = async (userId) => {
  const text = `SELECT * FROM
        (spots  LEFT JOIN user_spots ON spots.surfline_id=user_spots.spot_id)
        WHERE surfline_id NOT IN
            (SELECT surfline_id FROM
            spots  INNER JOIN user_spots ON spots.surfline_id=user_spots.spot_id
            WHERE user_id = '${userId}');`;
  const data = await db.query(text);
  return data.rows;
};

export const subscribeUserToSpotInDB = async ({ userId, spotId }) => {
  const text =
    "INSERT INTO user_spots (user_id, spot_id) VALUES ($1, $2) RETURNING *";
  const values = [userId, spotId];
  const data = await db.query(text, values);
  return data.rows;
};

export const unSubscribeUserToSpotInDB = async ({ userId, spotId }) => {
  const text =
    "DELETE FROM user_spots WHERE user_id=$1 AND spot_id=$2 RETURNING *";
  const values = [userId, spotId];
  const data = await db.query(text, values);
  return data;
};