//mock DB for now
// const subDatabase = []

import * as db from "../../../db/index.js"


export async function getSWSubscriptionsFromDB() {
    const result = await  db.query('SELECT data FROM subscriptions;')
    return result.rows;
}

export async function addSWSubscriptionToDB(subscription) {
    const queryText = 'INSERT INTO subscriptions (data) VALUES ($1) RETURNING *;';
    const values = [subscription];
    const result = await db.query(queryText, values)
    return result || []
}

