export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      "/serviceWorker.js"
    );
    console.log('Service worker registered')
    return registration;
  } catch (err) {
    console.log(`Failed to register service worker. Error: ${err}`);
  }
};

