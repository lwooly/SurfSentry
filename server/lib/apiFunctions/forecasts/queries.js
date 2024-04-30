import * as db from "../../../db/index.js";

export const getAllForecastsFromDB = async () => {
    const data = await db.query(`SELECT * FROM forecasts;`)
    return data.rows
}

export const addForecasttoDB = async ({forecast, surfline_id}) => {
    const text = `INSERT INTO forecasts (forecast, spot_id) VALUES ($1, $2)
                    ON CONFLICT (spot_id) DO UPDATE
                    SET forecast = EXCLUDED.forecast;`;
    const params = [JSON.stringify(forecast), surfline_id ]
    const data = await db.query(text, params)
    return data.rows;
}