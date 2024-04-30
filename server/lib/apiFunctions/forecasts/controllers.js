import { getAllForecastsFromDB } from "./queries.js"

export const getAllForecasts = async(req, res) => {
    try {
       const forecasts =  await getAllForecastsFromDB()
       return res.status(200).json(forecasts)
    } catch (err){
        console.error('Error fetching forecasts',err)
        res.status(500).json({ error: "Internal server error" })
    }
}