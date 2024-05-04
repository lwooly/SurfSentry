// import axios from "axios";

// const VITE_API_URL = import.meta.env.VITE_API_URL;


// const fetchCreateUser = async ({user, accessToken}:{user: , accessToken:string}) => {

//       try {
//         const res = await axios.post(`${VITE_API_URL}/users`, user, {
//           headers: { 'Authorization': `Bearer ${accessToken}`},
//           validateStatus: status => (status >= 200 && status < 300) || status === 409
//         })
//         return res;
//       } catch (err:any) {
//         if (err.response && err.response.status === 409) {
//           console.log("User login");
//         } else {
//           console.error("Registration failed: Internal server error");
//         }
//       }
//     }

// export default fetchCreateUser;