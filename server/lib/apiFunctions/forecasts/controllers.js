import { getAllForecastsFromDB } from "./queries"

export const getAllForecasts = async(req, res) => {
    try {
       const forecasts =  getAllForecastsFromDB()
       return res.status(200).json(forecasts)
    } catch (err){
        console.error('Error fetching forecasts',err)
        res.status(500).json({ error: "Internal server error" })
    }
}