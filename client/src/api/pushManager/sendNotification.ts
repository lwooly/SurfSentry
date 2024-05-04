import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function sendNotification(accessToken: string | null) {

  if (!accessToken) {
    console.log('Access token not provided, notification not sent')
    return
  }
  try {
    const response = await axios.get(`${API_URL}/send-notification`, {
      headers: { 'Authorization': `Bearer ${accessToken}`},
    });
    return response;
  } catch (err) {
    console.log(`Message not sent ${err}`);
  }
}

export default sendNotification;
