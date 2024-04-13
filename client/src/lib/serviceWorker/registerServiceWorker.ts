const VITE_VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY
const VITE_API_URL = import.meta.env.VITE_API_URL


export const registerServiceWorker = async (userId:string) => {

  //create sw URL with query params for settings and endpoints
  let swURL = "/serviceWorker.js"
  swURL += `?apiUrl=${VITE_API_URL}`
  swURL += `&vapidPublicKey=${VITE_VAPID_PUBLIC_KEY}`
  swURL += `&userId=${userId}`
  try {
    const registration = await navigator.serviceWorker.register(swURL);
    console.log('Service worker registered')
    return registration;
  } catch (err) {
    console.log(`Failed to register service worker. Error: ${err}`);
  }
};

