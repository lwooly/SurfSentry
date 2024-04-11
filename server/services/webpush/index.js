import webpush from "web-push";

const { VAPID_EMAIL, VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } = process.env;

// set up webpush
webpush.setVapidDetails(
  `mailto:${VAPID_EMAIL}`,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// send push notification
export async function sendWebpushNotification(subscription, message) {
  if (!subscription || !subscription.endpoint) {
    throw new Error('Invalid subscription')
  }

    const res = await webpush.sendNotification(subscription, message);
    return res
}
