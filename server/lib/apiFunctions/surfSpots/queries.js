import * as db from "../../../db/index.js"

export const getSurfSpotsFromDB = async () => {
    const text = 'SELECT * FROM spots'
    const data = await db.query(text)
    console.log(data.rows)
    return data.rows
}

export const subscribeUserToSpotInDB = async ({userId, spotId}) => {
    const text = 'INSERT INTO user_spots (user_id, spot_id) VALUES ($1, $2) RETURNING *'
    const values = [userId, spotId]
    const data = await db.query(text, values)
    return data.rows
}
