import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

async function sendNotification() {
    try {
        const response = await axios.get(`${API_URL}/send-notification`);
        console.log(`${API_URL}/save-subscription`)
        console.log(response);
        return response;
    } catch (err) {
        console.log(`Message not sent ${err}`);
    }
}

export default sendNotification;
