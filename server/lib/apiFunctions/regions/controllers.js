import { getRegionsFromDB } from "./queries.js";

export const getRegions = async (req, res) => {
    try {
        const regions = await getRegionsFromDB()
        res.status(200).json(regions);
    } catch (err) {
        console.log('Error fetching regions', err)
        res.status(500).json({ error: "Internal server error" })
    }
} 