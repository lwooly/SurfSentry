const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

let params = new URL(self.location).searchParams;
const API_URL = params.get("apiUrl");
const VAPID_PUBLIC_KEY = params.get("vapidPublicKey");
const userId = params.get("userId");
const accessToken = params.get("accessToken");

// subscribe to webpush subscription - push subscription to backend api database
const saveSubscription = async (subscription, userId, accessToken) => {
  try {
    //TODO: dont hardcode fetch url
    const response = await fetch(`${API_URL}/save-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        subscription: subscription,
        userId: userId,
      }),
    });
    const data = await response;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Subscription not saved");
  }
};

// register service worker with push manager
self.addEventListener("activate", async () => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
  // save subscription to backend
  const response = await saveSubscription(subscription, userId, accessToken);
  console.log(response);
});

// show notification from push manager
self.addEventListener("push", async (e) => {
  const data = await e.data.json();
  self.registration.showNotification("SurfSentry", { 
    body:data.body,
    icon:data.image,
    vibrate:[200, 100, 200]
  });
});
