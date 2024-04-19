import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function startSurfCheck(accessToken: string) {
  try {
    const response = await axios.get(`${API_URL}/send-notification/surf-check`, {
      headers: { 'Authorization': `Bearer ${accessToken}`},
    });
    return response;
  } catch (err) {
    console.log(`Message not sent ${err}`);
  }
}

export default startSurfCheck;
