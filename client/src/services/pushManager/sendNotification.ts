import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function sendNotification(accessToken: string) {
  try {
    const response = await axios.get(`${API_URL}/send-notification`, {
      headers: { 'Authorization': `Bearer ${accessToken}`},
    });
    console.log(`${API_URL}/save-subscription`);why
    console.log(response);
    return response;
  } catch (err) {
    console.log(`Message not sent ${err}`);
  }
}

export default sendNotification;
