
import * as db from "../../../db/index.js"


export async function getSWSubscriptionsFromDB() {
    const result = await  db.query('SELECT data FROM subscriptions;')
    return result.rows;
}

export async function addSWSubscriptionToDB({subscription, userId}) {
    const queryText = `INSERT INTO subscriptions (data, user_id) VALUES ($1, $2) RETURNING *`;
    const values = [subscription, userId];
    const result = await db.query(queryText, values)
    return result || []
}

export async function getSpotSubscriptionsFromDB(spotSurflineIds) {
    const queryText = `SELECT DISTINCT data FROM (
        (spots  LEFT JOIN user_spots ON spots.surfline_id=user_spots.spot_id) 
        JOIN subscriptions ON user_spots.user_id=subscriptions.user_id)
         WHERE surfline_id = ANY($1)`;

    const result = await db.query(queryText, [spotSurflineIds])
    return result.rows || []
}