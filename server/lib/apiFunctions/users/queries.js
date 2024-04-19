
import * as db from "../../../db/index.js"


// export async function getSWSubscriptionsFromDB() {
//     const result = await  db.query('SELECT data FROM subscriptions;')
//     return result.rows;
// }

export async function addUserToDB(user) {
    const queryText = 'INSERT INTO users (auth0_user_id, name, email) VALUES ($1, $2, $3) RETURNING *;';
    const values = [user.user_id, user.name, user.email];
    const result = await db.query(queryText, values)
    return result;
}