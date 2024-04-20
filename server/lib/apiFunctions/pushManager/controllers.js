import { sendWebpushNotification } from "../../../services/webpush/index.js";
import { surfCheck } from "../../../tasks/notify/surfCheck.js";
import { sendNotifications } from "../../../utils/notificationFns/sendNotifications.js";
import { getSWSubscriptionsFromDB } from "../SWsubscriptions/queries.js";

export async function sendPushNotification(req, res) {
  // webpush to send notification to subscribers saved in database
  // Send notification
  try {
    //get subscribers from DB
    const subscriptions = await getSWSubscriptionsFromDB();

    console.log('subscirptions', subscriptions)

    await sendNotifications(subscriptions)
    //Send success response
    res.json({
      status: "success",
      message:
        "Attempted to send messages to all previous web push subscribers",
    });
  } catch (error) {
    console.log(`Notification not sent: ${error}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}


export const startSurfCheck = (req, res) => {
  try {
    surfCheck()
  } catch (err) {
    console.log(err)
  }
}