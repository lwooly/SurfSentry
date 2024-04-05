export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      "./js/serviceWorker.js"
    );
    return registration;
  } catch (err) {
    console.log(`Failed to register service worker. Error: ${err}`);
  }
};


