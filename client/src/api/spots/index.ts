import axios from "axios";

export const getSurfSpots = async ({
  accessToken,
  userId = "",
  isUserExcluded = false,
}) => {
  // if a user id is present fetch only user subcribed spots or all surf spots if no user.

  const url = isUserExcluded
    ? `${
        import.meta.env.VITE_API_URL
      }/surf-spots/${userId}?isUserExcluded=${isUserExcluded}`
    : `${import.meta.env.VITE_API_URL}/surf-spots/${userId}`;

  const res = await axios.get(url, {
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

export const unSubscribeUserToSpot = async ({
  spotId,
  userId,
  accessToken,
}) => {
  console.log(spotId);
  console.log(userId);
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
