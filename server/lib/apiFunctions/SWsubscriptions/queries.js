//mock DB for now
// const subDatabase = []

import * as db from "../../../db/index.js"

console.log(db)

export async function getSWSubscriptionsFromDB() {
    const subscriptions = await  db.query('SELECT * FROM subscriptions;')
    console.log(subscriptions)
    return subscriptions
}

export async function addSWSubscriptionToDB(subscription) {
    const queryText = 'INSERT INTO subscriptions (data) VALUES ($1) RETURNING *;';
    const values = [subscription];

    const result = await db.query(queryText, values)
    return result
}