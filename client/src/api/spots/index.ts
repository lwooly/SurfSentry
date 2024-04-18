import axios from "axios";

export const getSurfSpots = async ( {accessToken, userId = ''}) => {
// if a user id is present fetch only user subcribed spots
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/surf-spots/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export const subscribeUserToSpot = async ({ spotId, userId, accessToken }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/surf-spots/${spotId}/subscribe/${userId}`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};

export const unSubscribeUserToSpot = async ({ spotId, userId, accessToken }) => {
  console.log(spotId)
  console.log(userId)
  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL}/surf-spots/${spotId}/subscribe/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};
