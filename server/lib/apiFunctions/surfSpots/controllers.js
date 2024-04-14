import { getSurfSpotsFromDB, subscribeUserToSpotInDB } from "./queries.js";

export const getSurfSpots = async (req, res) => {
    try {
        const spots = await getSurfSpotsFromDB()
        console.log(spots)
        res.status(200).json(spots)
    }catch (err){
        console.error("Error fetching surf spots:", err); 
        res.status(500).json({'error': 'Internal server error'})
    }
}




export const subscribeUserToSpot = async (req, res) => {
    try {
        const {spotId} = req.params
        const {userId} = req.body
        await subscribeUserToSpotInDB({userId, spotId})
        console.log(`User: ${userId} subscribed to spot ${spotId}`)
        res.status(200).json({'success': 'User subscribed to spot'})
    } catch (err){
        console.error("Error fetching surf spots:", err); 
        res.status(500).json({'error': 'Internal server error'})
    }
}