import { getNonUserSurfSpotsFromDB, getSpotsAndSubscriptionsFromDB, getSurfSpotsFromDB, getUserSurfSpotsFromDB, subscribeUserToSpotInDB, unSubscribeUserToSpotInDB } from "./queries.js";

export const getSurfSpots = async (req, res) => {
  const { userId } = req.params;
  
  try {
    let spots;
    
    if (userId) {
      spots = await getSpotsAndSubscriptionsFromDB(userId)
    } else {
      spots = await getSurfSpotsFromDB();
    }
    res.status(200).json(spots);
  } catch (err) {
    console.error("Error fetching surf spots:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const subscribeUserToSpot = async (req, res) => {
  try {
    const { spotId } = req.params;
    const { userId } = req.params;
    await subscribeUserToSpotInDB({ userId, spotId });
    console.log(`User: ${userId} subscribed to spot ${spotId}`);
    res.status(200).json({ success: "User subscribed to spot" });
  } catch (err) {
    console.error("Error subscribing");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const unSubscribeUserToSpot = async (req, res) => {
  try {
    const { spotId } = req.params;
    const { userId } = req.params;
    await unSubscribeUserToSpotInDB({ userId, spotId });
    console.log(`User: ${userId} unsubscribed from spot ${spotId}`);
    res.status(200).json({ success: "User unsubscribed from spot" });
  } catch (err) {
    console.error("Error unsubscribing");
    res.status(500).json({ error: "Internal server error" });
  }
};
