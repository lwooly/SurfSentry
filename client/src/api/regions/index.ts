import axios from 'axios'

export const getRegions = async ({ accessToken }: { accessToken: string }) => {
  // Fetch all regions
  const url = `${import.meta.env.VITE_API_URL}/regions`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};


