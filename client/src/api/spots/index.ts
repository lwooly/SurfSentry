import axios from "axios";

export const getSurfSpots = async (accessToken: string | null) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/surf-spots`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export const subscribeUserToSpot = async ({ spotId, userId, accessToken }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/surf-spots/${spotId}/subscribe`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};
