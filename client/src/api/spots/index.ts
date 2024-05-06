import axios from "axios";

interface surfSpotConfig {
  accessToken: string;
  userId?: string;
}

export const getSurfSpots = async ({
  accessToken,
  userId = "",
}: surfSpotConfig) => {
  console.log(userId);
  // Fetch all surfspots
  // If a user id is present fetch data for user subscription
  const url = `${import.meta.env.VITE_API_URL}/surf-spots/${userId}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

export const subscribeUserToSpot = async ({
  spotId,
  userId,
  accessToken,
}: {
  spotId: string;
  userId: string;
  accessToken: string;
}) => {
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

export const unSubscribeUserToSpot = async ({
  spotId,
  userId,
  accessToken,
}: {
  spotId: string;
  userId: string | undefined;
  accessToken: string | null;
}) => {

  if (!accessToken) {
    console.log('access token not provided spots not fetched')
    return;
  }
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
