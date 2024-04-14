import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const createUser = async (user, accessToken) => {
    console.log(user)
        const res = await axios.post(`${VITE_API_URL}/users`, user, {
            headers: { 'Authorization': `Bearer ${accessToken}`},
          })
        return res
};

export default createUser;