import * as db from "../../../db/index.js"

export const getSurfSpotsFromDB = async () => {
    const text = 'SELECT * FROM spots'
    const data = await db.query(text)
    console.log(data.rows)
    return data.rows
}


export const getUserSurfSpotsFromDB = async (userId) => {
    const text = 
        `SELECT spotname FROM ((user_spots
        INNER JOIN spots ON user_spots.spot_id=spots.surfline_id)
        INNER JOIN users ON user_spots.user_id=users.auth0_user_id)
        WHERE auth0_user_id='${userId}';`
    const data = await db.query(text)
    console.log(data.rows)
    return data.rows
}

// surf spots not selected by user
export const getOtherSurfSpotsFromDB = async (userId) => {
    const text = 
        `SELECT spotname FROM ((user_spots
        INNER JOIN spots ON user_spots.spot_id=spots.surfline_id)
        INNER JOIN users ON user_spots.user_id=users.auth0_user_id)
        WHERE auth0_user_id NOT ='${userId}';`
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
